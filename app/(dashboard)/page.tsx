import { GetFormStats } from "@/actions/form";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import StatsCardsList from "../../components/stats-cards-list";
import FormCardsList from "@/components/form-cards-list";
import FormCardSkeleton from "@/components/form-cards-list/FormCardSkeleton";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCardsList loading/>}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Ваши формы</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CreateFormButton />
        <Suspense fallback={<FormCardSkeleton count={5} />}>
          <FormCardsList />
        </Suspense>
      </div>
    </div>
  );
};

const CardStatsWrapper = async () => {
  const {
    visits,
    submissions,
    submissionsRate,
    bounceRate
  } = await GetFormStats();

  return (
    <StatsCardsList
      visits={visits}
      submissions={submissions}
      submissionsRate={submissionsRate}
      bounceRate={bounceRate}
      loading={false}
    />
  );
};






