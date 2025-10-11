'use client'

import React from "react";
import api from "@/utils/axios";
import { useEffect, useState } from "react";
import useContaStore from "@/contexts/contaStore";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  AvatarIcon,
} from "@nextui-org/react";
import { ArrowUp,ArrowDown } from 'lucide-react';



export const columns = [
  {name: "Mov", uid: "mov"},
  {name: "Descrição", uid: "Descricao"},
  {name: "Data", uid: "data"},
  {name: "Valor", uid: "valor"},
];






export default  function App() {
    const useConta = useContaStore();
  type Dados = {
    id: number;
    Descricao: string;
    data: string;
    debito: string;
    credtio: string;
  };
  const [transacoes, settransacoes] = useState<Dados[]>([]);
 
 
    useEffect(() => {
          function fetchPergunta() {
            const idConta:string= useConta.id.toString();
            if (!idConta || idConta === "0") return; // só busca se o id for válido
              api.get(`/trasacao/trasacoesrecentes/${idConta}`)
              .then(response => {
                const dados =  response.data.trasacoes;
                console.log(dados);
                settransacoes(dados);
              })
              .catch(error => {
                console.error("Erro ao buscar transações:", error);
              });
          }
          if (transacoes) {
              fetchPergunta();
             
          }
      },[useConta.id])

  
  const renderCell = React.useCallback((dados: Dados, columnKey: React.Key) => {
    const cellValue = dados[columnKey as keyof Dados];

    switch (columnKey) {
      case "mov":
        return (  
          <Avatar size="sm"
          classNames={{
            base: "bg-[#AE8C46] w-8 h-8 sm:w-8 sm:h-8",
            icon: "text-black/80 flex items-center",
            img: 'w-4 h-4 sm:w-4 sm:h-4'
          }}
          icon={<AvatarIcon />}
          radius="sm" src={dados.Descricao.includes("Levantamento") ? '/icons/levan3.png' : dados.Descricao.includes('Pagamento') ? 'icons/pagame3.png' : '/icons/trans9.png'} />
        );
      case "Descricao":
        return (
          <div className="flex flex-col min-w-0">
            <p title={dados.Descricao} className="text-bold text-10 sm:text-12 capitalize text-default-700 leading-tight whitespace-nowrap overflow-hidden text-ellipsis">
              {dados.Descricao.split(" ").slice(0, 5).join(" ")}
            </p>
          </div>
        );
      case "data":
        // Função para formatar a data para dd-mm-yy
        const formatDate = (dateString: string) => {
          const date = new Date(dateString);
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear().toString().slice(-2);
          return `${day}-${month}-${year}`;
        };
        
        return (
          <div className="flex flex-col min-w-0">
            <p className="text-bold text-10 sm:text-12 capitalize text-default-700 whitespace-nowrap">
              {formatDate(cellValue as string)}
            </p>
          </div>
        );
      case "valor":
        // Extrai apenas números do débito ou do crédito
  const valueNumber =
  dados.debito && dados.debito.trim() !== ""
    ? Number(dados.debito.replace(/\D/g, ""))
    : Number(dados.credtio.replace(/\D/g, ""));
    
const formattedValue = new Intl.NumberFormat("pt-AO", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(valueNumber)

return (
  <div className="flex flex-col min-w-0">
    <p className="text-bold text-10 sm:text-12 capitalize text-default-700">
      {dados.debito == null || dados.debito === "" ? (
        <span className="flex items-center gap-1"><ArrowUp className="w-4 h-4 sm:w-3 sm:h-3 text-green-500"/><span className="whitespace-nowrap">{formattedValue}</span></span>
      ) : (
        <span className="flex items-center gap-1"><ArrowDown className="w-4 h-4 sm:w-3 sm:h-3 text-red-600"/><span className="whitespace-nowrap">{formattedValue}</span></span>
      )}
    </p>
  </div>
);
      default:
        return cellValue;
    }
  }, []);

    const classNames = React.useMemo(
      () => ({
        wrapper: ["max-h-[382px]", "max-w-3xl", "overflow-x-auto"],
        th: ["bg-transparent", "text-default-500", "border-divider", "min-w-0"],
        td: ["min-w-0", "px-2 sm:px-2", "py-2"],
      }),
      []
    )

  return (
    <Table removeWrapper hideHeader classNames={classNames} topContentPlacement="outside" >
      <TableHeader contentEditable columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={transacoes}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
