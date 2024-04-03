import { useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import useDesignContext from "@/hooks/useDesignContext";
import { FormElements, FormElementInstance } from "@/components/FormElements";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BiSolidTrash } from "react-icons/bi";

const DesignElementWrapper = ({ element }: { element: FormElementInstance }) => {
  const { removeElement, setSelectedElement } = useDesignContext();
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

export default DesignElementWrapper;
