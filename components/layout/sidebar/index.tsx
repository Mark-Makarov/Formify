import useDesignContext from "@/hooks/useDesignContext";
import FormElementsSidebar from "@/components/layout/sidebar/FormElementsSidebar";
import FormPropertiesSidebar from "@/components/layout/sidebar/FormPropertiesSidebar";

const DesignSidebar = () => {
  const { selectedElement } = useDesignContext();

  return (
    <aside className="w-[400px] max-w-[400px] flex flex-col flex-grow gap-2
    border-l-2 border-muted p-4 bg-background overflow-y-auto h-full">
      {selectedElement ? (
        <FormPropertiesSidebar />
      ) : (
        <FormElementsSidebar />
      )}
    </aside>
  );
};

export default DesignSidebar;
