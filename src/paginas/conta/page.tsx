import { DadosContaType } from "@/types/commons";
import Cabecalho from '@/components/Cabecalho'
import Cartao, { formatExpiryDate } from "@/components/Cartão";
import { LockIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formataNome} from "@/constants/modules";
import GuideDriver from "@/components/Guia";
import { useState, useEffect } from "react";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import ConfirmacaoModal from "@/components/modals/ConfirmacaoModal";
import ValidacaoModal from "@/components/modals/ValidacaoModal";
import { useDisclosure } from "@nextui-org/react";
import {formataSaldo } from "@/constants/modules";
interface Props {
  dados: DadosContaType | undefined;
}

const Conta = ({ dados }: Props) => {

  const ContaSteps = [
    { element: '.cont', popover: { title: 'Detalhes da Conta', description: 'Nesta tela, você pode  informações relacionadas à sua conta, incluindo saldo, IBAN e outros detalhes importantes. agora Iremos guia-lo' } },
    { element: '.foto', popover: { title: 'Foto de Perfil', description: 'Aqui você pode visualizar a foto associada ao titular da conta.' } },
    { element: '.cartaoC', popover: { title: 'Informações do Cartão', description: 'Veja os detalhes do seu cartão, como número, tipo e data de validade. Você também pode bloquear o cartão, se necessário.' } },
    { element: '.minha-conta', popover: { title: 'Minha Conta', description: 'Aqui estão os detalhes da sua conta, como número, IBAN, saldo disponível e estado da conta.' } },
  ]
  const [showGuide, setShowGuide] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const [otp, setOtp] = useState("");
  // Inicializa o driver mas adia o drive() até ter certeza que o elemento existe
  useEffect( () => {
    // Aguarda até que o elemento ".pessoa" esteja presente na DOM
    if (localStorage.getItem('primeiroLogin') == 'true') {
      if(!localStorage.getItem('GuiaContaE')) {
      // Executa o driver
      setTimeout(() => setShowGuide(true), 100);
      }	
      // Seta a flag para que não execute novamente
    }
  }, []);

   async function bloquearcartao(otp: string) {
      setIsLoading(true);
      try {
        if (otp.length < 6) return;
        const dataset = {
          numerocartao: dados?.cartao.numero,
        };
        const response = await api.post("/conta/cartao/bloquear", dataset);
        onClose2();
       
        toast.success(response.data.message);
        //router.push("/registo/tipo-conta");
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
    async function confirmarbloquio() {
      try {
        onOpen();
        
      } catch {
        toast.error("Erro tente mais tarde");
      } 
    }

  return (
    // Previously MainLayout component
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Previously Header component */}
        <div className="mb-6">
          <Cabecalho Titulo='Detalhes de Conta' subTitulo='Veja as informações relacionadas a sua conta' />
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {/* Previously ProfileCard component */}
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6 flex flex-col items-center foto">

              <Avatar className="w-24 h-24 rounded-full overflow-hidden bg-sky-200 mb-4 transition-transform hover:scale-105 duration-300">
                <AvatarImage src={dados?.cliente.imagem} className="w-full h-full object-first" />
                <AvatarFallback>
                  {dados?.cliente?.nome.charAt(0) || "N/A"}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-medium text-gray-800 mb-1 text-center">
                {dados?.cliente.nome}
              </h2>
              <p className="text-gray-500 mb-4">Conta Particular</p>

            </div>

            {/* Previously CardManagement component */}
            <div className="bg-white rounded-lg p-6 shadow-sm cartaoC">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Previously CardForm component */}
                <div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tipo de cartão
                    </label>
                    <div className="p-2 border border-gray-300 rounded-md bg-gray-50">
                      Cartão Multicaixa de Débito
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número do cartão
                    </label>
                    <div className="p-2 border border-gray-300 rounded-md bg-gray-50">
                      {dados?.cartao.numero}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de validade
                    </label>
                    <div className="p-2 border border-gray-300 rounded-md bg-gray-50">
                      {formatExpiryDate(dados?.cartao.dataValidade)}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-red-600 transition-colors"
                      onClick={confirmarbloquio}
                      {...dados?.cartao.estado=="bloqueado"? {disabled:true} : {}}
                    >
                      <span className="mr-2">{dados?.cartao.estado=="bloqueado"? "Cartão Bloqueado":"Bloquear"}</span>
                      <span className="border border-white rounded-md p-1">
                        <LockIcon size={14} />
                      </span>
                    </button>
                  </div>
                </div>

                {/* Previously CardDisplay component */}
                <Cartao dados={dados} />
              </div>
            </div>
          </div>

          {/* Previously AccountDetails component */}
          <div className="lg:w-80 minha-conta">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Minha conta</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Número da conta</p>
                  <p className="font-medium">{dados?.numeroConta}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">IBAN</p>
                  <p className="font-medium">{dados?.iban}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">NBA</p>
                  <p className="font-medium">{dados?.nba.replace("AO06", "")}</p>
                </div>


                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Divisa</p>
                  <p className="font-medium">Kwanza (KZ)</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Titular</p>
                  <p className="font-medium">{formataNome(dados?.cliente.nome)}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Data de abertura</p>
                  <p className="font-medium">{dados?.dataAbertura}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Tipo de conta</p>
                  <p className="font-medium">Conta à ordem</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Saldo disponível</p>
                  <p className="font-medium">{formataSaldo(dados?.saldo)}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Saldo autorizado</p>
                  <p className="font-medium">{formataSaldo(dados?.saldo)}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Estado</p>
                  <p className="font-medium text-green-600">{dados?.estado}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showGuide && <GuideDriver steps={ContaSteps} onFinish={()=>{
      console.log("Tour finalizado! Inciando o tour novamente");
      localStorage.setItem('GuiaContaE', 'true');
      setShowGuide(false);
      }} />}

          <ConfirmacaoModal
              isOpen={isOpen}
              onClose={onClose}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onOpen2={onOpen2}
              title="Deseja bloquear o cartão?"
              dados={[
                { key: "Bloquear Cartão?", value: `` },
                
              ]}
            />
      
            <ValidacaoModal
              isOpen={isOpen2}
              onClose={onClose2}
              otp={otp}
              setOtp={setOtp}
              isLoading={isLoading}
              handleFunction={bloquearcartao}
            />
    </div>
  );
};

{/* 
      <div className="flex min-h-screen "> */}

export default Conta;