"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const Error = () => {
  const { main } = process.env.routes;

  return (
    <div className="flex w-full h-full flex-col items-center justify-center gap-6">
      <h2 className="text-destructive text-4xl">
        Упс... произошла ошибка!
      </h2>
      <Button asChild>
        <Link href={main}>
          Вернуться на главную
        </Link>
      </Button>
    </div>
  );
};

export default Error;
