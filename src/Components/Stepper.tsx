import React from "react";
import { Mail, User, FileText, KeyRound, Check, Landmark } from "lucide-react";

interface StepperProps {
  currentStep: number;
  type: "adesao" | "registo";
}

export function Stepper({ currentStep, type }: StepperProps) {

  const steps = type === "adesao" ? [
    { number: 1, title: "Email", icon: Mail },
    { number: 2, title: "Dados", icon: User },
    { number: 3, title: "Contrato", icon: FileText },
    { number: 4, title: "Credenciais", icon: KeyRound },
  ] : [
    { number: 1, title: "Tipo de conta", icon: Landmark},
    { number: 2, title: "Dados Pessoais", icon: User },
    { number: 3, title: "Documentação", icon: FileText },
    { number: 4, title: "Credenciais", icon: KeyRound },
  ];


  return (
    <div className="w-full md:w-64 md:flex-shrink-0">
      {/* Desktop Stepper */}
      <div className="hidden md:flex flex-col space-y-6 p-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center">
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.number <= currentStep
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <span className="text-lg font-semibold">
                    {step.number < currentStep ? <Check className="w-4 h-4" /> : step.number}
                  </span>
                </div>
                <div className="absolute top-0 -right-8 h-10 flex items-center">
                  <step.icon
                    className={`w-5 h-5 ${
                      step.number <= currentStep ? "text-blue-600" : "text-gray-400"
                    }`}
                  />
                </div>
              </div>
              <span
                className={`ml-12 text-sm font-bold ${
                  step.number <= currentStep ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-0.5 h-8 ml-6 transition-colors duration-300 ${
                  step.number < currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden flex items-center justify-between px-4 py-6 bg-white shadow-sm">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center flex-wrap">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step.number <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                <span className="text-base font-semibold">
                  {step.number < currentStep ? <Check className="w-4 h-4" /> : step.number}
                </span>
              </div>
              <step.icon
                className={`w-4 h-4 mb-1 ${
                  step.number <= currentStep ? "text-blue-600" : "text-gray-400"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  step.number <= currentStep ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mt-5 transition-colors duration-300 ${
                  step.number < currentStep ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
