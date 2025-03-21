import { Input } from "@/components/ui/input";
import { Terminal } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Banknote, LockKeyhole, User } from "lucide-react";
import { useState } from "react";

export default function Levantamentos() {
  const [pessoa, setPessoa] = useState("");

  return (
    <div className="flex">
      <div className="max-w-[36rem]">
        <div>
          <h1 className="text-3xl text-gray-900">Levantamentos</h1>
          <p className="font-medium text-gray-500 mt-2">
            Retire o seu dinheiro a qualquer momento.
          </p>
        </div>

        <div className="optionContainer mt-4">
          <div className="flex gap-1 items-center">
            <User className="text-gray-500" />
            <h2 className="text-[#2E90FA]">Quem vai levantar o dinheiro?</h2>
          </div>
          <div className="Options mt-2 flex p-1 gap-2">
            <div
              className="ParaMim hover:border-[#2E90FA] border w-72 h-16 rounded-md flex items-center justify-center text-gray-700 cursor-pointer"
              onClick={() => setPessoa("mim")}
            >
              Eu próprio
            </div>
            <div
              className="Other hover:border-[#2E90FA] w-72 h-16 rounded-md flex items-center justify-center text-gray-700 border cursor-pointer"
              onClick={() => setPessoa("outra")}
            >
              Outra pessoa
            </div>
          </div>
        </div>
        <div className="mt-2">
          {pessoa == "outra" ? (
            <div>
              <label htmlFor="" className="text-gray-500 flex items-center">
                Endereço do email do beneficiário
              </label>
              <Input className="mt-2" placeholder="" />
            </div>
          ) : (
            <div>
              <label htmlFor="" className="text-gray-500">
                Meu endereço de e-mail
              </label>
              <Input readOnly className="bg-gray-100 mt-2" />
            </div>
          )}
        </div>

        <div className="mt-6">
          <label htmlFor="" className="text-[#2E90FA] flex items-center gap-2">
            <Banknote className="text-gray-500" />
            Quanto dinheiro vai levantar?
          </label>
          <Input className="mt-2" type="number" placeholder="" />
        </div>

        <div className="mt-8">
          <label htmlFor="" className="text-[#2E90FA] flex items-center gap-2">
            <LockKeyhole className="text-gray-500" />
            Qual o seu código secreto?
          </label>
          <Alert className="mt-2 bg-gray-100">
            <Terminal className="h-4 w-4" />
            <AlertDescription>
              O codigo secreto será utilizado pelo destinatário para que possa realizar o
              levantamento
            </AlertDescription>
          </Alert>
          <Input className="mt-2" type="password" placeholder="" />
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-[#2E90FA] flex items-center gap-2">
            <LockKeyhole className="text-gray-500" />
            Repita o seu código secreto
          </label>
          <Input className="mt-2" type="password" placeholder="" />
        </div>

        <div className="mt-8">
          <button className="button_auth">Continuar</button>
        </div>
      </div>

      <div>
        <div className="UltimosPagamentos px-4 w-96">
          <div className="border rounded-md p-4 min-h-96">
            <h1>Levantamentos efectuados</h1>
            <Separator className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
