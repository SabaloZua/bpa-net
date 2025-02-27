import {
  CreditCard,
  Users,
  ArrowRightLeft,
  DollarSign,
  Shield,
  PiggyBank,
} from 'lucide-react';
// Aqui estão os dados dos links do sidebar como a a rota imagem e Legenda\
export  const sidebarLinks = [

  { name: 'O Meu BPA', icon: <CreditCard size={18} />, path: '/inicio' },
  { name: 'Contas', icon: <Users size={18} />, path: '/contas' },
  { name: 'Transferências', icon: <ArrowRightLeft size={18} />, path: '/transferencias' },
  { name: 'Pagamentos', icon: <DollarSign size={18} />, path: '/pagamentos' },
  { name: 'Transações', icon: <ArrowRightLeft size={18} />, path: '/transacoes' },
  { name: 'Créditos', icon: <DollarSign size={18} />, path: '/creditos' },
  { name: 'Poupanças', icon: <PiggyBank size={18} />, path: '/poupancas' },
  { name: 'Seguros', icon: <Shield size={18} />, path: '/seguros' },
  
];

export const theme = {
  primary: '#1A82FF'
}


