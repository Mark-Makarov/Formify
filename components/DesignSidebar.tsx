import { FormElements } from "@/components/FormElements";
import SidebarButtonElement from "@/components/SidebarButtonElement";

const DesignSidebar = () => {
  const { TextField,} = FormElements;

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2
    border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      Элементы
      <SidebarButtonElement formElement={TextField} />
    </aside>
  );
};

export default DesignSidebar;
