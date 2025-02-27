import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Avatar,
  AvatarIcon,
} from "@nextui-org/react";



export const columns = [
  {name: "Mov", uid: "mov"},
  {name: "Descrição", uid: "Descricao"},
  {name: "Data", uid: "data"},
  {name: "Valor", uid: "valor"},
];

export const users = [
  {
    id: 1,
    Descricao: "Transferência interbancaria",
    data: '23-04-2024',
    valor: '3000 kz'
  },
  {
    id: 2,
    Descricao: "Levantamento sem cartão",
    data: '23-04-2024',
   valor: '3000 kz'
  },
  {
    id: 3,
    Descricao: "pagamentos de serviços",
    data: '23-04-2024',
    valor: '3000 kz',
  },
  {
    id: 4,
    Descricao: "Transferência interbancaria",
    data: '23-04-2024',
   valor: '3000 kz'
  },
  {
    id: 5,
    Descricao: "Transferência interbancaria",
    data: '23-04-2024',
   valor: '3000 kz'
  },
  {
    id: 6,
    Descricao: "Transferência interbancaria",
    data: '23-04-2024',
   valor: '3000 kz'
  },


  
];




type User = (typeof users)[0];

export default function App() {
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

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
          radius="sm" src={user.Descricao === 'Transferência interbancaria' ? '/icons/trans9.png' : user.Descricao === 'Levantamento sem cartão' ? '/icons/levan3.png' : 'icons/pagame3.png'} />
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
        return (
          <p className="text-bold text-12 capitalize text-default-700">{cellValue}</p>
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
      <TableBody items={users}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
