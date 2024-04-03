import { GetForms } from "@/actions/form";
import FormCard from "@/components/form-cards-list/FormCard";

const FormCardsList = async () => {
  const forms = await GetForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  )
}

export default FormCardsList;
