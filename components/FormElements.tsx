import { TextFieldFormElement } from "@/components/fields/TextField";

export type ElementsType = "TextField";

export type SubmitFunction = (key: string, value: string) => void

export type FormElement = {
  type: ElementsType,
  construct: (id:string) => FormElementInstance;

  designComponent: React.FC<{elementInstance: FormElementInstance}>,
  designButtonElement: {
    icon: React.ElementType,
    label: string,
  },

  formComponent: React.FC<{
    elementInstance: FormElementInstance,
    submitValue?: SubmitFunction,
    isInvalid?: boolean,
    defaultValues?: string,
  }>,
  propertiesComponent: React.FC<{elementInstance: FormElementInstance}>,

  validate: (formElement: FormElementInstance, currentValue: string) => boolean,
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
