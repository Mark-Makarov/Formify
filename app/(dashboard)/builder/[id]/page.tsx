import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/design/FormBuilder";
import { content } from "@/contents";

const BuilderPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error(content.formNotFound)
  }

  return <FormBuilder form={form} />;
};

export default BuilderPage;
