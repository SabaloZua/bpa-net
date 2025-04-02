/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import Tabela from "@/components/Tabela";
import { ArrowRight, CreditCard, Eye, EyeClosed, Settings } from "lucide-react";
import Cartao from "@/components/Cartão";
import Cambio from "@/components/cambio";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
// import { useLayoutEffect } from "react";
import api from "@/utils/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { TailSpin } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DadosContaType } from "@/types/commons";
import { formataNome, formataSaldo } from "@/constants/modules";
import useContaStore from "@/contexts/contaStore";

interface Props {
  dadosConta: DadosContaType | undefined;
  setDashboardPage?: (page: string) => void; // nova prop para atualizar o state no Dashboard
}

export default function Home({ dadosConta, setDashboardPage }: Props) {

  const [isLoading, setIsLoading] = useState(false);
  const [mostrarSaldo, setMostrarSado] = useState(true);
  const mudarIcon = mostrarSaldo === true ? false : true;

  const useConta = useContaStore();

  const nahoraSchema = z.object({
    valor: z.string(),
    telefonecontadestino: z.string(),
  });

  type nahoraSchema = z.infer<typeof nahoraSchema>;
  const { register, handleSubmit } = useForm<nahoraSchema>({
    resolver: zodResolver(nahoraSchema),
  });
  async function handleNahora(data: nahoraSchema) {
    try {
      setIsLoading(true);
      const dataset = {
        idconta: Number(localStorage.getItem("idConta")),
        ...data,
      };

      //console.log(dadoadd)
      const url = "/trasacao/nahora";
      const response = await api.post(url, dataset);
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
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Sem conexão com o servidor");
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  //Funções Auxiliares

  
  

  console.log(dadosConta?.saldo)

  return (
    <div >
      
      <p className="ola font-medium text-gray-500  mb-6">
        Olá{" "}
        <span className="font-medium text-blue-500">{formataNome(dadosConta?.cliente.nome)}</span>{" "}
        👋
      </p>

      <div className="flex items-center mb-6">
        <div className="bg-gray-200 p-2 rounded-full mr-4">
          <span
            className="h-5 w-5 text-gray-600"
            onClick={() => {
              setMostrarSado(mudarIcon);
            }}
          >
            {mudarIcon ? <EyeClosed /> : <Eye />}
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Saldo: Kz <span>{mostrarSaldo ? "****,00" : `${formataSaldo(useConta.saldo)},00`}</span>
          </h1>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2" >
          {/* Card Section */}

          <div className=" lg:col-span-2 bg-gray-100 rounded-lg p-4 flex flex-col " id="inicio">
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-medium text-blue-500">Cartões</h2>
              <div className="text-blue-500">
                <ArrowRight />
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-[#efefef]   mb-4 mt-2" />

            <div className="w-full flex justify-center">
              <Cartao dados={dadosConta}  />
              
            </div>
            <div className="flex justify-center mt-6">
              <div className=" flex space-x-12">
                <button  className=" flex flex-col items-center text-gray-600" onClick={()=>{
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  setDashboardPage && setDashboardPage('levantamentos')}
                    } >
                  <div className=" lev p-3 rounded-full border border-gray-300 mb-2">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span  className="text-sm">Levantar</span>
                </button>
                <button className="flex flex-col items-center text-gray-600">
                  <div className="p-3 rounded-full border border-gray-300 mb-2">
                    <Settings className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Definições</span>
                </button>
              </div>
            </div>
          </div>

          {/* Transfer Section */}
          <form
            onSubmit={handleSubmit(handleNahora)}
            className="nahora bg-gray-100 rounded-lg p-4 flex  items-center flex-col"
          >
            <div className=" w-full flex items-center justify-between">
              <h2 className="text-lg font-medium text-blue-500">Enviar NaHora</h2>
              <div className="text-blue-500">
                <ArrowRight />
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-[#efefef]   mb-4 mt-2" />
            <div className="space-y-4 w-full p-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conta de Origem
                </label>
                <div className="relative">
                  <Input className="" disabled={true} placeholder={dadosConta?.numeroConta} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Beneficiário *
                </label>

                <Input
                  placeholder="Insira o N° de Telemóvel do Beneficiário"
                  {...register("telefonecontadestino")}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Montante *</label>
                <div className="relative">
                  <Input
                    placeholder="Insira o montante a enviar"
                    {...register("valor")}
                    required
                  />
                </div>
              </div>

              <button
                disabled={isLoading}
                type="submit"
                className="w-full bg-blue-500 text-white rounded-md py-2 px-4 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="trans grid grid-cols-1 rounded-lg lg:grid-cols-4 gap-4 p-5 bg-gray-100 ">
          {/* llll; */}
          <div className=" lg:col-span-2 bg-white rounded-xl  p-4 flex flex-col ">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-blue-500">Transaçoes recentes</h2>
              <div className="text-blue-500">
                <Link href={'#'} className="cursor-pointer" onClick={()=>{setDashboardPage && setDashboardPage('transacoes')}}>
                  <ArrowRight />
                </Link>
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-[#efefef]   mb-4 mt-2" />
            <Tabela />
          </div>
          <div className=" lg:col-span-2 bg-white rounded-xl p-3 flex flex-col ">
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-medium text-blue-500">Câmbio</h2>
              <div className="text-blue-500">
                <ArrowRight />
              </div>
            </div>

            {/* Cambio section */}
            <div className="w-full h-[0.5px] bg-[#efefef] mb-4  mt-2" />
            <Cambio />
          </div>
        </div>
      </div>
  
     
    </div>
    
  );
}
