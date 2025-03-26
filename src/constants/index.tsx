import { CreditCard, Users, ArrowRightLeft, MapPinned, Inbox, HandCoins, Banknote } from "lucide-react";
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
  { name: "Pagamentos", icon: <HandCoins size={18} />, path: "pagamentos", active: false },
  { name: "Levantamentos", icon: <Inbox size={18}/>, path: "levantamentos", active: false },
  { name: "ATMs", icon: <MapPinned size={18} />, path: "mapa", active: false },
  { name: "Transações", icon: <Banknote size={18} />, path: "transacoes", active: false },
 
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

//Array de provincias com os municipios

type Provincia = {
  nome: string;
  municipios: string[];
};

export const montantes = [
  {name:"1 000 Kz", value:1000},
  {name:"2 000 Kz", value:2000},
  {name:"5 000 Kz", value:5000},
  {name:"10 000 Kz", value:10000},
  
];

export const provincias: Provincia[] = [
  {
    nome: "Bengo",
    municipios: [
      "Ambriz",
      "Bula Atumba",
      "Dande",
      "Dembos",
      "Nambuangongo",
      "Pango Aluquém"
    ]
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
      "Lobito"
    ]
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
      "Nharea"
    ]
  },
  {
    nome: "Cabinda",
    municipios: [
      "Cabinda",
      "Cacongo",
      "Buco-Zau",
      "Belize"
    ]
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
      "Rivungo"
    ]
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
      "Samba Cajú"
    ]
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
      "Sumbe"
    ]
  },
  {
    nome: "Cunene",
    municipios: [
      "Cahama",
      "Cuanhama",
      "Curoca",
      "Cuvelai",
      "Namacunde",
      "Ombadja"
    ]
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
      "Huambo"
    ]
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
      "Quipungo"
    ]
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
      "Talatona"
    ]
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
      "Xá-Muteba"
    ]
  },
  {
    nome: "Lunda Sul",
    municipios: [
      "Cacolo",
      "Dala",
      "Muconda",
      "Saurimo"
    ]
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
      "Quirima"
    ]
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
      "Cameia"
    ]
  },
  {
    nome: "Namibe",
    municipios: [
      "Moçâmedes",
      "Camucuio",
      "Bibala",
      "Virei",
      "Tômbua"
    ]
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
      "Songo"
    ]
  },
  {
    nome: "Zaire",
    municipios: [
      "Mbanza Congo",
      "Soyo",
      "Nzeto",
      "Cuimba",
      "Nóqui",
      "Tomboco"
    ]
  }
];

