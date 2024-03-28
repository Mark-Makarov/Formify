"use client";

import { FormElementInstance } from "@/components/FormElements";
import { createContext, useState } from "react";

export type DesignContextType = {
  elements: FormElementInstance[],
  setElements: React.Dispatch<React.SetStateAction<FormElementInstance[]>>,
  addElement: (index: number, element: FormElementInstance) => void,
  removeElement: (id: string) => void,
  selectedElement: FormElementInstance | null,
  setSelectedElement: React.Dispatch<React.SetStateAction<FormElementInstance | null>>,
  updateElement: (id: string, element: FormElementInstance) => void,
};

export const DesignContext = createContext<DesignContextType | null>(null);

export default function DesignContextProvider({ children }: { children: React.ReactNode }) {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null);

  const addElement =  (index: number, element: FormElementInstance) => {
    setElements(prev => {
      const newElementsList = [...prev];
      newElementsList.splice(index, 0, element);

      return newElementsList;
    })
  };

  const removeElement = (id: string) => {
    setElements(prev => prev.filter((element) => element.id !== id));
  };

  const updateElement =  (id: string, element: FormElementInstance) => {
    setElements(prev => {
      const newElementsList = [...prev];
      const index = newElementsList.findIndex(element => element.id === id);
      newElementsList[index] = element;

      return newElementsList;
    })
  };

  return (
    <DesignContext.Provider
      value={{
        elements,
        setElements,
        addElement,
        removeElement,
        selectedElement,
        setSelectedElement,
        updateElement,
    }}
    >
      {children}
    </DesignContext.Provider>
  )
};
