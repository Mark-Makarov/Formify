"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const VisitFormButton = ({ shareUrl }: { shareUrl: string }) => {

  // TODO: refactor
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const formShareUrl = `${window?.location.origin}/submit/${shareUrl}`;

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
