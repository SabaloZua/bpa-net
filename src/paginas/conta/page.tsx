import { DadosContaType } from "@/types/commons";
import Cabecalho from '@/components/Cabecalho'


interface Props {
  dados: DadosContaType | undefined;
}

const Conta = ({dados}:Props) => {
  return (
    <div>
      <Cabecalho Titulo='Detalhes de Conta' subTitulo='Veja as informações relacionadas a sua conta' />
      <div className="flex p-4 min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-full w-full flex flex-col items-center">

          <div className="mb-4">
            <strong className="text-gray-700">Nome do Titular:</strong>
            <p className="text-teal-600 font-semibold">{dados?.cliente.nome}</p>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700 text-center">IBAN:</strong>
            <p className="text-teal-600 font-semibold">{dados?.iban}</p>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Número da Conta:</strong>
            <p className="text-teal-600 font-semibold">{dados?.numeroConta}</p>
          </div>
      
      
        </div>
      </div>
    </div>
  );
};

export default Conta;
