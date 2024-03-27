import { TextFieldFormElement } from "@/components/fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
  type: ElementsType,
  construct: (id:string) => FormElementInstance;

  designComponent: React.FC<{elementInstance: FormElementInstance}>,
  designButtonElement: {
    icon: React.ElementType,
    label: string,
  },

  formComponent: React.FC<{elementInstance: FormElementInstance}>,
  propertiesComponent: React.FC<{elementInstance: FormElementInstance}>,
};

export type FormElementInstance = {
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
