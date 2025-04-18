"use client";

import React, { useEffect } from "react";
import { ArrowRight, KeyRound } from "lucide-react";

import { useStepperStore } from "@/contexts/stepsStore";

import Image from "next/image";
import Link from "next/link";

const CredenciaisPage = () => {
  const { currentStep, setCurrentStep } = useStepperStore();

  useEffect(() => {
    setCurrentStep(4);
  }, [currentStep, setCurrentStep]);

  return (
    <div className="flex flex-col gap-3 md:max-w-[35rem]">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <KeyRound className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Suas credenciais</h2>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-800 ">
          As suas credenciais já foram enviadas para o seu email! Verifique a sua caixa de entrada para as visualizar.
        </p>
      </div>

      <div className="flex flex-col gap-2 mx-auto">
        <Image
          src="/banners/credenciais.svg"
          alt="Email de Verificação enviado"
          width={400}
          height={100}
        />
      </div>
      <Link href={'/login'} className="button_auth">
        Fazer login
        <ArrowRight style={{ width: "1.25rem", height: "1.25rem" }} />
      </Link>
    </div>
  );
};

export default CredenciaisPage;
