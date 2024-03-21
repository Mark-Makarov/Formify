"use client";

import { ElementsType, FormElement } from "@/components/FormElements";
import { MdTextFields } from "react-icons/md";

const type: ElementsType = "TextField";

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id:string) => ({
    id,
    type,
    extraAttributes: {
      label: "Текст",
      helperText: "Подсказка",
      required: false,
      placeHolder: "Введите текст...",
    },
  }),

  designComponent: () => <div>Design</div>,
  designButtonElement: {
    icon: MdTextFields,
    label: "Текст",
  },


  formComponent: () => <div>Form</div>,
  propertiesComponent: () => <div>Properties</div>,
};
