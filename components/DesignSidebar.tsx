import useDesignContext from "@/hooks/useDesignContext";
import FormElementsSidebar from "@/components/FormElementsSidebar";
import PropertiesFormSidebar from "@/components/PropertiesFormSidebar";

const DesignSidebar = () => {
  const { selectedElement } = useDesignContext();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2
    border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {selectedElement ? (
        <PropertiesFormSidebar />
      ) : (
        <FormElementsSidebar />
      )}
    </aside>
  );
};

export default DesignSidebar;
