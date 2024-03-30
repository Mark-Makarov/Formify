import { GetForms, GetFormStats } from "@/actions/form";
import { LuView } from "react-icons/lu";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { TbArrowBounce } from "react-icons/tb";
import { HiCursorClick } from "react-icons/hi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import CreateFormButton from "@/components/CreateFormButton";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { ru } from 'date-fns/locale';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

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

export { StatsCard };

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

const FormCardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }, (_, index) => index).map((number) => (
        <Skeleton
          key={number}
          className='border-primary-/20 h-[190px] w-full border-2'
        />
      ))}
    </>
  );
};

const FormCard = ({ form: {
  createdAt,
  published,
  name,
  visits,
  submissions,
  description,
  id,
}}: { form: Form }) => {
  const { forms, builder } = process.env.routes;

  const formattedCreatedAt = formatDistance(createdAt, new Date(), {
    locale: ru,
    addSuffix: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center justify-between gap-2'>
          <span className='truncate font-bold'>{name}</span>
          {published ? (
            <Badge>Опубликовано</Badge>
          ) : (
            <Badge variant='destructive'>Черновик</Badge>
          )}
        </CardTitle>
        <CardDescription>
          {formattedCreatedAt}
          {published && (
            <span className="flex items-center gap-2">
              <LuView className="text-muted-foreground" />
              <span>{visits.toLocaleString()}</span>
              <FaWpforms className="text-muted-foreground" />
              <span>{submissions.toLocaleString()}</span>
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {description || "Описание отсутствует"}
      </CardContent>
      <CardFooter>
        {published ? (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`${forms}/${id}`} >
              Посмотреть заявки <BiRightArrowAlt className="scale-[1.5]" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="secondary" className="w-full mt-2 text-md gap-4">
            <Link href={`${builder}/${id}`} >
              Редактировать <FaEdit className="scale-[1.3]" />
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

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
