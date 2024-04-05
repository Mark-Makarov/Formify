"use client";

import { Button } from "@/components/ui/button";

const VisitFormButton = ({ shareUrl }: { shareUrl: string }) => {
  const formShareUrl = `${process.env.baseUrl}submit/${shareUrl}`;

  return (
   <Button
     className="w-[200px]"
     onClick={() => window.open(formShareUrl, "_blank")}
   >
     Посетить
   </Button>
  );
};

export default VisitFormButton;
