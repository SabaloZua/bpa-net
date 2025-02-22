"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, FileText } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useStepperStore } from "@/contexts/stepsStore";

import styles from "@/styles/contrato.module.css";

const ContratoPage = () => {
  const [accepted, setAccepted] = useState(false);
  const { currentStep, setCurrentStep } = useStepperStore();

  useEffect(() => {
    setCurrentStep(3);
  }, [currentStep]);

  return (
    <form className="w-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Contrato de Adesão</h2>
      </div>

      <div className="mb-8 h-[400px] overflow-y-auto pr-6 scrollbar-thin">
        <div className="space-y-6 text-gray-600 max-w-xl">
          <h2 className="text-xl font-semibold text-gray-800">BFA EDUCAR</h2>

          <p>
            A Aplicação BFA EDUCAR destina-se a sensibilizar e promover conceitos de literacia
            financeira junto do público mais jovens e com idades maior de 14 anos. Toda a informação
            disponibilizada tem como objectivo o conhecimento geral e partilha de conhecimento
            quanto a Literacia Financeira, sendo abordada de uma forma acessível e não substitui de
            forma alguma o conselho e o recurso a especialistas em caso de necessidade.
          </p>

          <p>
            O Banco de Fomento Angola construiu a app BFA Educar como uma app gratuita. Este SERVIÇO
            é fornecido pelo Banco de Fomento Angola sem qualquer custo e destina-se a ser utilizado
            tal como está.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-4">Termos de Uso</h3>

          <p>
            Ao acessar ou usar o BFA EDUCAR, você concorda em cumprir estes termos. Por favor,
            leia-os atentamente antes de utilizar o aplicativo. Não use o aplicativo se não
            concordar com os termos.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-4">Privacidade e Segurança</h3>

          <p>
            Valorizamos sua privacidade e protegemos suas informações pessoais. Coletamos apenas os
            dados necessários para fornecer nossos serviços e melhorar sua experiência.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-4">Responsabilidades</h3>

          <p>
            O usuário é responsável por manter a confidencialidade de suas credenciais de acesso e
            por todas as atividades realizadas em sua conta.
          </p>

          <h3 className="text-lg font-semibold text-gray-800 pt-4">Modificações do Serviço</h3>

          <p>
            Reservamos o direito de modificar ou descontinuar o serviço a qualquer momento, com ou
            sem aviso prévio. Não seremos responsáveis perante você ou terceiros por qualquer
            modificação, suspensão ou descontinuação do serviço.
          </p>
        </div>
      </div>

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

export default ContratoPage;
