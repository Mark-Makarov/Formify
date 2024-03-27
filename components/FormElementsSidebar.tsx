import SidebarButtonElement from "@/components/SidebarButtonElement";
import { FormElements } from "@/components/FormElements";

const FormElementsSidebar = () => {
  const { TextField} = FormElements;

  return (
    <div>
      Элементы
      <SidebarButtonElement formElement={TextField} />
    </div>
  );
};

export default FormElementsSidebar;
