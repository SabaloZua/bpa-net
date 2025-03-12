"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, LogOut } from "lucide-react";
import { JSX } from "react";
import Logo from "@/components/Logo";
import { sidebarLinks } from "@/constants/index";
export default function Sidebar() {
  const pathname = usePathname();

  // Verifica se o link está ativo com base no pathname atual
  const isActive = (path: string) => pathname === path;
  interface LinkItem {
    path: string;
    name: string;
    icon: JSX.Element;
  }

  const links: LinkItem[] = sidebarLinks;
  return (
    <>
      {/* Sidebar */}
      <div className="lg:col-span-1 max-xl:hidden flex flex-col bg-blue-500 text-white">
        <div className="p-4 border-teal-700">
          <Logo size={40} />
        </div>

        <div className="p-2 text-sm font-medium  ">
          <span>Menu</span>
        </div>

        <nav className="overflow-y-auto p-1">
          {links.map((link: LinkItem, index: number) => (
            <Link href={link.path} key={index}>
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
            </Link>
          ))}
        </nav>

        <div className="p-4  shadow-lg mt-auto">
          <div className="flex items-center text-sm cursor-pointer">
            <Link href={"/login"}>
              <LogOut size={18} className="mr-2" />
            </Link>
            <div>
              <div>Terminar Sessão</div>
              <div className="text-xs ">Expira em 20:42</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
