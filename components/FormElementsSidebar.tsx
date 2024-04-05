import SidebarButtonElement from "@/components/SidebarButtonElement";
import { FormElements } from "@/components/FormElements";
import { Separator } from "@/components/ui/separator";

const FormElementsSidebar = () => {
  const layoutElements = Object.values(FormElements).filter(({ place }) => place === "layout");
  const formElements = Object.values(FormElements).filter(({ place }) => place === "form");

  return (
    <div>
      <p className="text-sm text-foreground/70">
        Перетащите элементы
      </p>
      <Separator className="my-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 place-items-center">
        <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">
          Элементы разметки:
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
