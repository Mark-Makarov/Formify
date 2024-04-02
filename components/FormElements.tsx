import { TextFieldFormElement } from "@/components/fields/TextField";
import { TitleFieldFormElement } from "@/components/fields/TitleField";
import { SubtitleFieldFormElement } from "@/components/fields/SubtitleField";
import { ParagraphFieldFormElement } from "@/components/fields/ParagraphField";
import { SeparatorFieldFormElement } from "@/components/fields/SeparatorField";
import { SpacerFieldFormElement } from "@/components/fields/SpacerField";
import { NumberFieldFormElement } from "@/components/fields/NumberField";
import { TextAreaFieldFormElement } from "@/components/fields/TextAreaField";
import { DateFieldFormElement } from "@/components/fields/DateField";
import { SelectFieldFormElement } from "@/components/fields/SelectField";
import { CheckboxFieldFormElement } from "@/components/fields/CheckboxField";

export type ElementsType =
  "TextField" |
  "TitleField" |
  "SubtitleField" |
  "ParagraphField" |
  "SeparatorField" |
  "SpacerField" |
  "NumberField" |
  "TextAreaField" |
  "DateField" |
  "SelectField" |
  "CheckboxField";

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
  TitleField: TitleFieldFormElement,
  SubtitleField: SubtitleFieldFormElement,
  ParagraphField: ParagraphFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFieldFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
