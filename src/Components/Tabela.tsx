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
    data: '23 Apr 2024 - 23:55',
    avatar: "/icons/trans9.png",
    valor: '3000 kz'
  },
  {
    id: 2,
    Descricao: "Levantamento sem cartão",
    data: '23 Apr 2024 - 23:55',
    avatar: "/icons/levan3.png",
   valor: '3000 kz'
  },
  {
    id: 3,
    Descricao: "pagamentos de serviços",
    data: '23 Apr 2024 - 23:55',
    valor: '3000 kz',
    avatar: "icons/pagame3.png",
  },
  {
    id: 4,
    Descricao: "transferência interbancaria",
    data: '23 Apr 2024 - 23:55',
    avatar: "/icons/trans9.png",
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
          radius="sm" src={user.avatar} />
        );
      case "Descricao":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize text-default-700">{cellValue}</p>
            {/* <p className="text-bold text-tiny capitalize text-default-500">{user.team}</p> */}
          </div>
        );
      case "data":
        return (
          <p className="text-bold text-small capitalize text-default-700">{cellValue}</p>
        );
      case "valor":
        return (
          <p className="text-bold text-small capitalize text-default-700">{cellValue}</p>
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
    <Table removeWrapper hideHeader classNames={classNames}   topContentPlacement="outside" >
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
