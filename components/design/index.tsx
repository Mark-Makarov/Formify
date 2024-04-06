"use client";

import DesignSidebar from "@/components/layout/sidebar";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import useDesignContext from "@/hooks/useDesignContext";
import useDnDControl from "@/hooks/useDnDControl";
import DesignElementWrapper from "@/components/design/DesignElementWrapper";

const Design = () => {
  const {
    elements,
    selectedElement,
    setSelectedElement,
  } = useDesignContext();

  const droppable = useDroppable({
    id: "design-drop-area",
    data: {
      isDesignDropArea: true,
    }
  });

  useDnDControl();

  return (
    <div className="flex w-full h-full">
      <div
        className="p-4 w-full"
        onClick={() => {if (selectedElement) setSelectedElement(null)}}
      >
        <div
          ref={droppable.setNodeRef}
          className={cn("bg-background max-w-[920px] h-full m-auto rounded-xl flex" +
            " flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
            droppable.isOver && "ring-4 ring-primary ring-inset")}>
          {droppable.isOver && elements.length === 0  && (
            <div className="p-4 w-full">
              <div className="h-[120px] rounded-md bg-primary/20" />
            </div>
          )}
          {!droppable.isOver && elements.length === 0 && (
            <p className="text-3xl text-muted-foreground flex flex-grow items-center
            font-bold">
              Перетащите сюда
            </p>
          )}
          {elements.length > 0 && (
            <div className="flex flex-col w-full gap-2 p-4">
              {elements.map((element) => (
                <DesignElementWrapper key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>
      <DesignSidebar />
    </div>
  );
};

export default Design;
