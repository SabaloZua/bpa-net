"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, Download, KeyRound } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useStepperStore } from "@/contexts/stepsStore";

import styles from "@/styles/contrato.module.css";
import Image from "next/image";

const CredenciaisPage = () => {
  const [accepted, setAccepted] = useState(false);
  const { currentStep, setCurrentStep } = useStepperStore();

  useEffect(() => {
    setCurrentStep(4);
  }, [currentStep]);

  return (
    <form className="w-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <KeyRound  className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Suas credenciais</h2>
      </div>

      <div className=" h-fit overflow-y-auto pr-6 scrollbar-thin mb-4">
        <div className="space-y-6 text-gray-600 max-w-xl">
          <h2 className="text-xl font-semibold text-gray-800">BPA NET</h2>

          <div className="flex">
            <p>
              O BPA NET é a plataforma de internet banking do Banco BPA, oferecendo acesso seguro e
              conveniente a serviços bancários online. Através dela, o cliente pode consultar saldos,
              efetuar pagamentos, transferências e outras operações de forma rápida e prática.
              Disponível 24 horas por dia, o BPA NET garante total segurança e eficiência para a sua
              experiência bancária digital.
            </p>
            <Image src={"/banners/contrato.svg"} alt="BPA NET" width={300} height={50}  className="hidden lg:flex"/>
          </div>
        </div>
      </div>

      <p className="text-gray-600 flex items-center gap-2 mb-4 cursor-pointer">
        <Download  className="w-6 h-6" strokeWidth={2.5} /> Baixar contrato de adesão
      </p>

      <div className="bg-white rounded-xlp-6">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className={styles.customCheckbox}
          />
          <span className="text-gray-700">
            Li e aceito todos os{" "}
            <span className="text-blue-600">termos e condições do contrato</span>
          </span>
        </label>
        <Button
          className={`mt-6 w-full py-3 px-4 rounded-lg flex items-center justify-center gap-2 font-medium transition-all
                      ${
                        accepted
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
          disabled={!accepted}
        >
          Continuar
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </form>
  );
};

export default CredenciaisPage;
