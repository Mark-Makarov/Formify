import { Button } from "@/components/ui/button";
import { MdPreview } from "react-icons/md";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormElements } from "@/components/FormElements";
import useDesignContext from "@/hooks/useDesignContext";

const PreviewDialogButton = () => {
  const { elements } = useDesignContext();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MdPreview className="h-6 w-6" />
          Просмотр
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen h-screen max-h-screen max-w-full
      flex flex-col flex-grow p-0 gap-0">
        <div className="px-4 py-2 border-b">
          <p className="text-lg font-bold text-muted-foreground">
            Превью формы
          </p>
          <p className="text-sm text-muted-foreground">
            Так ваша форма выглядит для пользователей
          </p>
        </div>
        <div className="bg-accent flex flex-col flex-grow items-center overflow-y-auto
        justify-center p-4 bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
          <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background
          h-full w-full rounded-2xl p-8 overflow-y-auto">
            {elements.map((element) => {
              const FormComponent = FormElements[element.type].formComponent;
              return <FormComponent key={element.id} elementInstance={element} />
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewDialogButton;
