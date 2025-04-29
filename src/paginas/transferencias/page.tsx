"use client";
import React, { useState, useEffect } from "react";
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
import Cabecalho from '@/components/Cabecalho';
import ConfirmacaoModal from "@/components/modals/ConfirmacaoModal";
import { useDisclosure } from "@nextui-org/react";
import ValidacaoModal from "@/components/modals/ValidacaoModal";
interface Props {
  dados: DadosContaType | undefined;
}

const intraSchema = z.object({
  contadestino: z.string().min(5, "Número da conta inválido"),
  valor: z.string(),
  benefeciario: z.string(),
});

type IntraSchema = z.infer<typeof intraSchema>;

export default function Transferencias({ dados }: Props) {
  const [isLoading, setIsLoading] = useState(false);
    const [dadosForm, setDadosForm] = useState<IntraSchema>() 
  const useConta = useContaStore();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [otp, setOtp] = useState("");
   const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const { register, handleSubmit, watch, setValue } = useForm<IntraSchema>({
    resolver: zodResolver(intraSchema),
  });

  const transferTypeOptions = {
    intrabank: "intrabank",
    interbank: "interbank",
  };

  const [transferType, setTransferType] = useState(transferTypeOptions.intrabank);

  // Obtenha o valor do campo "contadestino"
  const contaDestinoValue = watch("contadestino");
  const benefeciario = watch("benefeciario");
  const montante = watch("valor");
  // Sempre que o valor do campo "contadestino" mudar, se for intrabank, faça a consulta
  useEffect(() => {
    if (
      transferType === transferTypeOptions.intrabank &&
      contaDestinoValue &&
      contaDestinoValue.length >= 16
    ) {
      // Chame a rota que retorna o nome do usuário com base no número da conta
      api.get(`/trasacao/benefeciario/${contaDestinoValue}`)
        .then(response => {
          // Supondo que a rota retorne um objeto com a propriedade "nome"
          setValue("benefeciario", response.data.nomeCliente);
        })
        .catch((error) => {
          console.error("Erro ao buscar beneficiário:", error);
          toast.error("Não foi possível buscar o beneficiário");
        });
    }
  }, [contaDestinoValue, transferType, setValue]);
  
  async function confirmarTransferencia(data: IntraSchema) {
    setDadosForm(data);
    onOpen();
  }
  async function handleTranferencia(otp: string) {
    try {
    
      if(otp.length <6) return;
      setIsLoading(true);

       const result = await api.post(`/trasacao/verificacodigo`,{codigo2fa:otp})
       console.log(result);
      const dataset = {
        descricao:
          transferType === transferTypeOptions.intrabank
            ? "Transferencia intrabancaria"
            : "Transferencia interbancaria",
        idconta: dados?.id,
        ...dadosForm,
      };

      const url =
        transferType === transferTypeOptions.intrabank
          ? "/trasacao/transferenciaintra"
          : "/trasacao/transferenciainter";

      const response = await api.post(url, dataset);

      useConta.setSaldo(Number(response.data.saldoactualizado));
      onClose2();
      toast.success(response.data.message, {
        action: {
          label: "Comprovativo",
          onClick: async () =>
            window.open(
              `https://bpanetapi.vercel.app/pdf/comprovativo/${response.data.idtransacao}`,
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

  return (
    <div>
      <Cabecalho Titulo="Trasnferências" subTitulo="Envie dinheiro a qualquer momento" />
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <form onSubmit={handleSubmit(confirmarTransferencia)} autoComplete="off">
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
                      placeholder="Conta origem"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-400 ease-in-out"
                      disabled
                    />
                  </div>
                </div>

                {/* Destination Account */}
                {transferType === transferTypeOptions.intrabank ? (
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
                      placeholder="Beneficiário"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-400 ease-in-out"
                      {...register("benefeciario")}
                      required
                      disabled={transferType === transferTypeOptions.intrabank}
                    />
                  </div>
                </div>

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

            {/* Submit */}
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
         <ConfirmacaoModal
              isOpen={isOpen}
              onClose={onClose}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onOpen2={onOpen2}
              title="Confirme os dados da transferência"
              dados={[
                {key:"Beneficiário", value:benefeciario},
                {key:"Montante", value:`${montante},00 Kz`}
              ]}
            />
          <ValidacaoModal
              isOpen={isOpen2}
              onClose={onClose2}
              otp={otp}
              setOtp={setOtp}
              isLoading={isLoading}
              handleFunction={handleTranferencia}
            />
    </div>
  );
}