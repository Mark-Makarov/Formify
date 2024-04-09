"use client";

import {
  ElementsType,
  FormElement,
} from "@/components/form-elements";
import { Label } from "@/components/ui/label";
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

function DesignComponent() {
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
 );
}
