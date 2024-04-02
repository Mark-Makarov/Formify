import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { MdOutlinePublish } from "react-icons/md";
import {
  AlertDialog, AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaIcons, FaSpinner } from "react-icons/fa";
import { toast } from "@/components/ui/use-toast";
import { PublishForm } from "@/actions/form";
import { useRouter } from "next/navigation";

const PublishFormButton = ({ id }: { id: number }) => {
  const router = useRouter();
  const [isLoading, startTransition] = useTransition();

  const handlePublishForm = async () => {
    try {
      await PublishForm(id)

      toast({
        title: "Успешно!",
        description: "Ваша форма опубликована",
      })
      router.refresh();
    } catch (e) {
      toast({
        title: "Ошибка",
        description: "Попробуйте позже",
        variant: "destructive",
      })
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <MdOutlinePublish className="h-6 w-6" />
          Опубликовать
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Вы уверены?
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-medium">
            При публикации формы она станет доступна для пользователей и вы не сможете её редактировать.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Отменить
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(handlePublishForm)
            }}
          >
            Сохранить
            {isLoading && (
              <FaSpinner className="animate-spin" />
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishFormButton;
