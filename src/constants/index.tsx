import {
  CreditCard,
  Users,
  ArrowRightLeft,
  MapPinned,
  Inbox,
  HandCoins,
  Banknote,
  PiggyBank,
} from "lucide-react";
import africell from "@/assets/images/africell.png";
import unitel from "@/assets/images/unitel.png";
import zap from "@/assets/images/zap.png";
import tvCabo from "@/assets/images/tvcabo.png";
import dstv from "@/assets/images/dstv.png";
import ende from "@/assets/images/ende.png";
import epal from "@/assets/images/epal.png";
import { EntidadeType, ProdutoType, SubProdutoType } from "@/types/commons";

// Aqui estão os dados dos links do sidebar como a a rota imagem e Legenda\
export const sidebarLinks = [
  { name: "O Meu BPA", icon: <CreditCard size={18} />, path: "inicio", active: false },
  { name: "Contas", icon: <Users size={18} />, path: "conta", active: false },
  {
    name: "Transferências",
    icon: <ArrowRightLeft size={18} />,
    path: "transferencias",
    active: false,
  },
  { name: "Pagamentos", icon: <HandCoins size={18} />, path: "pagamentos", active: false },
  { name: "Levantamentos", icon: <Inbox size={18} />, path: "levantamentos", active: false },
  { name: "ATMs", icon: <MapPinned size={18} />, path: "mapa", active: false },
  { name: "Deposito", icon: <PiggyBank size={18} />, path: "deposito", active: false },
  { name: "Transações", icon: <Banknote size={18} />, path: "transacoes", active: false },
];

export const tvServices = [
  { name: "Africell", icon: africell },
  { name: "dstv", icon: dstv },
  { name: "zap", icon: zap },
  { name: "tv cabo", icon: tvCabo },
  { name: "unitel", icon: unitel },
];

export const publicServices = [
  { name: "ende", icon: ende },
  { name: "epal", icon: epal },
];

export const theme = {
  primary: "#1A82FF",
};

//Array de provincias com os municipios

type Provincia = {
  nome: string;
  municipios: string[];
};

export const montantes = [
  { name: "200 Kz", value: 200 },
  { name: "500 Kz", value: 500 },
  { name: "1 000 Kz", value: 1000 },
  { name: "2 000 Kz", value: 2000 },
  { name: "3 000 Kz", value: 3000 },
  { name: "5 000 Kz", value: 5000 },
  { name: "10 000 Kz", value: 10000 },
  { name: "20 000 Kz", value: 20000 },
];

export const entidades: EntidadeType[] = [
  {
    id: 1,
    nome: "Unitel",
    referencia: "903",
    logo: "unitel.png",
    campos: ["Nº de telefone"],
  },
  {
    id: 2,
    nome: "Africell",
    referencia: "500",
    logo: "africell.png",
    campos: ["Nº de telefone"],
  },
  {
    id: 3,
    nome: "DSTV",
    referencia: "201",
    logo: "dstv.png",
    campos: ["Nº do cartão DSTV"],
  },
  {
    id: 4,
    nome: "ZAP",
    referencia: "804",
    logo: "zap.png",
    campos: ["Cliente ZAPi"],
  },
  {
    id: 5,
    nome: "ENDE",
    referencia: "950",
    logo: "ende.png",
    campos: ["Nº da referência"],
  },
  {
    id: 6,
    nome: "EPAL",
    referencia: "602",
    logo: "epal.png",
    campos: ["Nº da referência"],
  },
];

export const produtos: ProdutoType[] = [
  { id: 1, idEntidade: 1, descricao: "SALDO VOZ", preco: "" },
  { id: 2, idEntidade: 1, descricao: "NET ATE 15GB", preco: "" },
  { id: 3, idEntidade: 1, descricao: "NET CASA 4G", preco: "" },
  { id: 4, idEntidade: 4, descricao: "ZAP MINI", preco: "" },
  { id: 5, idEntidade: 4, descricao: "ZAP MAIS", preco: "" },
  { id: 6, idEntidade: 4, descricao: "ZAP MAX", preco: "" },
  { id: 7, idEntidade: 4, descricao: "ZAP PREMIUM", preco: "" },
  { id: 8, idEntidade: 3, descricao: "CARREGAMENTO MENSAL", preco: "" },
  { id: 9, idEntidade: 3, descricao: "CARREGAMENTO TRIMESTRAL", preco: "" },
];

