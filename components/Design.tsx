"use client";

import DesignSidebar from "@/components/DesignSidebar";
import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import useDesignContext from "@/hooks/useDesignContext";
import { ElementsType, FormElements, FormElementInstance } from "@/components/FormElements";
import { generateId } from "@/lib/generateId";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BiSolidTrash } from "react-icons/bi";

const Design = () => {
  const {
    elements,
    addElement,
    selectedElement,
    setSelectedElement,
    removeElement,
  } = useDesignContext();

  const droppable = useDroppable({
    id: "design-drop-area",
    data: {
      isDesignDropArea: true,
    }
  });

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
            throw new Error("element not found");
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
            throw new Error("element not found");
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

const DesignElementWrapper = ({ element }: { element: FormElementInstance }) => {
  const { removeElement, selectedElement, setSelectedElement } = useDesignContext();
  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

  const { id, type } = element;

  const topHalf = useDroppable({
    id: id + "-top",
    data: {
      type: type,
      elementId: id,
      isTopHalfDesignElement: true,
    }
  });

  const bottomHalf = useDroppable({
    id: id + "-bottom",
    data: {
      type: type,
      elementId: id,
      isBottomHalfDesignElement: true,
    }
  });

  const draggable = useDraggable({
    id: id + "drag-handler",
    data: {
      type,
      elementId: id,
      isDesignElement: true,
    }
  });

  if (draggable.isDragging) return null;

  const DesignElement = FormElements[type].designComponent;

  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
      className='relative flex h-[120px] flex-col rounded-md text-foreground
    ring-1 ring-inset ring-accent hover:cursor-pointer'
    >
      <div
        ref={topHalf.setNodeRef}
        className='absolute h-1/2 w-full rounded-t-md'
      />
      <div
        ref={bottomHalf.setNodeRef}
        className='absolute bottom-0 h-1/2 w-full rounded-b-md'
      />
      {mouseIsOver && (
        <>
          <div className='absolute right-0 z-10 h-full'>
            <Button
              className='rounden-l-none flex h-full justify-center rounded-md
              border bg-destructive'
              variant='outline'
              onClick={(e) => {
                e.stopPropagation();
                removeElement(id);
              }}
            >
              <BiSolidTrash className='h-6 w-6' />
            </Button>
          </div>
          <div
            className='absolute left-1/2 top-1/2 -translate-x-1/2
          -translate-y-1/2 animate-pulse'
          >
            <p className='text-sm text-muted-foreground'>
              Нажмите для изменения или перетащите
            </p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className='absolute top-0 h-[7px] w-full rounded-md rounded-b-none bg-primary' />
      )}
      <div
        className={cn(
          "pointer-events-none flex h-[120px] w-full items-center rounded-md" +
            " bg-accent/40 px-4 py-2",
          mouseIsOver && "opacity-20"
        )}
      >
        <DesignElement elementInstance={element} />
      </div>
      {bottomHalf.isOver && (
        <div className='absolute bottom-0 h-[7px] w-full rounded-md rounded-t-none bg-primary' />
      )}
    </div>
  );
};

export default Design;
