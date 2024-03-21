import { TextFieldFormElement } from "@/components/fields/TextField";
import { IconType } from "react-icons";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType,
  construct: (id:string) => FormElementsInstance;

  designComponent: React.FC,
  designButtonElement: {
    icon: React.ElementType,
    label: string,
  },

  formComponent: React.FC
  propertiesComponent: React.FC,
};

export type FormElementsInstance = {
  id: string,
  type: ElementsType,
  extraAttributes?: Record<string, any>
};

type FormElementsType = {
  [key in ElementsType]: FormElement
};

export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
};
