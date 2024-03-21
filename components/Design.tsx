"use client";

import DesignSidebar from "@/components/DesignSidebar";
import { useDroppable } from "@dnd-kit/core";

const Design = () => {
  const droppable = useDroppable({
    id: "design-drop-area",
    data: {
      isDesignDropArea: true,
    }
  });

  return (
    <div className="flex w-full h-full">
      <div className="p-4 w-full">
        <div className="bg-background max-w-[920px] h-full m-auto rounded-xl flex
        flex-col flex-grow items-center justify-start flex-1 overflow-y-auto">
          <p className="text-3xl text-muted-foreground flex flex-grow items-center
          font-bold">
            Перетащите сюда
          </p>
        </div>
      </div>
      <DesignSidebar />
    </div>
  );
};

export default Design;
