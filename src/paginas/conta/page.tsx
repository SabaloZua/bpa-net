import { DadosContaType } from "@/types/commons";
import Cabecalho from '@/components/Cabecalho'
import Cartao, { formatExpiryDate } from "@/components/Cartão";
import { IoCloseSharp } from "react-icons/io5";
import { ArrowLeft, Download, Globe, LockIcon, Mail, Settings } from "lucide-react";
import { useState } from "react";


interface Props {
  dados: DadosContaType | undefined;
}

const Conta = ({dados}:Props) => {

const [cardName, setCardName] = useState('');

// Sample account data (previously in AccountPage)
const accountData = {
  accountNumber: '2174060111.001',
  iban: 'AO06004000021196558533811',
  nba: 'AO06004000055023463405713',
  bicSwift: 'BFMAXLOU',
  currency: 'Kwanza (KZ)',
  holder: 'Diangienda Nkana',
  openingDate: '23/12/2027',
  accountType: 'Conta à ordem',
  availableBalance: '499000 Kz',
  authorizedBalance: '16500 Kz',
  status: 'Ativa',
};

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
            <div className="w-24 h-24 rounded-full overflow-hidden bg-sky-200 mb-4 transition-transform hover:scale-105 duration-300">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg"
                alt="Foto de perfil" 
                className="w-full h-full object-cover"
              />
            </div>
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
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                    Apelido do cartão
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Dê um nome ao cartão"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>

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
                  <button className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                    Salvar
                  </button>
                </div>
              </div>

              {/* Previously CardDisplay component */}
              <Cartao dados={dados}/>
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
                <p className="font-medium">{accountData.nba}</p>
              </div>
              
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Divisa</p>
                <p className="font-medium">{accountData.currency}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Titular</p>
                <p className="font-medium">{accountData.holder}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Data de abertura</p>
                <p className="font-medium">{accountData.openingDate}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Tipo de conta</p>
                <p className="font-medium">{accountData.accountType}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Saldo disponível</p>
                <p className="font-medium">{accountData.availableBalance}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Saldo autorizado</p>
                <p className="font-medium">{accountData.authorizedBalance}</p>
              </div>
              
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Estado</p>
                <p className="font-medium text-green-600">{accountData.status}</p>
              </div>
              
              <div className="pt-2">
                <button className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
                  <Mail size={16} className="mr-2" />
                  <span>Enviar para email</span>
                </button>
              </div>
              
              <div>
                <button className="flex items-center text-blue-500 hover:text-blue-600 transition-colors">
                  <Download size={16} className="mr-2" />
                  <span>Salvar como PDF</span>
                </button>
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