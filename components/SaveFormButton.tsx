import React from "react";
import { Button } from "@/components/ui/button";
import { HiSaveAs } from "react-icons/hi";

const SaveFormButton = () => {
  return (
    <Button variant="outline" className="gap-2">
      <HiSaveAs className="h-6 w-6" />
      Сохранить
    </Button>
  );
};

export default SaveFormButton;
