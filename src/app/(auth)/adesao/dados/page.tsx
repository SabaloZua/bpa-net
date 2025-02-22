"use client";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

import { useEffect } from "react";
import { useStepperStore } from "@/contexts/stepsStore";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

const NovaContaPage = () => {
  const { currentStep, setCurrentStep } = useStepperStore();
  const router = useRouter();

  useEffect(() => {
    setCurrentStep(2);
  }, [currentStep]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push("/adesao/contrato");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <User className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Dados Pessoais</h2>
      </div>

      <p className="text-gray-600 mb-8">
        Para prosseguir com seu cadastro, precisamos confirmar alguns dados pessoais
      </p>

      <div className="space-y-6 w-full">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
          <Input type="text" placeholder="Digite seu nome completo" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Número do BI</label>
          <Input type="text" placeholder="Digite o número do seu BI" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Número da Conta</label>
          <Input type="text" placeholder="Digite o número da sua conta" />
        </div>
      </div>

      <div className="w-full mt-4">
        <Button type="submit">Continuar</Button>
      </div>
    </form>

  );
};

export default NovaContaPage;
