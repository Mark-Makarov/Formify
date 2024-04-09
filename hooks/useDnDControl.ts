import useDesignContext from "@/hooks/useDesignContext";
import { DragEndEvent, useDndMonitor } from "@dnd-kit/core";
import { ElementsType, FormElements } from "@/components/form-elements";
import { generateId } from "@/lib/generateId";
import { content } from "@/contents";

const useDnDControl = () => {
  const {
    elements,
    addElement,
    removeElement,
  } = useDesignContext();

  useDndMonitor({
    onDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (active && over) {
        const isDesignButtonElement = active?.data?.current?.isDesignButtonElement;
        const isDroppingOverDesignDropArea = over.data?.current?.isDesignDropArea;

        if (isDesignButtonElement && isDroppingOverDesignDropArea) {
          const type = active?.data?.current?.type;
          const newElement = FormElements[type as ElementsType].construct(generateId());

          addElement(elements.length, newElement);
          return;
        }

        const isDroppingOverDesignElementTop = over.data?.current?.isTopHalfDesignElement;
        const isDroppingOverDesignElementBottom = over.data?.current?.isBottomHalfDesignElement;
        const isDroppingOverDesignElement = isDroppingOverDesignElementTop || isDroppingOverDesignElementBottom;

        if (isDesignButtonElement && isDroppingOverDesignElement) {
          const type = active?.data?.current?.type;
          const newElement = FormElements[type as ElementsType].construct(generateId());
          const overElementId = over.data?.current?.elementId;
          const overElementIndex = elements.findIndex(element => element.id === overElementId);
          if (overElementIndex === -1) {
            throw new Error(content.elementNotFound);
          }

          let newElementIndex = overElementIndex;
          if (isDroppingOverDesignElementBottom) newElementIndex = +1;

          addElement(overElementIndex, newElement);
          return;
        }

        const isDraggingDesignElement = active.data?.current?.isDesignElement;
        const isDraggingDesignElementOverAnotherElement = isDroppingOverDesignElement && isDraggingDesignElement;

        if (isDraggingDesignElementOverAnotherElement) {
          const activeElementId = active.data?.current?.elementId;
          const overElementId = over.data?.current?.elementId;
          const activeElementIndex = elements.findIndex(element => element.id === activeElementId);
          const overElementIndex = elements.findIndex(element => element.id === overElementId);

          if (activeElementIndex === -1 || overElementIndex === -1) {
            throw new Error(content.elementNotFound);
          }

          const activeElement = {...elements[activeElementIndex]};
          removeElement(activeElementId);

          let newElementIndex = overElementIndex;
          if (isDroppingOverDesignElementBottom) newElementIndex = +1;

          addElement(newElementIndex, activeElement)
        }

      }
    },
  });
};

export default useDnDControl;
