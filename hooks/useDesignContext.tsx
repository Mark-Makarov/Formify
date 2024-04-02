"use client";

import { useContext } from "react";
import { DesignContext } from "@/components/context/DesignContext";

const useDesignContext = () => {
  const context = useContext(DesignContext);

  if (!context) {
    throw new Error("useDesignContext must be used within a DesignContextProvider");
  }

  return context;
};

export default useDesignContext;
