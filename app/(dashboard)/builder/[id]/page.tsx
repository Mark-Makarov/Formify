import { GetFormById } from "@/actions/form";
import FormBuilder from "@/components/FormBuilder";

interface BuilderPageProps {
  id: string,
}
const BuilderPage = async ({ params }: { params: BuilderPageProps }) => {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    // TODO: extract error messages types to constants
    throw new Error("form not found")
  }

  return (
    <FormBuilder form={form} />
  );
};

export default BuilderPage;
