import SidebarButtonElement from "@/components/SidebarButtonElement";
import { FormElements } from "@/components/FormElements";
import { Separator } from "@/components/ui/separator";

const FormElementsSidebar = () => {
  // TODO: refactor
  const {
    TextField,
    TitleField,
    SubtitleField,
    ParagraphField,
    SeparatorField,
    SpacerField,
    NumberField,
    TextAreaField,
    DateField,
    SelectField,
    CheckboxField,
  } = FormElements;
  const layoutElements = Object.values({ TitleField, SubtitleField, ParagraphField, SeparatorField, SpacerField });
  const formElements = Object.values({ TextField, NumberField, TextAreaField, DateField, SelectField, CheckboxField });

  return (
    <div>
      <p className="text-sm text-foreground/70">
        Перетащите элементы
      </p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Элементы макета:
        </p>
        {layoutElements.map(element => (
          <SidebarButtonElement key={element.type} formElement={element} />
        ))}
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Элементы формы:
        </p>
        {formElements.map(element => (
          <SidebarButtonElement key={element.type} formElement={element} />
        ))}
      </div>
    </div>
  );
};

export default FormElementsSidebar;
