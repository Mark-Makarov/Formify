"use client";

import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "@/components/FormElements";
import { MdTextFields } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import useDesignContext from "@/hooks/useDesign";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Bs123 } from "react-icons/bs";

const type: ElementsType = "NumberField";

const extraAttributes = {
    label: "Число",
    helperText: "Подсказка",
    required: false,
    placeHolder: "0",
  };

// TODO: translate errors
const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
});

export const formSchema = z.object({
  name: z.string({required_error: "Введите название формы"})
    .min(1, { message: "Название формы не может быть пустым" })
    .max(40, { message: "Название формы слишком длинное"}),
  description: z.string().max(500, { message: "Описание формы слишком длинное"}).optional(),
});

export const NumberFieldFormElement: FormElement = {
  type,
  construct: (id:string) => ({
    id,
    type,
    extraAttributes,
  }),

  designComponent: DesignComponent,
  designButtonElement: {
    icon: Bs123,
    label: "Число",
  },

  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0
    }
    return true;
  }
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;

  return (
    <div className="flex flex-col gap-2 w-full">
      <Label>
        {label}
        {required && "*"}
      </Label>
      <Input
        readOnly
        disabled
        type="number"
        placeholder={placeHolder}
      />
      {helperText && (
        <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
      )}
    </div>
  );
}


function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValues,
}: {
  elementInstance: FormElementInstance,
  submitValue?: SubmitFunction,
  isInvalid?: boolean,
  defaultValues?: string,
}) {
  const [value, setValue] = useState(defaultValues || "");
  const [error, setError] = useState(false);

  useEffect(() => setError(Boolean(isInvalid)), [isInvalid])

  const element = elementInstance as CustomInstance;
  const { label, required, placeHolder, helperText } = element.extraAttributes;

  const onBlurInputHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!submitValue) return;

    const valid = NumberFieldFormElement.validate(element, e.target.value);
    setError(!valid);
    if (!valid) return;

    submitValue(element.id, e.target.value);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Input
        type="number"
        className={cn(error && "border-red-500")}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => onBlurInputHandler(e)}
        placeholder={placeHolder}
        value={value}
      />
      {helperText && (
        <p className={cn("text-[0.8rem] text-muted-foreground",
          error && "text-red-500")}>
          {helperText}
        </p>
      )}
    </div>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const {
    id,
    extraAttributes,
  } = elementInstance as CustomInstance;
  const {
    required,
    label,
    placeHolder,
    helperText
  } = extraAttributes;

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
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Этикетка
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={e => handleSubmitByKey(e)}
                />
              </FormControl>
              <FormDescription>
                Этикетка поля. <br/>
                Отображается над выбранным полем.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="placeHolder"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Заполнитель
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={e => handleSubmitByKey(e)}
                />
              </FormControl>
              <FormDescription>
                Заполнитель поля.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="helperText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Вспомогательный текст
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={e => handleSubmitByKey(e)}
                />
              </FormControl>
              <FormDescription>
                Вспомогательный текст. <br/>
                Отображается под выбранным полем.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="required"
          render={({ field }) => (
            <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>
                  Необходимое
                </FormLabel>
                <FormDescription>
                  Помечает это поле как необходимое к заполнению.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
