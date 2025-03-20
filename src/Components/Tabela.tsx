'use client'

import React from "react";
import api from "@/utils/axios";
import { useEffect, useState } from "react";

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
              api.get(`/trasacao/trasacoesrecentes/${Number(localStorage.getItem("idConta"))}`)
              .then(response => {
                const dados = response.data.trasacoes;
                settransacoes(dados);
              })
              .catch(error => {
                console.error("Erro ao buscar transações:", error);
              });
          }
          if (transacoes) {
              fetchPergunta();
             
          }
      },[])

  
  const renderCell = React.useCallback((dados: Dados, columnKey: React.Key) => {
    const cellValue = dados[columnKey as keyof Dados];

    switch (columnKey) {
      case "mov":
        return (  
          <Avatar size="sm"
          classNames={{
            base: "bg-[#AE8C46]",
            icon: "text-black/80  flex items-center",
            img:' w-[20px] h-[20px]'
          }}
          icon={<AvatarIcon />}
          radius="sm" src={dados.Descricao === 'Levantamento sem cartão' ? '/icons/levan3.png' : dados.Descricao === 'Pagamentos de Serviços' ? 'icons/pagame3.png' : '/icons/trans9.png'} />
        );
      case "Descricao":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-12 capitalize text-default-700">{cellValue}</p>
          </div>
        );
      case "data":
        return (
          <p className="text-bold text-12 capitalize text-default-700">{cellValue}</p>
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
.replace(/\s/g, '.');
return (
  <p className="text-bold text-12 capitalize text-default-700">
    {dados.debito == null || dados.debito === "" ? (
      <span className=" flex items-center"><ArrowUp className="w-3 h-3 text-green-500"/>{formattedValue}</span>
    ) : (
      <span className=" flex items-center"><ArrowDown className="w-3 h-3 text-red-600"/>{formattedValue}</span>
    )}
  </p>
);
      default:
        return cellValue;
    }
  }, []);

    const classNames = React.useMemo(
      () => ({
        wrapper: ["max-h-[382px]", "max-w-3xl"],
        th: ["bg-transparent", "text-default-500",  "border-divider"],
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
