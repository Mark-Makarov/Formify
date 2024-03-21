"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { formSchema, formSchemaType } from "@/schemas/form";
import { CreateForm } from "@/actions/form";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";

// TODO: decompose
const CreateFormButton = () => {
  const { builder } = process.env.routes;
  const router = useRouter();
  const form = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmitFormHandler = async (values: formSchemaType) => {
    try {
      const formId = await CreateForm(values);
      toast({
        title: "Успешно!",
        description: "Новая форма успешно создана",
      })

      router.push(`${builder}/${formId}`)
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Что-то пошло не так, повторите запрос позже...",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="group border border-primary/20 h-[190px] items-center
         justify-center flex flex-col hover:border-primary hover:cursor-pointer
         border-dashed gap-8">
          <BsFileEarmarkPlus className="scale-[3] text-muted-foreground group-hover:text-primary"/>
          <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
            Создать новую форму
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Создать форму
          </DialogTitle>
          <DialogDescription>
            Создайте новую форму, чтобы начать собирать заявки!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitFormHandler)} className="space-y-2">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            className="w-full mt-4"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmitFormHandler)}
          >
            {isSubmitting ? (
              <ImSpinner2 className="animate-spin" />
            ) : (
              <span>Сохранить</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFormButton;
