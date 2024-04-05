"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "@/components/FormElements";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesignContext from "@/hooks/useDesignContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LuHeading2 } from "react-icons/lu";

const type: ElementsType = "SubtitleField";

const extraAttributes = {
    subTitle: "Подзаголовок",
  };

// TODO: translate errors
const propertiesSchema = z.object({
  title: z.string().min(2).max(50),
});

export const formSchema = z.object({
  name: z.string({required_error: "Введите название формы"})
    .min(1, { message: "Название формы не может быть пустым" })
    .max(40, { message: "Название формы слишком длинное"}),
  description: z.string().max(500, { message: "Описание формы слишком длинное"}).optional(),
});

export const SubtitleFieldFormElement: FormElement = {
  type,
  construct: (id:string) => ({
    id,
    type,
    extraAttributes,
  }),
  place: "layout",

  designComponent: DesignComponent,
  designButtonElement: {
    icon: LuHeading2,
    label: "Подзаголовок",
  },

  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">
        Подзаголовок
      </Label>
      <p className="text-lg">
        {title}
      </p>
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance, }) {
  const element = elementInstance as CustomInstance;
  const { title } = element.extraAttributes;

  return (
    <p className="text-lg">{title}</p>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const {
    id,
    extraAttributes,
  } = elementInstance as CustomInstance;

  const { updateElement } = useDesignContext();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      title: extraAttributes.title,
    },
  });

  useEffect(() => {
    form.reset(elementInstance.extraAttributes)
  }, [elementInstance, form]);

  const handleApplyChanges = (values: propertiesFormSchemaType) => {
    updateElement(id, {
      ...elementInstance,
      extraAttributes: { ...values},
    })
  };

  const handleSubmitByKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <Form {...form}>
      <form
      onBlur={form.handleSubmit(handleApplyChanges)}
      onSubmit={(e) => e.preventDefault()}
      className="space-y-3"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Поздаголовок
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={e => handleSubmitByKey(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
