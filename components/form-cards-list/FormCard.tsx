import { Form } from "@prisma/client";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LuView } from "react-icons/lu";
import { FaEdit, FaWpforms } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";

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
        <CardTitle className="flex items-center justify-between gap-2">
          <span className="truncate font-bold">{name}</span>
          {published ? (
            <Badge>Опубликовано</Badge>
          ) : (
            <Badge variant="destructive">Черновик</Badge>
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

export default FormCard;
