import { DadosContaType } from "@/types/commons";
import Cabecalho from '@/components/Cabecalho'
import Cartao from "@/components/Cartão";
import { IoCloseSharp } from "react-icons/io5";


interface Props {
  dados: DadosContaType | undefined;
}

const Conta = ({dados}:Props) => {
  return (
    <div>
      <Cabecalho Titulo='Detalhes de Conta' subTitulo='Veja as informações relacionadas a sua conta' />
      <div className="flex min-h-screen ">
        <div className="bg-white  border-r p-8 min-w-[60%] flex flex-col ">
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

        <div className="flex flex-col items-center w-[40%] gap-4">
          <Cartao dados={dados}/>
          <h1 className="text-xl">Detalhes do cartão</h1>
          <p className="text-gray-600">
            Data de Criação:  8 de Abril de 2025
          </p>
          <p className="text-gray-600">
            Data de Validade: 8 de Abril de 2027 
          </p>

          <p className="text-gray-600">
            Estado: <span className="bg-green-600 text-gray-100 px-2 rounded-md ">Activo</span>
          </p>
          <p className="p-2 rounded-md border bg-gray-200 text-gray-500 flex gap-2 items-center hover:bg-gray-300 cursor-pointer ">
            <IoCloseSharp size={20} className="text-red-400"/>
            Cancelar Cartão
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conta;