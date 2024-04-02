import useDesignContext from "@/hooks/useDesignContext";
import { FormElements } from "@/components/FormElements";
import { Button } from "@/components/ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";

const PropertiesFormSidebar = () => {
  const { selectedElement, setSelectedElement } = useDesignContext();

  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-foreground/70">
          Свойства элемента
        </p>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setSelectedElement(null)}
        >
          <AiOutlineClose className="scale-[1.3]"/>
        </Button>
      </div>
      <Separator className="mb-4" />
      <PropertiesForm elementInstance={selectedElement} />
    </div>
);
};

export default PropertiesFormSidebar;
