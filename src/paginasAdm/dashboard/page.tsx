
'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Logo from "@/components/Logo";
import { 
  Bell, 
  Search, 
  Menu, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
//import { ThemeToggle } from "@/components/theme-toggle";
import { Separator } from "@/components/ui/separator";
import Inicio from "@/paginasAdm/inicio/page"
import Clientes from "@/paginasAdm/clientes/page"
import Trasacoes from "@/paginasAdm/trasacoes/page"
import { useState } from "react";
import {DadoAdmin} from '@/types/commons'
interface DashboardProps {
 
  dados: DadoAdmin | undefined;
}
export default function AdminLayout({dados}:DashboardProps){
      const [page, setPage] = useState<string>("inicio");
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="flex h-16 items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-1">
            <Logo size={0} />
            <h1 className=" font-semibold hidden md:block text-sm mt-3 text-[#1A82FF]">Internet Banking Admin</h1>
            </div>
            
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Buscar..."
                className="rounded-md border bg-background px-9 py-2 text-sm"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            {/* <ThemeToggle /> */}
            <Separator orientation="vertical" className="h-8" />
            <Select defaultValue="admin">
              <SelectTrigger className="w-[180px] border-none">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/admin.png" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <SelectValue placeholder="Selecionar perfil" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        <aside className="w-64 border-r hidden md:block p-4 bg-background">
          <nav className="space-y-2">
            <Button onClick={() => setPage("inicio")} variant="ghost" className="w-full justify-start">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Button>
            <Button onClick={() => setPage("clientes")} variant="ghost" className="w-full justify-start">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Clientes
            </Button>
            <Button onClick={() => setPage("transações")} variant="ghost" className="w-full justify-start">
              <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Transações
            </Button>
           
          </nav>
        </aside>
        
        <main className="flex-1 p-6 overflow-auto">
                {page === "inicio" ? (
                        <Inicio dados={dados}/>
                      ) : page === "clientes" ? (
                        <Clientes  />
                      ) : page === "transações" ? (
                        <Trasacoes />
                      )
                          : null}
        </main>
      </div>
    </div>
  );
}
