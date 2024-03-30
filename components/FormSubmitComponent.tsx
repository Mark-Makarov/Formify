"use client";

import { FormElementInstance, FormElements } from "@/components/FormElements";
import { Button } from "@/components/ui/button";
import { HiCursorClick } from "react-icons/hi";

interface FormSubmitComponentProps {
  content: FormElementInstance[],
  formUrl: string,
}
const FormSubmitComponent = ({
  content,
  formUrl,
}: FormSubmitComponentProps) => {
  const handleSubmitForm = async () => {

  }

  return (
    <div className="flex justify-center w-full h-full items-center p-8">
      <div className="max-w-[620px] flex flex-col gap-4 flex-grow bg-background
      w-full p-8 overflow-y-auto border shadow-xl shadow-violet-700 rounded">
        {content.map(element => {
            const FormElement = FormElements[element.type].formComponent;
            return (
              <FormElement elementInstance={element} key={element.id} />
            )
          })
        }
        <Button
          onClick={handleSubmitForm}
          className="mt-8"
        >
          <HiCursorClick className="mr-2 w-5 h-5" />
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default FormSubmitComponent;