export const subProdutos: SubProdutoType[] = [
  // Unitel SALDO VOZ
  { id: 1, descricao: "200 Kz", preco: "200", idProduto: 1 },
  { id: 2, descricao: "500 Kz", preco: "500", idProduto: 1 },
  { id: 3, descricao: "1000 Kz", preco: "1000", idProduto: 1 },
  { id: 4, descricao: "1500 Kz", preco: "1500", idProduto: 1 },
  { id: 5, descricao: "2000 Kz", preco: "2000", idProduto: 1 },
  { id: 6, descricao: "3000 Kz", preco: "3000", idProduto: 1 },
  { id: 7, descricao: "5000 Kz", preco: "5000", idProduto: 1 },
  { id: 8, descricao: "10000 Kz", preco: "10000", idProduto: 1 },

  // Unitel NET ATE 15GB
  { id: 9, descricao: "1GB 1 dia", preco: "600", idProduto: 2 },
  { id: 10, descricao: "1,25GB 3 dias", preco: "750", idProduto: 2 },
  { id: 11, descricao: "1,5GB 7 dias", preco: "1000", idProduto: 2 },
  { id: 12, descricao: "1,5GB 31 dias", preco: "1500", idProduto: 2 },
  { id: 13, descricao: "2GB 31 dias", preco: "2000", idProduto: 2 },
  { id: 14, descricao: "3,5GB 31 dias", preco: "3000", idProduto: 2 },
  { id: 15, descricao: "6GB 31 dias", preco: "5000", idProduto: 2 },

  // Unitel NET CASA 4G
  { id: 16, descricao: "10GB 7 dias", preco: "6000", idProduto: 3 },
  { id: 17, descricao: "25GB 30 dias", preco: "13000", idProduto: 3 },
  { id: 18, descricao: "40GB 30 dias", preco: "20000", idProduto: 3 },
  { id: 19, descricao: "100GB 30 dias", preco: "40000", idProduto: 3 },
  { id: 20, descricao: "Ilimitado 30 dias", preco: "80000", idProduto: 3 },

  // Zap MINI
  { id: 21, descricao: "TÁ FÁCIL 7 dias", preco: "1400", idProduto: 4 },
  { id: 22, descricao: "TÁ FÁCIL 14 dias", preco: "2630", idProduto: 4 },
  { id: 23, descricao: "30 dias", preco: "5050", idProduto: 4 },
  { id: 24, descricao: "60 dias", preco: "10100", idProduto: 4 },
  { id: 25, descricao: "90 dias", preco: "15150", idProduto: 4 },

  // Zap MAIS
  { id: 26, descricao: "TÁ FÁCIL 7 dias", preco: "2120", idProduto: 5 },
  { id: 27, descricao: "TÁ FÁCIL 14 dias", preco: "3970", idProduto: 5 },
  { id: 28, descricao: "30 dias", preco: "7600", idProduto: 5 },
  { id: 29, descricao: "60 dias", preco: "15200", idProduto: 5 },
  { id: 30, descricao: "90 dias", preco: "22800", idProduto: 5 },

  // Zap MAX
  { id: 31, descricao: "TÁ FÁCIL 7 dias", preco: "2820", idProduto: 6 },
  { id: 32, descricao: "TÁ FÁCIL 14 dias", preco: "5280", idProduto: 6 },
  { id: 33, descricao: "30 dias", preco: "10100", idProduto: 6 },
  { id: 34, descricao: "60 dias", preco: "20200", idProduto: 6 },
  { id: 35, descricao: "90 dias", preco: "30300", idProduto: 6 },

  // DSTV Carregamento Mensal
  { id: 36, descricao: "FÁCIL", preco: "3700", idProduto: 8 },
  { id: 37, descricao: "FAMÍLIA", preco: "5000", idProduto: 8 },
  { id: 38, descricao: "FAMÍLIA MAIS", preco: "7400", idProduto: 8 },
  { id: 39, descricao: "GRANDE", preco: "9500", idProduto: 8 },
  { id: 40, descricao: "GRANDE +", preco: "15000", idProduto: 8 },
  { id: 41, descricao: "BUÉ", preco: "19800", idProduto: 8 },
  { id: 42, descricao: "PREMIUM", preco: "22800", idProduto: 8 },

  // DSTV Carregamento Trimestral
  { id: 43, descricao: "FÁCIL", preco: "11100", idProduto: 9 },
  { id: 44, descricao: "FAMÍLIA", preco: "15000", idProduto: 9 },
  { id: 45, descricao: "FAMÍLIA MAIS", preco: "22200", idProduto: 9 },
  { id: 46, descricao: "GRANDE", preco: "28500", idProduto: 9 },
  { id: 47, descricao: "GRANDE +", preco: "45000", idProduto: 9 },
  { id: 48, descricao: "BUÉ", preco: "59400", idProduto: 9 },
  { id: 49, descricao: "PREMIUM", preco: "68400", idProduto: 9 },
];

