"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { formSchema, formSchemaType } from "@/schemas/form";

class UserNotFoundError extends Error {}

// TODO: refactor - duplicates getting user
export async function GetFormStats() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  // TODO: exception handling then DB offline
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
    throw new Error("form not valid");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const { name, description } = data;
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    }
  });

  if (!form) {
    throw new Error("form save error");
  }

  return form.id;
}

export async function GetForms(){
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

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
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const form = await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  })

  return form;
}

export async function UpdateFormContent(id: number, content: string) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

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
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

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
