import { GetFormContentByUrl } from "@/actions/form";
import { FormElementInstance } from "@/components/FormElements";
import FormSubmitComponent from "@/components/FormSubmitComponent";

const SubmitPage = async ({ params }: { params: { formUrl: string} }) => {
  const form = await GetFormContentByUrl(params.formUrl);

  if (!form) {
    // TODO: extract error messages types to constants
    throw new Error("form not found")
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
