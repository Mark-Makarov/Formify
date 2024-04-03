"use client";

import { Form } from "@prisma/client";
import PreviewDialogButton from "@/components/PreviewDialogButton";
import SaveFormButton from "@/components/SaveFormButton";
import PublishFormButton from "@/components/PublishFormButton";
import Design from "@/components/design";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";
import useDesignContext from "@/hooks/useDesignContext";

const FormBuilder = ({ form }: { form: Form }) => {
  const { setElements, setSelectedElement } = useDesignContext();
  const [isLoading, setIsLoading] = useState(true);

  const { main, forms } = process.env.routes;
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

  // TODO: refactor shareUrl with another places
  const formShareUrl = `${window.location.origin}/submit/${shareUrl}`;

  const handleCopyShareUrl = () => {
    navigator.clipboard.writeText(formShareUrl);
    toast({
      title: "Ссылка на форму скопирована в буфер обмена",
    });
  };

  if (published) {
    return (
      <>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={800}
        />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-3xl font-bold text-primary border-b pb-2 mb-10">
              🎊 Форма опубликована! 🎉
            </h1>
            <h2 className="text-2xl">
              Поделитесь формой
            </h2>
            <h3 className="text-xl text-muted-foreground border-b pb-10">
              Все пользователи имеющие ссылку на форму, смогут заполнить форму.
            </h3>
            <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
              <Input
                className="w-full"
                readOnly
                value={shareUrl}
              />
              <Button
                className="mt-2 w-full"
                onClick={handleCopyShareUrl}
              >
                копировать ссылку
              </Button>
            </div>
            <div className="flex justify-between">
              <Button asChild variant="link">
                <Link href={main} className="gap-2">
                  <BsArrowLeft />
                  Вернутся на главную
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link href={`${forms}/${id}`} className="gap-2">
                  Информация о форме
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    )
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
