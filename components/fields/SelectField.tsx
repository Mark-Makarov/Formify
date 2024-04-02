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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { RxDropdownMenu } from "react-icons/rx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { toast } from "@/components/ui/use-toast";

const type: ElementsType = "SelectField";

const extraAttributes = {
    label: "Этикетка",
    helperText: "Подсказка",
    required: false,
    placeHolder: "Плейсхолдер",
    options: [],
  };

// TODO: translate errors, duplicates in all fields
const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  options: z.array(z.string()).default([]),
});

export const SelectFieldFormElement: FormElement = {
  type,
  construct: (id:string) => ({
    id,
    type,
    extraAttributes,
  }),

  designComponent: DesignComponent,
  designButtonElement: {
    icon: RxDropdownMenu,
    label: "Выбор",
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
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
      </Select>
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
  const { label, required, placeHolder, helperText, options } = element.extraAttributes;

  const onSelectHandler = (value: string) => {
    setValue(value);
    if (!submitValue) return;

    const valid = SelectFieldFormElement.validate(element, value);
    setError(!valid);
    if (!valid) return;

    submitValue(element.id, value);
  };

  return (
    <div className="flex w-full flex-col gap-2">
      <Label className={cn(error && "text-red-500")}>
        {label}
        {required && "*"}
      </Label>
      <Select
        defaultValue={value}
        onValueChange={(value) => onSelectHandler(value)}
      >
        <SelectTrigger className={cn("w-full", error && "border-red-500")}>
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option} >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {helperText && (
        <p
          className={cn(
            "text-[0.8rem] text-muted-foreground",
            error && "text-red-500"
          )}
        >
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

  const { updateElement, setSelectedElement } = useDesignContext();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
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

    toast({
      title: "Успешно",
      description: "Опции сохранены",
    })

    setSelectedElement(null);
  };

  const handleSubmitByKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <Form {...form}>
      <form
      onSubmit={form.handleSubmit(handleApplyChanges)}
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
                Плейсхолдер
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  onKeyDown={e => handleSubmitByKey(e)}
                />
              </FormControl>
              <FormDescription>
                Плейсхолдер.
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
        <Separator />
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center">
                <FormLabel>
                  Опции
                </FormLabel>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue("options", field.value.concat("Новая опция"));
                  }}
                  className="gap-2"
                  variant="outline"
                >
                  <AiOutlinePlus />
                  Добавить
                </Button>
              </div>
              <div className="flex flex-col gap-2">
                {form.watch("options").map((option, index) => (
                  <div key={index} className="flex items-center justify-between gap-1">
                    <Input
                      placeholder=""
                      value={option}
                      onChange={(e) => {
                        field.value[index] = e.target.value;
                        field.onChange(field.value);
                      }}
                    />
                    <Button variant="ghost" size="icon" onClick={e => {
                      e.preventDefault();
                      const newOptions = [...field.value];
                      newOptions.splice(index, 1);
                      field.onChange(newOptions);
                    }}>
                      <AiOutlineClose />
                    </Button>
                  </div>
                ))}
              </div>
              <FormDescription>
                Вспомогательный текст. <br/>
                Отображается под выбранным полем.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
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
        <Separator />
        <Button className="w-full" type="submit">
          Сохранить
        </Button>
      </form>
    </Form>
  )
}
