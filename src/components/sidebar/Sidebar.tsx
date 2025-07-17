"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react"; // Menu para o ícone do hambúrguer
import { signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { sidebarLinks } from "@/constants/index";
import Image from "next/image";


interface SidebarProps {
  isOpen: boolean; // Adicionando a propriedade isOpen
    handleLinkClick: () => void;
}

export default function Sidebar({ isOpen, handleLinkClick }: SidebarProps) {
  const pathname = usePathname();

  // Verifica se o link está ativo com base no pathname atual
  const isActive = (path: string) => pathname === path;
  const router = useRouter();

  async function terminarSessao() {
    await signOut({ redirect: false });
    if (localStorage.getItem('primeiroLogin')) {
      localStorage.clear();
    }
    router.replace('/login');
  }

  const links = sidebarLinks;

  return (
    <>
      {/* Sidebar */}
      <div
        className={`  md:col-span-1 flex flex-col bg-blue-500 text-white fixed md:relative transition-all ease-in-out duration-300  ${isOpen ? "left-0" : "-left-full"} md:left-0 z-50 ${isOpen ? "min-h-screen" : "h-full"}`}
      >
        {/* Logo e Menu Hambúrguer */}
        <div className="p-4 flex justify-between items-center border-teal-700">
          <div className="flex items-center gap-2 ">
            <Image
              src={`/icons/logow.svg`}
              width={37}
              height={50} // Ajusta a altura com base no estado isOpen
              alt="Logo horizontal"
              className="max-md:size-14"
            />
            <h1 className="font-bold text-white text-[26px]">
              BPA <span className="text-sm">NET</span>
            </h1>
          </div>

     
        </div>

 
        {/* Menu de Links + Terminar Sessão com rolagem total */}
<div className={`${isOpen ? "block" : "hidden"} md:block overflow-y-auto max-h-screen no-scrollbar flex flex-col`}>
  <div className="p-2 text-sm font-medium">
    <span>Menu</span>
  </div>

  <nav className="p-1 flex-1">
    {links.map((link: any, index: number) => (
      <a
        key={index}
        className="btn"
        data-active={link.active}
        data-page={link.path}
        type="button"
        onClick={handleLinkClick}
      >
        <div
          className={`mx-4 my-2 p-3 rounded-md flex items-center justify-between cursor-pointer ${
            isActive(link.path) ? "bg-white text-black-2" : "hover:bg-blue-600"
          }`}
        >
          <div className="flex items-center">
            <div className="mr-2">{link.icon}</div>
            <span className={`${isActive(link.path) ? "font-medium" : ""}`}>{link.name}</span>
          </div>
          {link.name !== "O Meu BPA" && <ChevronDown size={16} />}
        </div>
      </a>
    ))}
      <div className="p-4">
    <div className="flex items-center text-sm cursor-pointer ">
      <Link onClick={terminarSessao} href={"#"}>
        <LogOut size={18} className="mr-2" />
      </Link>
      <div>
        <div>Terminar Sessão</div>
        <div className="text-xs">Expira em 20:42</div>
      </div>
    </div>
  </div>
  </nav>

</div>

      </div>
    </>
  );
}
