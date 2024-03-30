import { GetFormById, GetFromWithSubmissions } from "@/actions/form";
import VisitFormButton from "@/components/VisitFormButton";
import FormLinkShare from "@/components/FormLinkShare";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";
import { StatsCard } from "@/app/(dashboard)/page";
import { ElementsType, FormElementInstance } from "@/components/FormElements";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FormDetailPageProps {
  id: string,
}
const FormDetailPage = async ({ params }: { params: FormDetailPageProps }) => {
  const { id } = params;
  const form = await GetFormById(Number(id));

  if (!form) {
    // TODO: extract error messages types to constants
    throw new Error("form not found")
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
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2
      lg:grid-cols-4 container">
        {/*// TODO: duplicate dasboard/page, refactor*/}
        <StatsCard
          title="Посещений"
          icon={<LuView className="scale-[2] text-blue-600" />}
          helperText="Посещения формы за всё время"
          value={visits.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-blue-600"
        />
        <StatsCard
          title="Заявок"
          icon={<FaWpforms className="scale-[2] text-purple-600" />}
          helperText="Все заявки по форме"
          value={submissions.toLocaleString() || ""}
          loading={false}
          className="shadow-md shadow-purple-600"
        />
        <StatsCard
          title="Конверсия"
          icon={<HiCursorClick className="scale-[2] text-green-600" />}
          helperText="Соотношение посещений к заявкам"
          value={submissionsRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-green-600"
        />
        <StatsCard
          title="Отказы"
          icon={<TbArrowBounce className="scale-[2] text-red-600" />}
          helperText="Заявка не была оставлена при посещении"
          value={bounceRate.toLocaleString() + "%" || ""}
          loading={false}
          className="shadow-md shadow-red-600"
        />
      </div>
      <div className="container pt-10">
        <SubmissionsTable id={id} />
      </div>
    </>
  );
};

export default FormDetailPage;

type Column = {
  id: string;
  label: string;
  required: boolean;
  type: ElementsType;
};

type Row = { [key: string]: string } & { submittedAt: Date };

const SubmissionsTable = async ({ id }: { id: string }) => {
  const form = await GetFromWithSubmissions(Number(id));
  if (!form) {
    // TODO: extract error messages types to constants
    throw new Error("form not found")
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: Column[]  = [];
  formElements.forEach(element => {
    switch (element.type) {
      case "TextField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        })
        break;

      default: break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissons.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <>
      <h1 className="text-2xl font-bold my-4">
        Заявки
      </h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead
                  key={column.id}
                  className="uppercase"
                >
                  {column.label}
                </TableHead>
              ))}
              <TableHead
                className="text-muted-foreground text-right uppercase"
              >
                Отправлено:
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {columns.map(column => (
                  <RowCell
                    key={column.id}
                    type={column.type}
                    value={row[column.id]}
                  />
                ))}

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
