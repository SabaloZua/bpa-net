"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import useContaStore from "@/contexts/contaStore";
import { DadosContaType } from "@/types/commons";
import dynamic from "next/dynamic";
import { Bell, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Transferencias from "../transferencias/page";
import Pagamentos from "../pagamentos/page";
import Home from "../inicio/page";
import Levantamentos from "../levantamentos/page";
import Senha from "../senha/page";
import Deposito from "../deposito/page";
import TransactionsPage from "../transacoes/page";
import Perfil from "../perfil/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Conta from "../conta/page";

interface DashboardProps {
  idConta: number | undefined;
  dadosConta: DadosContaType | undefined;
}

export default function Dashboard({ idConta, dadosConta }: DashboardProps) {
  const MapaComponent = dynamic(() => import("@/components/Mapa/mapa"), { ssr: false });

  // const iniciarDrive= ()=>{
  //   const checkElement = setInterval( () => {
  //     const pessoaElement = document.querySelector("#inicio");
  //     if (pessoaElement) {
  //       clearInterval(checkElement);
  //       const driverObj = driver({
  //         popoverClass: 'driverjs-theme',
  //         doneBtnText: 'Fechar',
  //         nextBtnText: 'Próximo',
  //         prevBtnText: 'Anterior',
  //         showProgress: true,
  //         steps: [
  //           { element: '.pessoa', popover: { title: 'Bem Vindo', description: 'Seja bem vindo ao BPA NET agora Iremos guia-lo' } },
  //           { element: '#inicio', popover: { title: 'Cartão', description: 'Aqui você pode ver os dados do seu cartão' } },
  //           { element: '.lev', popover: { title: 'Levantamentos', description: 'Clicado neste botão você irá para a pagina de levantamentos sem cartão' } },
  //           { element: '.nahora', popover: { title: 'Na hora', description: 'Aqui você pode fazer trasferencias intrabancarias de uma forma rápida apartir do numero de telefone ' } },
  //           { element: '.trans', popover: { title: 'Transações', description: 'Aqui você pode acompanhe suas transações recentes ' } },
  //           { element: '.cambio', popover: { title: 'Cambio', description: 'Aqui você pode fazer a converção de uma moeda para outra ' } },
  //         ]
  //       });
  //        driverObj.drive();
  //     }
  //   }, 100);

  //   return () => clearInterval(checkElement);
  // }

  const [page, setPage] = useState<string>("inicio");
  const useConta = useContaStore();
  console.log(dadosConta);
  useEffect(() => {
    if (dadosConta) {
      useConta.setSaldo(dadosConta.saldo);
      useConta.setIban(dadosConta.iban);
      useConta.setNumeroConta(dadosConta.numeroConta);
      useConta.setIdTipoConta(dadosConta.idTipoConta);
      useConta.setDataAbertura(dadosConta.dataAbertura);
      useConta.setEstado(dadosConta.estado);
      useConta.setCliente(dadosConta.cliente);
      useConta.setCartao(dadosConta.cartao);
    }

    if (idConta) {
      useConta.setId(idConta);
    }
  }, []);

  useEffect(() => {
    const buttons = document.querySelectorAll(".btn[data-active]") as NodeListOf<HTMLButtonElement>;

    function update(button: HTMLButtonElement) {
      for (const btn of buttons) {
        btn.dataset.active = "false";
      }
      button.dataset.active = "true";
    }

    for (const button of buttons) {
      button.addEventListener("click", () => {
        update(button);
        setPage(button.dataset.page || "");
      });
    }
  }, []);

  return (
    <main className="grid md:grid-cols-5  h-screen ">
      <Sidebar />

      <div className="md:col-span-4 flex flex-col overflow-hidden bg-white ">
        {/* Header */}
        <header className="z-10">
          <div className="flex items-center justify-between p-4">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="Pesquisar BPA NET"
              />
            </div>
            <div className="flex items-center">
              <Bell className="h-8 w-8" />

              <div className="ml-3 relative">
                <Select onValueChange={(value: string) => setPage(value)}>
                  <SelectTrigger className="border-none">
                    <div className="flex items-center">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>
                          {dadosConta?.cliente?.nome.charAt(0) || "N/A"}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="perfil">Perfil</SelectItem>
                      <SelectItem value="Senha">Alterar Senha</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 border-t  flex items-center"></div>
        </header>

        <main className="flex-1 overflow-y-auto py-2 px-4 sm:px-6 lg:px-6 bg-white no-scrollbar xl:overflow-y-scroll">
          {page === "inicio" ? (
            <Home dadosConta={dadosConta} setDashboardPage={setPage} />
          ) : page === "transferencias" ? (
            <Transferencias dados={dadosConta} />
          ) : page === "mapa" ? (
            <MapaComponent />
          ) : page === "pagamentos" ? (
            <Pagamentos />
          ) : page === "levantamentos" ? (
            <Levantamentos dados={dadosConta} />
          ) : page === "transacoes" ? (
            <TransactionsPage />
          ) : page === "Senha" ? (
            <Senha />
          ) : page === "conta" ? (
            <Conta dados={dadosConta} />
          ) : page === "deposito" ? (
            <Deposito />
          ) : page === "perfil" ? (
            <Perfil dados={dadosConta}/>
          ) : null}
        </main>
      </div>
    </main>
  );
}
