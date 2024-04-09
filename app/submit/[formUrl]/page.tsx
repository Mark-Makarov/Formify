import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/form-elements";
import FormSubmitComponent from "@/components/FormSubmitComponent";
import { content } from "@/contents";

const SubmitPage = async ({ params }: { params: { formUrl: string} }) => {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    throw new Error(content.formNotFound)
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return (
    <FormSubmitComponent
      content={formContent}
      formUrl={params.formUrl}
    />
  );
};

export default SubmitPage;
