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
import { LuHeading1 } from "react-icons/lu";
import { RiSeparator } from "react-icons/ri";
import { Separator } from "@/components/ui/separator";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id:string) => ({
    id,
    type,
  }),

  designComponent: DesignComponent,
  designButtonElement: {
    icon: RiSeparator,
    label: "Разделитель",
  },
  place: "layout",

  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,

  validate: () => true,
};

function DesignComponent({ elementInstance }: { elementInstance: FormElementInstance }) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Label className="text-muted-foreground">
        Разделитель
      </Label>
      <Separator />
    </div>
  );
}

function FormComponent() {
  return (
    <Separator />
  );
}

function PropertiesComponent() {
 return (
   <p>Нет настраиваемых свойств для этого элемента</p>
 )
}
