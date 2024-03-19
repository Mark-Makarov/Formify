import { GetFormStats } from "@/actions/form";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa"
import { TbArrowBounce } from "react-icons/tb"
import { HiCursorClick } from "react-icons/hi"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="container pt-4">
      <Suspense fallback={<StatsCardsList loading/>}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6" />
      <h2 className="text-4xl font-bold col-span-2">Ваши формы</h2>
      <Separator className="my-6" />
    </div>
  );
};
// TODO: refactor
interface StatsCardProps {
  title: string,
  icon: React.ReactNode,
  helperText: string,
  value: string,
  loading: boolean,
  className: string,
}
const StatsCard = ({
  title,
  icon,
  helperText,
  value,
  loading,
  className,
}: StatsCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading ? (
            <Skeleton>
              <span className="opacity-0">""</span>
            </Skeleton>
          ) : value}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  )
};

interface StatsCardsListProps {
  data?: Awaited<ReturnType<typeof GetFormStats>>,
  loading: boolean,
}
const StatsCardsList = ({ data, loading }: StatsCardsListProps) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Посещений"
        icon={<LuView className="scale-[2] text-blue-600" />}
        helperText="Посещения формы за всё время"
        value={data?.visits.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Заявок"
        icon={<FaWpforms className="scale-[2] text-purple-600" />}
        helperText="Все заявки по форме"
        value={data?.submissions.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-purple-600"
      />
      <StatsCard
        title="Конверсия"
        icon={<HiCursorClick className="scale-[2] text-green-600" />}
        helperText="Соотношение посещений к заявкам"
        value={data?.submissionsRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Отказы"
        icon={<TbArrowBounce className="scale-[2] text-red-600" />}
        helperText="Заявка не была оставлена при посещении"
        value={data?.bounceRate.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
};

const CardStatsWrapper = async () => {
  const stats = await GetFormStats();

  return <StatsCardsList data={stats} loading={false} />
}
