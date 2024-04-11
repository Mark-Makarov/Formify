"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";
import { content } from "@/contents";

class UserNotFoundError extends Error {}

async function GetUser() {
  const user = await currentUser();
  if (!user) {
   throw new UserNotFoundError();
  }

  return user;
}


export async function GetFormStats() {
  const user = await GetUser();

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits ?? 0;
  const submissions = stats._sum.submissions ?? 0;
  const submissionsRate = submissions ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionsRate;

  return {
    submissionsRate,
    bounceRate,
    visits,
    submissions,
  };
}

export async function CreateForm(data: formSchemaType) {
  const { success } = formSchema.safeParse(data);

  if (!success) {
    throw new Error(content.formNotValid);
  }

  const user = await GetUser();
  const { name, description } = data;
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    }
  });

  if (!form) {
    throw new Error(content.formSaveError);
  }

  return form.id;
}

export async function GetForms(){
  const user = await GetUser();
  const userForms = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return userForms;
}

export async function GetFormById(id: number) {
  console.log(`id in GetFormById: ${id}`);
  const user = await GetUser();
  console.log(`user in GetFormById: ${user}`);
  try {
    const form = await prisma.form.findUnique({
      where: {
        userId: user.id,
        id,
      },
    })
    console.log(`form in GetFormById: ${form}`);
    return form;
  } catch (e) {
    console.log(`catch (e): ${e}`);
  }
}

export async function UpdateFormContent(id: number, content: string) {
  const user = await GetUser();
  const updateResult = await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content,
    }
  })

  return updateResult;
}

export async function PublishForm(id: number) {
  const user = await GetUser();
  const publishResult = await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      published: true,
    }
  })

  return publishResult;
}

export async function GetFormContentByUrl(formUrl: string) {
  const form = await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formUrl,
    }
  })

  return form;
}

export async function SubmitForm(formUrl: string, formContent: string) {
  const formSubmitResults = await prisma.form.update({
    data: {
      submissions: {
        increment: 1
      },
      FormSubmissons: {
        create: {
          content: formContent,
        }
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  })

  return formSubmitResults;
}

export async function GetFromWithSubmissions(id: number) {
  const user = await GetUser();
  const form = await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissons: true,
    },
  })

  return form;
}
