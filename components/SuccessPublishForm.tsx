import Confetti from "react-confetti";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useClipboard from "@/hooks/useClipboard";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const SuccessPublishForm = ({ shareUrl, id }: { shareUrl: string, id: number }) => {
  const { main, forms } = process.env.routes;
  const formShareUrl = `${process.env.baseUrl}submit/${shareUrl}`;

  return (
    <>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={800}
      />
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="max-w-md">
          <h1 className="text-center text-3xl font-bold text-primary border-b pb-2 mb-10">
            🎊 Форма опубликована! 🎉
          </h1>
          <h2 className="text-2xl">
            Поделитесь формой
          </h2>
          <h3 className="text-xl text-muted-foreground border-b pb-10">
            Все пользователи имеющие ссылку на форму, смогут заполнить форму.
          </h3>
          <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
            <Input
              className="w-full"
              readOnly
              value={shareUrl}
            />
            <Button
              className="mt-2 w-full"
              onClick={() => useClipboard({ data: formShareUrl, text: "Ссылка на форму скопирована в буфер обмена" })}
            >
              копировать ссылку
            </Button>
          </div>
          <div className="flex justify-between">
            <Button asChild variant="link">
              <Link href={main} className="gap-2">
                <BsArrowLeft />
                Вернутся на главную
              </Link>
            </Button>
            <Button asChild variant="link">
              <Link href={`${forms}/${id}`} className="gap-2">
                Информация о форме
                <BsArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
};

export default SuccessPublishForm;