export const provincias: Provincia[] = [
  {
    nome: "Bengo",
    municipios: ["Ambriz", "Bula Atumba", "Dande", "Dembos", "Nambuangongo", "Pango Aluquém"],
  },
  {
    nome: "Benguela",
    municipios: [
      "Baía Farta",
      "Balombo",
      "Benguela",
      "Bocoio",
      "Caimbambo",
      "Catumbela",
      "Chongoroi",
      "Cubal",
      "Ganda",
      "Lobito",
    ],
  },
  {
    nome: "Bié",
    municipios: [
      "Andulo",
      "Camacupa",
      "Catabola",
      "Chinguar",
      "Chitembo",
      "Cuemba",
      "Cunhinga",
      "Cuíto",
      "Nharea",
    ],
  },
  {
    nome: "Cabinda",
    municipios: ["Cabinda", "Cacongo", "Buco-Zau", "Belize"],
  },
  {
    nome: "Cuando Cubango",
    municipios: [
      "Calai",
      "Cuangar",
      "Cuchi",
      "Cuito Cuanavale",
      "Dirico",
      "Mavinga",
      "Menongue",
      "Nancova",
      "Rivungo",
    ],
  },
  {
    nome: "Cuanza Norte",
    municipios: [
      "Ambaca",
      "Banga",
      "Bolongongo",
      "Cambambe",
      "Cazengo",
      "Golungo Alto",
      "Gonguembo",
      "Lucala",
      "Quiculungo",
      "Samba Cajú",
    ],
  },
  {
    nome: "Cuanza Sul",
    municipios: [
      "Gabela",
      "Cassongue",
      "Cela",
      "Conda",
      "Ebo",
      "Libolo",
      "Mussende",
      "Porto Amboim",
      "Quilenda",
      "Quibala",
      "Seles",
      "Sumbe",
    ],
  },
  {
    nome: "Cunene",
    municipios: ["Cahama", "Cuanhama", "Curoca", "Cuvelai", "Namacunde", "Ombadja"],
  },
  {
    nome: "Huambo",
    municipios: [
      "Longonjo",
      "Bailundo",
      "Chicala Choloanga",
      "Mungo",
      "Londuimbale",
      "Tchindjenje",
      "Ucuma",
      "Cachiungo",
      "Caála",
      "Ecunha",
      "Huambo",
    ],
  },
  {
    nome: "Huíla",
    municipios: [
      "Caconda",
      "Cacula",
      "Caluquembe",
      "Gambos",
      "Chibia",
      "Chicomba",
      "Chipindo",
      "Cuvango",
      "Humpata",
      "Jamba",
      "Lubango",
      "Matala",
      "Quilengues",
      "Quipungo",
    ],
  },
  {
    nome: "Luanda",
    municipios: [
      "Icolo e Bengo",
      "Luanda",
      "Quiçama",
      "Cacuaco",
      "Cazenga",
      "Viana",
      "Belas",
      "Kilamba Kiaxi",
      "Talatona",
    ],
  },
  {
    nome: "Lunda Norte",
    municipios: [
      "Cambulo",
      "Capenda Camulemba",
      "Caungula",
      "Chitato",
      "Cuango",
      "Cuílo",
      "Lubalo",
      "Lucapa",
      "Lóvua",
      "Xá-Muteba",
    ],
  },
  {
    nome: "Lunda Sul",
    municipios: ["Cacolo", "Dala", "Muconda", "Saurimo"],
  },
  {
    nome: "Malanje",
    municipios: [
      "Cacuso",
      "Caombo",
      "Calandula",
      "Cambundi-Catembo",
      "Cangandala",
      "Cuaba Nzogo",
      "Cunda-Dia-Baze",
      "Luquembo",
      "Malanje",
      "Marimba",
      "Massango",
      "Mucari",
      "Quela",
      "Quirima",
    ],
  },
  {
    nome: "Moxico",
    municipios: [
      "Alto Zambeze",
      "Bundas",
      "Camanongue",
      "Léua",
      "Luacano",
      "Moxico",
      "Luchazes",
      "Cameia",
    ],
  },
  {
    nome: "Namibe",
    municipios: ["Moçâmedes", "Camucuio", "Bibala", "Virei", "Tômbua"],
  },
  {
    nome: "Uíge",
    municipios: [
      "Uíge",
      "Alto Cauale",
      "Ambuíla",
      "Bembe",
      "Buengas",
      "Bungo",
      "Milunga",
      "Damba",
      "Maquela do Zombo",
      "Mucaba",
      "Negage",
      "Puri",
      "Quimbele",
      "Quitexe",
      "Sanza Pombo",
      "Songo",
    ],
  },
  {
    nome: "Zaire",
    municipios: ["Mbanza Congo", "Soyo", "Nzeto", "Cuimba", "Nóqui", "Tomboco"],
  },
];
