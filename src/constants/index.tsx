import { CreditCard, Users, ArrowRightLeft, DollarSign, Shield, MapPinned } from "lucide-react";
import africell from "@/assets/images/africell.png";
import unitel from "@/assets/images/unitel.png";
import zap from "@/assets/images/zap.png";
import tvCabo from "@/assets/images/tvcabo.png"
import dstv from "@/assets/images/dstv.png";
import ende from "@/assets/images/ende.png";
import epal from "@/assets/images/epal.png";
// Aqui estão os dados dos links do sidebar como a a rota imagem e Legenda\
export const sidebarLinks = [
  { name: "O Meu BPA", icon: <CreditCard size={18} />, path: "inicio", active: false },
  { name: "Contas", icon: <Users size={18} />, path: "contas", active: false },
  {name: "Transferências", icon: <ArrowRightLeft size={18} />, path: "transferencias", active:false,
  },
  { name: "Pagamentos", icon: <DollarSign size={18} />, path: "pagamentos", active: false },
  { name: "Transações", icon: <ArrowRightLeft size={18} />, path: "transacoes", active: false },
  { name: "Creditos", icon: <DollarSign size={18} />, path: "creditos", active: false },
  { name: "Mapa", icon: <MapPinned size={18} />, path: "mapa", active: false },
  { name: "Seguros", icon: <Shield size={18} />, path: "seguros", active: false },
];

export const tvServices = [
  {name: "Africell", icon:africell},
  {name: "dstv", icon:dstv},
  {name: "zap", icon:zap},
  {name: "tv cabo", icon:tvCabo},
  {name: "unitel", icon:unitel},
]

export const publicServices = [
  {name:"ende", icon:ende},
  {name:"epal", icon:epal}
]



export const theme = {
  primary: "#1A82FF",
};
