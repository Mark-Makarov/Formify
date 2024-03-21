import { useState } from "react";
import {
  Active,
  DragOverlay,
  DragStartEvent,
  useDndMonitor,
} from "@dnd-kit/core";
import { SidebarButtonElementDragOverlay } from "@/components/SidebarButtonElement";
import { AiOutlineStop } from "react-icons/ai";
import { ElementsType, FormElements } from "@/components/FormElements";

const DragOverlayWrapper = () => {
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

  return (
    <DragOverlay>
      {node}
    </DragOverlay>
  );
};

export default DragOverlayWrapper;
