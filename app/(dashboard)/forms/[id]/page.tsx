import { GetFormById } from "@/actions/form";
import VisitFormButton from "@/components/VisitFormButton";
import FormLinkShare from "@/components/FormLinkShare";
import { content } from "@/contents";
import StatsCardsList from "@/components/stats-cards-list";
import SubmissionsTable from "@/components/submissions-table/SubmissionsTable";

const FormDetailPage = async ({ params }: { params: { id: string } }) => {
  const form = await GetFormById(Number(params.id));
  if (!form) {
    throw new Error(content.formNotFound)
  }

  const {
    visits,
    submissions,
    name,
    shareUrl,
  } = form;

  const submissionsRate = submissions ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionsRate;

  return (
    <>
      <div className="py-10 border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">
            {name}
          </h1>
          <VisitFormButton shareUrl={shareUrl} />
        </div>
        </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={shareUrl} />
        </div>
      </div>
      <StatsCardsList
        visits={visits}
        submissionsRate={submissionsRate}
        submissions={submissions}
        bounceRate={bounceRate}
        loading={false}
      />
      <div className="container pt-10">
        <SubmissionsTable id={params.id} />
      </div>
    </>
  );
};

export default FormDetailPage;
