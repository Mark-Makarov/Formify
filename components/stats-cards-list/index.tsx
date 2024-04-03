import { GetFormStats } from "@/actions/form";
import StatsCard from "@/components/stats-cards-list/StatsCard";
import { LuView } from "react-icons/lu";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

interface StatsCardsListProps {
  submissionsRate?: number,
  bounceRate?: number,
  visits?: number,
  submissions?: number
  loading: boolean,
}
const StatsCardsList = ({
  submissionsRate,
  visits,
  submissions,
  bounceRate,
  loading
}: StatsCardsListProps) => {
  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
      <StatsCard
        title="Посещений"
        icon={<LuView className="scale-[2] text-blue-600" />}
        helperText="Посещения формы за всё время"
        value={visits?.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard
        title="Заявок"
        icon={<FaWpforms className="scale-[2] text-purple-600" />}
        helperText="Все заявки по форме"
        value={submissions?.toLocaleString() || ""}
        loading={loading}
        className="shadow-md shadow-purple-600"
      />
      <StatsCard
        title="Конверсия"
        icon={<HiCursorClick className="scale-[2] text-green-600" />}
        helperText="Соотношение посещений к заявкам"
        value={submissionsRate?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Отказы"
        icon={<TbArrowBounce className="scale-[2] text-red-600" />}
        helperText="Заявка не была оставлена при посещении"
        value={bounceRate?.toLocaleString() + "%" || ""}
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  );
};

export default StatsCardsList;
