import { CreditCard, Users, ArrowRightLeft, DollarSign, Shield, MapPinned } from "lucide-react";
// Aqui estão os dados dos links do sidebar como a a rota imagem e Legenda\
export const sidebarLinks = [
  { name: "O Meu BPA", icon: <CreditCard size={18} />, path: "/inicio", active: false },
  { name: "Contas", icon: <Users size={18} />, path: "/contas", active: false },
  {name: "Transferências", icon: <ArrowRightLeft size={18} />, path: "/transferencias", active:false,
  },
  { name: "Pagamentos", icon: <DollarSign size={18} />, path: "/pagamentos", active: false },
  { name: "Transações", icon: <ArrowRightLeft size={18} />, path: "/transacoes", active: false },
  { name: "Creditos", icon: <DollarSign size={18} />, path: "/creditos", active: false },
  { name: "Mapa", icon: <MapPinned size={18} />, path: "/mapa", active: false },
  { name: "Seguros", icon: <Shield size={18} />, path: "/seguros", active: false },
];

export const theme = {
  primary: "#1A82FF",
};
