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
import useDesignContext from "@/hooks/useDesignContext";
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
import { IoMdCheckbox } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-menu";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
    label: "Чекбокс",
    helperText: "Подсказка",
    required: false,
  };

// TODO: translate errors
const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const CheckboxFieldFormElement: FormElement = {
  type,
  construct: (id:string) => ({
    id,
    type,
    extraAttributes,
  }),

  designComponent: DesignComponent,
  designButtonElement: {
    icon: IoMdCheckbox,
    label: "Чекбокс",
  },

  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: (formElement: FormElementInstance, currentValue: string): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue === "true";
    }
    return true;
  }
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  return (
    <div className="flex items-top space-x-2">
      <Checkbox id={id} />
      <div className="grid gap-1.5 leading-none">
        <Label htmlFor={id}>
          {label}
          {required && "*"}
        </Label>
        {helperText && (
          <p className="text-muted-foreground text-[0.8rem]">{helperText}</p>
        )}
      </div>
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
  const [value, setValue] = useState<boolean>(defaultValues === "true");
  const [error, setError] = useState(false);

  useEffect(() => setError(Boolean(isInvalid)), [isInvalid])

  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  const id = `checkbox-${element.id}`;

  const onCheckedHandler = (checked: CheckedState) => {
    let value = false;
    if (checked) value = true;

    setValue(value);
    if (!submitValue) return;

    const valid = CheckboxFieldFormElement.validate(element, value.toString());
    setError(!valid);
    submitValue(element.id, value.toString())
  }

  return (
    <div className="items-top flex space-x-2">
      <Checkbox
        className={cn(error && "border-red-500")}
        checked={value}
        id={id}
        onCheckedChange={(checked) => onCheckedHandler(checked)}
      />
      <div className="grid gap-1.5 leading-none">
        <Label className={cn(error && "text-red-500")} htmlFor={id}>
          {label}
          {required && "*"}
        </Label>
        {helperText && (
          <p className={cn("text-[0.8rem] text-muted-foreground", error && "text-red-500")}>
            {helperText}
          </p>
        )}
      </div>
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
