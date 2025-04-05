import { DadosContaType } from "@/types/commons";


interface Props {
  dados: DadosContaType | undefined;
}

const Conta = ({dados}:Props) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Detalhes da Conta Bancária
        </h1>

        <div className="mb-4">
          <strong className="text-gray-700">Nome do Titular:</strong>
          <p className="text-teal-600 font-semibold">{dados?.cliente.nome}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">IBAN:</strong>
          <p className="text-teal-600 font-semibold">{dados?.iban}</p>
        </div>

        <div className="mb-4">
          <strong className="text-gray-700">Número da Conta:</strong>
          <p className="text-teal-600 font-semibold">{dados?.numeroConta}</p>
        </div>

        

        
      </div>
    </div>
  );
};

export default Conta;
