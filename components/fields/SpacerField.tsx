"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "@/components/form-elements";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import useDesignContext from "@/hooks/useDesignContext";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LuSeparatorHorizontal } from "react-icons/lu";
import { Slider } from "@/components/ui/slider";

const type: ElementsType = "SpacerField";

const extraAttributes = {
    height: 20,
  };

const propertiesSchema = z.object({
  height: z.number().min(5, { message: "Отступ не может быть менее 5px символов"})
    .max(200, { message: "Отступ не может быть более 200px символов"}),
});

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id:string) => ({
    id,
    type,
    extraAttributes,
  }),
  place: "layout",

  designComponent: DesignComponent,
  designButtonElement: {
    icon: LuSeparatorHorizontal,
    label: "Отступ",
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
  const { height } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full items-center">
      <Label className="text-muted-foreground">
        Отступ: {height}px
      </Label>
      <LuSeparatorHorizontal className="h-8 w-8" />
    </div>
  );
}

function FormComponent({ elementInstance }: { elementInstance: FormElementInstance, }) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;

  return (
    <div style={{ height, width: "100%" }} />
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
    defaultValues: { ...extraAttributes},
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

  return (
    <Form {...form}>
      <form
      onBlur={form.handleSubmit(handleApplyChanges)}
      onSubmit={(e) => e.preventDefault()}
      className="space-y-3"
      >
        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Высота: {form.watch("height")}px
              </FormLabel>
              <FormControl>
                <Slider
                  className="pt-2"
                  min={5}
                  max={200}
                  step={1}
                  onValueChange={(value) => field.onChange(value[0])}
                  defaultValue={[field.value]}
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
