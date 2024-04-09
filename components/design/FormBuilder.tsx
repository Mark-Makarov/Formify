"use client";

import { Form } from "@prisma/client";
import PreviewDialogButton from "@/components/PreviewDialogButton";
import SaveFormButton from "@/components/SaveFormButton";
import PublishFormButton from "@/components/PublishFormButton";
import Design from "@/components/design/index";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/design/DragOverlayWrapper";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import useDesignContext from "@/hooks/useDesignContext";
import SuccessPublishForm from "@/components/SuccessPublishForm";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements, setSelectedElement } = useDesignContext();
  const [isLoading, setIsLoading] = useState(true);

  const {
    name,
    published,
    id,
    content,
    shareUrl,
  } = form;

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    }
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    }
  })

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (!isLoading) return;

    const parsedElements = JSON.parse(content);
    setElements(parsedElements);
    setSelectedElement(null);
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false)
    }, 600)

    return () => clearTimeout(loadingTimeout)
  }, [form]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <ImSpinner2 className="animate-spin h-12 w-12" />
      </div>
    )
  }

  if (published) {
    return <SuccessPublishForm shareUrl={shareUrl} id={id} />
  }

  return (
    <DndContext sensors={sensors}>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">
              Форма:
            </span>
            {name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!published && (
              <>
                <SaveFormButton id={id} />
                <PublishFormButton id={id} />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative
        overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Design />
        </div>
      </main>
      <DragOverlayWrapper />
    </DndContext>
  );
};

export default FormBuilder;
