"use client";
import React, { useState } from "react";
import { ArrowRight, CreditCard, User } from "lucide-react";
import { RadioGroup, Radio } from "@nextui-org/react";
import api from "@/utils/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useContaStore from "@/contexts/contaStore";
import { DadosContaType } from "@/types/commons";

interface Props {
  dados: DadosContaType | undefined;
}

export default function Transferencias({ dados }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const useConta = useContaStore();

  const intraSchema = z.object({
    contadestino: z.string().min(5, "Número da conta inválido"),
    valor: z.string(),
    benefeciario: z.string(),
  });

  console.log(dados?.id);

  type intraSchema = z.infer<typeof intraSchema>;
  const { register, handleSubmit } = useForm<intraSchema>({
    resolver: zodResolver(intraSchema),
  });

  async function handleTranferencia(data: intraSchema) {
    try {
      setIsLoading(true);
      const dataset = {
        descricao:
          transferType === "intrabank"
            ? "Transferencia intrabancaria"
            : "Transferencia interbancaria",
        idconta: dados?.id,
        ...data,
      };

      //console.log(dadoadd)
      const url =
        transferType === "intrabank"
          ? "/trasacao/transferenciaintra"
          : "/trasacao/transferenciainter";
      const response = await api.post(url, dataset);

      useConta.setSaldo(Number(response.data.saldoactualizado));
      toast.success(response.data.message, {
        action: {
          label: "Comprovativo",
          onClick: async () =>
            window.open(
              `http://localhost:5000/pdf/comprovativo/${response.data.idtransacao}`,
              "_blank"
            ),
        },
      });
    } catch (erro) {
      if (erro instanceof AxiosError) {
        if (erro.response?.status === 400) {
          toast.error(erro.response?.data.message);
        } else {
          toast.error("Sem conexão com o servidor");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  const [transferType, setTransferType] = useState("intrabank");

  return (
    <div className="bg-gray-100 rounded-xl p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <form onSubmit={handleSubmit(handleTranferencia)} autoComplete="off">
          <div className="px-6 py-5 sm:p-6">
            {/* Transfer Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Transferência
              </label>

              <RadioGroup
                value={transferType}
                onChange={(e) => setTransferType(e.target.value)}
                className="mt-2"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Radio value="intrabank" description="Dentro do mesmo Banco">
                    Intrabancária
                  </Radio>
                  <Radio value="interbank" description="Entre bancos diferentes">
                    Interbancária
                  </Radio>
                </div>
              </RadioGroup>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* Origin Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conta de Origem
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={dados?.numeroConta}
                    placeholder="conta destino"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-400 ease-in-out"
                    disabled
                 />
                </div>
              </div>

              {/* Beneficiary */}
              <div>
                <label
                  htmlFor="beneficiary"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Beneficiário <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    id="beneficiary"
                    type="text"
                    placeholder="Insira o nome do beneficiário"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent   transition-all duration-400 ease-in-out"
                    {...register("benefeciario")}
                    required
                  />
                </div>
              </div>

              {/* Destination Account */}

              {/* Bank Code (only for interbank transfers) */}
              {transferType === "intrabank" ? (
                <div>
                  <label
                    htmlFor="destination-account"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Conta Destino <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="destination-account"
                      type="text"
                      placeholder="Insira o número da conta de destino"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-400 ease-in-out"
                      {...register("contadestino")}
                      required
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="destination-account"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    IBAN <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <CreditCard size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="destination-account"
                      type="text"
                      placeholder="Insira o número do IBAN de destino"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-400 ease-in-out"
                      {...register("contadestino")}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  Montante <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">Kz</span>
                  </div>
                  <input
                    id="amount"
                    type="text"
                    placeholder="0.00"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
                    {...register("valor")}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">Kz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subimit */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center font-medium transition-colors duration-200 shadow-md"
            >
              {isLoading ? (
                <TailSpin
                  height="25"
                  width="25"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                />
              ) : (
                <>
                  <span>Validar</span>
                  <ArrowRight size={18} className="ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
