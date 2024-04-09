"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImShare } from "react-icons/im";
import { toast } from "@/components/ui/use-toast";

const FormLinkShare = ({ shareUrl }: { shareUrl: string }) => {
  const formShareUrl = `${process.env.baseUrl}submit/${shareUrl}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formShareUrl);
    toast({
      title: "Ссылка на форму скопирована в буфер обмена",
    });
  };

  return (
    <div className="flex flex-grow gap-4 items-center">
      <Input value={formShareUrl} readOnly />
      <Button
        className="w-[250px]"
        onClick={copyToClipboard}
      >
        <ImShare className="mr-2 h-4 w-4" />
        Поделиться ссылкой
      </Button>
    </div>
  );
};

export default FormLinkShare;
