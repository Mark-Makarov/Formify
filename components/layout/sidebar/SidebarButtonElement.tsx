import React from "react";
import { FormElement } from "@/components/form-elements";
import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

const SidebarButtonElement = ({ formElement }: { formElement: FormElement }) => {
  const { icon: Icon, label } = formElement.designButtonElement;
  const draggable = useDraggable({
    id: `design-button-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignButtonElement: true,
    }
  });

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="outline"
      className={cn("flex h-[120px] w-[120px] cursor-grab flex-col gap-2",
        draggable.isDragging && "ring-2 ring-primary"
      )}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export const SidebarButtonElementDragOverlay = ({ formElement }: { formElement: FormElement }) => {
  const { icon: Icon, label } = formElement.designButtonElement;

  return (
    <Button
      variant="outline"
      className="flex h-[120px] w-[120px] cursor-grab flex-col gap-2"
    >
      <Icon className="h-8 w-8 cursor-grab text-primary" />
      <p className="text-xs">{label}</p>
    </Button>
  );
};

export default SidebarButtonElement;
