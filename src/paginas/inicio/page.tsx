/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import Tabela from "@/components/Tabela";
import { ArrowRight, CreditCard, Eye, EyeClosed, Settings } from "lucide-react";
import Cartao from "@/components/Cartão";
import Cambio from "@/components/cambio";
import { Input } from "@/components/ui/input";
import {  useEffect, useState } from "react";

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
import GuideDriver from "@/components/Guia";
//Modals
import { useDisclosure } from "@nextui-org/react";

import ValidacaoModal from "@/components/modals/ValidacaoModal";
import ConfirmacaoModal from "@/components/modals/ConfirmacaoModal";

interface Props {
  dadosConta: DadosContaType | undefined;
  setDashboardPage?: (page: string) => void; // nova prop para atualizar o state no Dashboard
}

export default function Home({ dadosConta, setDashboardPage }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [mostrarSaldo, setMostrarSado] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const [beneficiario, setBeneficiario] = useState("");
  const [montante, setMontante] = useState(0);
  const mudarIcon = mostrarSaldo === true ? false : true;
  const [otp, setOtp] = useState("");
  const [dadosForm, setDadosForm] = useState<nahoraSchema>() 
  const dashboardSteps = [
    { element: '.pessoa', popover: { title: 'Bem Vindo', description: 'Seja bem vindo ao BPA NET agora Iremos guia-lo' } },
    { element: '#inicio', popover: { title: 'Cartão', description: 'Aqui você pode ver os dados do seu cartão' } },
    { element: '.nahora', popover: { title: 'Na hora', description: 'Aqui você pode fazer trasferencias intrabancarias de uma forma rápida apartir do numero de telefone ' } },
    { element: '.trans', popover: { title: 'Transações', description: 'Aqui você pode acompanhe suas transações recentes ' } },
    { element: '.cambio', popover: { title: 'Cambio', description: 'Aqui você pode fazer a converção de uma moeda para outra ' } },
  ]
  const [showGuide, setShowGuide] = useState(false);
  // Inicializa o driver mas adia o drive() até ter certeza que o elemento existe
  useEffect( () => {
    // Aguarda até que o elemento ".pessoa" esteja presente na DOM
    if (localStorage.getItem('primeiroLogin') == 'true') {
      if(!localStorage.getItem('GuiaInicioE')) {
      // Executa o driver
      setTimeout(() => setShowGuide(true), 100);
      }	
      // Seta a flag para que não execute novamente
    }
  }, []);


  const useConta = useContaStore();

  const nahoraSchema = z.object({
    valor: z.string(),
    telefonecontadestino: z.string().min(9,"Formato de telefone inválido"),
  });

  type nahoraSchema = z.infer<typeof nahoraSchema>;
  const { register, handleSubmit,formState: { errors }, } = useForm<nahoraSchema>({
    resolver: zodResolver(nahoraSchema),
  });


  async function procurarBeneficiario(data: nahoraSchema) {
    try {
      setIsLoading(true);
      const dataset = {
        idconta: Number(localStorage.getItem("idConta")),
        ...data,
      };

      setDadosForm(data);

      const url = "/trasacao/beneficiarionahora";
      const response = await api.post(url, dataset);
      setBeneficiario(response.data.beneficiario);
      setMontante(response.data.montante);
      onOpen();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Sem conexão com o servidor" + error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleNahora(otp:string) {
    try {
      if(otp.length <6) return;
      setIsLoading(true);
      const dataset = {
        idconta: Number(localStorage.getItem("idConta")),
        ...dadosForm,
      };

      const result = await api.post(`/trasacao/verificacodigo`,{codigo2fa:otp})
      console.log(result)

      //console.log(dadoadd)
      const url = "/trasacao/nahora";
      const response = await api.post(url, dataset);
      useConta.setSaldo(response.data.saldoactualizado);
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
      onClose2()
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

  console.log(dadosConta?.saldo);

  return (
    <div>
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
            Saldo: Kz <span>{mostrarSaldo ? "****,00" : `${formataSaldo(useConta.saldo)}`}</span>
          </h1>
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Card Section */}

          <div className=" lg:col-span-2 bg-gray-100 rounded-lg p-4 flex flex-col " id="inicio">
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-medium text-blue-500">Cartões</h2>
              <div className="text-blue-500">
               
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-[#efefef]   mb-4 mt-2" />

            <div className="w-full flex justify-center">
              <Cartao dados={dadosConta} />
            </div>
            <div className="flex justify-center mt-6">
              <div className=" flex space-x-12">
                <button
                  className=" lev  flex flex-col items-center text-gray-600"
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    setDashboardPage && setDashboardPage("levantamentos");
                  }}
                >
                  <div className=" p-3 rounded-full border border-gray-300 mb-2">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="text-sm">Levantar</span>
                </button>
                <button className="flex flex-col items-center text-gray-600"
                 onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  setDashboardPage && setDashboardPage("conta");
                }}
                >
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
            onSubmit={handleSubmit(procurarBeneficiario)}
            className="nahora bg-gray-100 rounded-lg p-4 flex  items-center flex-col"
          >
            <div className=" w-full flex items-center justify-between">
              <h2 className="text-lg font-medium text-blue-500">Enviar NaHora</h2>
              <div className="text-blue-500">
                
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
                  maxLength={9}
                  max={999999999}
                  type="number"
                  {...register("telefonecontadestino")}
                  required
                />
                 {errors.telefonecontadestino && <p className="text-red-500 text-sm">{errors.telefonecontadestino.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Montante *</label>
                <div className="relative">
                  <Input
                    placeholder="Insira o montante a enviar"
                    {...register("valor")}
                    required
                    type="number"
                    min={0}
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

        <div className="grid grid-cols-1 rounded-lg lg:grid-cols-4 gap-4 p-5 bg-gray-100 ">
          {/* llll; */}
          <div className="trans  lg:col-span-2 bg-white rounded-xl  p-4 flex flex-col ">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-blue-500">Transaçoes recentes</h2>
              <div className="text-blue-500">
              
              </div>
            </div>
            <div className="w-full h-[0.5px] bg-[#efefef]   mb-4 mt-2" />
            <Tabela />
          </div>
          <div className=" cambio lg:col-span-2 bg-white rounded-xl p-3 flex flex-col ">
            <div className="flex items-center justify-between ">
              <h2 className="text-lg font-medium text-blue-500">Câmbio</h2>
              <div className="text-blue-500">
               
              </div>
            </div>

            {/* Cambio section */}
            <div className="w-full h-[0.5px] bg-[#efefef] mb-4  mt-2" />
            <Cambio />
          </div>
        </div>
      </div>

      {/* Modals */}

      <ConfirmacaoModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onOpen2={onOpen2}
        title="Confirme os dados da transferência"
        dados={[
          {key:"Beneficiário", value:beneficiario},
          {key:"Montante", value:`${montante},00 Kz`}
        ]}
      />

      <ValidacaoModal
        isOpen={isOpen2}
        onClose={onClose2}
        otp={otp}
        setOtp={setOtp}
        isLoading={isLoading}
        handleFunction={handleNahora}
      />
      {showGuide && <GuideDriver steps={dashboardSteps} onFinish={()=>{
      console.log("Tour finalizado! Inciando o tour novamente");
      localStorage.setItem('GuiaInicioE', 'true');
      setShowGuide(false);
      }} />}
    </div>
  );
}
