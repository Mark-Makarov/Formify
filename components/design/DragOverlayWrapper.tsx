import { useState } from "react";
import {
  Active,
  DragOverlay,
  DragStartEvent,
  useDndMonitor,
} from "@dnd-kit/core";
import { SidebarButtonElementDragOverlay } from "@/components/layout/sidebar/SidebarButtonElement";
import { AiOutlineStop } from "react-icons/ai";
import { ElementsType, FormElements } from "@/components/form-elements";
import useDesignContext from "@/hooks/useDesignContext";

const DragOverlayWrapper = () => {
  const { elements } = useDesignContext();
  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart(event: DragStartEvent) {
      setDraggedItem(event.active);
    },
    onDragCancel() {
      setDraggedItem(null);
    },
    onDragEnd() {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) {
    return null;
  }

  let node = <AiOutlineStop className="flex flex-col items-center justify-center scale-[2]" />;

  const isSidebarButtonElement = draggedItem?.data?.current?.isDesignButtonElement;
  if (isSidebarButtonElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />
  }

  const isDesignElement = draggedItem?.data?.current?.isDesignElement;
  if (isDesignElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find((element) => (element.id === elementId))

    if (!element) {
      node = <div>Элемент не найден!</div>
    } else {
      const DesignElementComponent = FormElements[element.type].designComponent;
      node = (
        <div className="flex bg-accent border rounded-md h-[120px] w-full py-2 px-4
        opacity-80 pointer pointer-events-none z-10">
          <DesignElementComponent elementInstance={element} />
        </div>
      )
    }
  }

  return (
    <DragOverlay>
      {node}
    </DragOverlay>
  );
};

export default DragOverlayWrapper;
