import { DadosContaType } from "@/types/commons";
import Cabecalho from '@/components/Cabecalho'
import Cartao, { formatExpiryDate } from "@/components/Cartão";
import { LockIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formataNome} from "@/constants/modules";
interface Props {
  dados: DadosContaType | undefined;
}

const Conta = ({ dados }: Props) => {



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
            <div className="bg-white rounded-lg p-4 shadow-sm mb-6 flex flex-col items-center">

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
            <div className="bg-white rounded-lg p-6 shadow-sm">
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
                    <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-red-600 transition-colors">
                      <span className="mr-2">Bloquear</span>
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
          <div className="lg:w-80">
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
                  <p className="font-medium">{dados?.saldo}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">Saldo autorizado</p>
                  <p className="font-medium">{dados?.saldo}</p>
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
    </div>
  );
};

{/* 
      <div className="flex min-h-screen "> */}

export default Conta;