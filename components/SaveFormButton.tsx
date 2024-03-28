import { Button } from "@/components/ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesign from "@/hooks/useDesign";
import { UpdateFormContent } from "@/actions/form";
import { toast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa";

const SaveFormButton = ({ id }: { id: number }) => {
  const { elements } = useDesign();
  const [loading, startTransition] = useTransition();

  // TODO: replace all texts to another place with re-use
  const updateFormContent = async () => {
    try {
      const convertedElements = JSON.stringify(elements);
      await UpdateFormContent(id, convertedElements)

      toast({
        title: "Успешно!",
        description: "Ваша форма сохранена",
      })
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Попробуйте позже",
        variant: "destructive",
      })
    }
  }

  return (
    <Button
      disabled={loading}
      variant="outline"
      className="gap-2"
      onClick={() => startTransition(updateFormContent)}
    >
      <HiSaveAs className="h-6 w-6" />
      Сохранить
      {loading && <FaSpinner className="animate-spin" />}
    </Button>
  );
};

export default SaveFormButton;
