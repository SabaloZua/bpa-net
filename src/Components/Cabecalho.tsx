"use client";

// import { usePathname } from "next/navigation";
// import { sidebarLinks } from "@/constants/index";
// import { JSX } from "react";

interface dados {
  Titulo:string,
  subTitulo:string
}
export default function DynamicHeader(props:dados) {
  // const pathname = usePathname();
  // interface LinkItem {
  //   path: string;
  //   name: string;
  //   icon: JSX.Element;
  // }

  // const links: LinkItem[] = sidebarLinks;
 
  // let headerText: React.ReactNode;

  // links.forEach((el)=>{
  //   if (pathname && pathname.includes(el.path)) {
  //       headerText = <h1 className="text-3xl text-gray-700">{el.name}</h1>;
  //       <p className="font-medium text-gray-500 mt-2">Page onde quiser</p>
  //     }
  // })
  // if (pathname && pathname.includes('inicio')) {
  //   headerText =  <>
  //   Olá <span className="font-medium text-blue-500">Sablo Zua</span> 👋
  // </>

  // }

 
  // Você pode adicionar outras condições conforme necessário

  return (
  <div>
  <h1 className="text-3xl text-gray-700">{props.Titulo}</h1>
  <p className="font-medium text-gray-500 mt-1 mb-4">{props.subTitulo}</p>
  </div>

      
      
  
  )
}