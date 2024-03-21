"use client";

import { Form } from "@prisma/client";
import PreviewDialogButton from "@/components/PreviewDialogButton";
import SaveFormButton from "@/components/SaveFormButton";
import PublishFormButton from "@/components/PublishFormButton";
import Design from "@/components/Design";
import { DndContext } from "@dnd-kit/core";
import DragOverlayWrapper from "@/components/DragOverlayWrapper";

const FormBuilder = ({ form }: { form: Form }) => {
  const { name, published } = form;

  return (
    <DndContext>
      <main className="flex flex-col w-full">
        <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
          <h2 className="truncate font-medium">
            <span className="text-muted-foreground mr-2">
              Форма:
            </span>
            {form.name}
          </h2>
          <div className="flex items-center gap-2">
            <PreviewDialogButton />
            {!published && (
              <>
                <SaveFormButton />
                <PublishFormButton />
              </>
            )}
          </div>
        </nav>
        <div className="flex w-full flex-grow items-center justify-center relative
        overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <Design />
        </div>
      </main>
      <DragOverlayWrapper>

      </DragOverlayWrapper>
    </DndContext>
  );
};

export default FormBuilder;
