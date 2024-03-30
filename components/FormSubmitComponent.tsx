"use client";

import { FormElementInstance, FormElements } from "@/components/FormElements";
import { Button } from "@/components/ui/button";
import { HiCursorClick } from "react-icons/hi";
import { useRef, useState, useTransition } from "react";
import { toast } from "@/components/ui/use-toast";
import { generateId } from "@/lib/generateId";
import { ImSpinner } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

interface FormSubmitComponentProps {
  content: FormElementInstance[],
  formUrl: string,
}
const FormSubmitComponent = ({
  content,
  formUrl,
}: FormSubmitComponentProps) => {
  const formValues = useRef<{ [key: string]: string }>({});
  const formErrors = useRef<{ [key: string]: boolean }>({});
  const [renderKey, setRenderKey] = useState(generateId());
  const [submitted, setSubmitted] = useState(false);
  const [pending, startTransition] = useTransition();

  const validateForm = (): boolean => {
    for (const field of content) {
      const actualValue = formValues.current[field.id] || "";
      const valid = FormElements[field.type].validate(field, actualValue);

      if (!valid) {
        formErrors.current[field.id] = true;
      }
    }

    return Object.keys(formErrors.current).length <= 0;
  }

  const submitValue = (key: string, value: string) => {
    formValues.current[key] = value;
  };

  const handleSubmitForm = async () => {
    formErrors.current = {};

    const validForm = validateForm();
    if (!validForm) {
      setRenderKey(generateId());
      toast({
        title: "Ошибка!",
        description: "проверьте форму на наличие ошибок",
        variant: "destructive",
      });
      return;
    }

    try {
      const formContent = JSON.stringify(formValues.current);
      await SubmitForm(formUrl, formContent);
      setSubmitted(true);
    } catch (e) {
      toast({
        title: "Ошибка!",
        description: "Что то пошло не так",
        variant: "destructive",
      });
    }
  };

  if (submitted) {
    return (
      <div className="flex justify-center w-full h-full items-center p-8">
        <div className="max-w-[680px] flex flex-col gap-4 flex-grow bg-background
      w-full p-8 overflow-y-auto border shadow-xl shadow-violet-700 rounded">
          <h1 className="text-2xl font-bold flex justify-center">
            Результаты отправлены!
          </h1>
          <p className="text-muted-foreground flex justify-center">
            Спасибо за прохождение опроса, теперь вы можете закрыть эту страницу.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div
        key={renderKey}
        className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background
      w-full p-8 overflow-y-auto border shadow-xl shadow-violet-700 rounded">
        {content.map(element => {
            const FormElement = FormElements[element.type].formComponent;
            return (
              <FormElement
                elementInstance={element}
                submitValue={submitValue}
                isInvalid={formErrors.current[element.id]}
                key={element.id}
                defaultValues={formValues.current[element.id]}
              />
            )
          })
        }
        <Button
          disabled={pending}
          onClick={() => startTransition(handleSubmitForm)}
          className="mt-8"
        >
          {pending ? (
            <ImSpinner className="animate-spin" />
          ) : (
            <>
              <HiCursorClick className="mr-2 w-5 h-5" />
              Отправить
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
