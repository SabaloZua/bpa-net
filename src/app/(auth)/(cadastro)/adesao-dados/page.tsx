"use client";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import useStepsStore from "@/contexts/stepStore";
import { useEffect } from "react";

const NovaContaPage = () => {
  const stepsStore = useStepsStore();

  useEffect(() => {
    stepsStore.setCurrent(1);
    stepsStore.setStep1(true);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-medium">Insira os seus dados</h1>

      <div className="flex flex-col gap-2">
        <p className="text-sm">
          Bem-vindo ao nosso Internet Banking! Vamos configurar sua conta em poucos passos
        </p>
        <p className="text-sm">
          Para começar sua adesão, informe o e-mail vinculado à sua conta BPA
        </p>
      </div>

      <Input />

      <Button type="submit">Continuar</Button>
    </div>
  );
};

export default NovaContaPage;
