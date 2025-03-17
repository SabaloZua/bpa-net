'use client'
import Sidebar from "@/components/sidebar/Sidebar";
import useContaStore from "@/contexts/contaStore";
import {  DadosConta } from "@/types/commons";
import { Bell, ChevronDown, Link, Search } from "lucide-react";
import { useEffect, useState } from "react";
import Transferencias from "../transferencias/page";
import Mapa from "../mapa/page";
import Pagamentos from "../pagamentos/page";
import Home from "../inicio/page";



interface DashboardProps{
    idConta: number | undefined;
    dadosConta:DadosConta | undefined;
}

export default function Dashboard({idConta, dadosConta}:DashboardProps){

  const [page, setPage] = useState<string>("inicio");
  const useConta = useContaStore();
  console.log(dadosConta)
  useEffect(()=>{
    if(dadosConta){
      
      useConta.setSaldo(dadosConta.dados.saldo);
      useConta.setIban(dadosConta.dados.iban);
      useConta.setNumeroConta(dadosConta.dados.numeroConta);
      useConta.setIdTipoConta(dadosConta.dados.idTipoConta);
      useConta.setDataAbertura(dadosConta.dados.dataAbertura);
      useConta.setEstado(dadosConta.dados.estado);
      useConta.setCliente(dadosConta.dados.cliente);
      useConta.setCartao(dadosConta.dados.cartao);
    }

    if(idConta){
      useConta.setId(idConta);
    }
  },[])

  useEffect(() => {
    const buttons = document.querySelectorAll(".btn[data-active]") as NodeListOf<HTMLButtonElement>;
    const item_list = document.querySelectorAll(".btn") as NodeListOf<HTMLButtonElement>;
    const shadow = document.querySelector(".shadow") as HTMLDivElement;

    for (const item of item_list) {
      if (item.dataset.active === "true") {
        shadow.style.transition = ".5s";
        shadow.style.transform = `translate(${
          item.getBoundingClientRect().x + 7
        }px, ${item.getBoundingClientRect().y + 18}px)`;
        shadow.style.height = `${item.getBoundingClientRect().height - 35}px`;
      }
    }

    for (const button of buttons) {
      button.addEventListener("mouseover", () => {
        shadow.style.transform = `translate(${
          button.getBoundingClientRect().x + 7
        }px, ${button.getBoundingClientRect().y + 18}px)`;
        shadow.style.height = `${button.getBoundingClientRect().height - 35}px`;
      });
    }

    for (const button of buttons) {
      button.addEventListener("mouseleave", () => {
        for (const item of item_list) {
          if (item.dataset.active === "true") {
            shadow.style.transition = ".5s";
            shadow.style.transform = `translate(${
              item.getBoundingClientRect().x + 7
            }px, ${item.getBoundingClientRect().y + 18}px)`;
            shadow.style.height = `${
              item.getBoundingClientRect().height - 35
            }px`;
          }
        }
      });
    }

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
        <main className=" grid lg:grid-cols-4  h-screen ">
        <Sidebar />
  
        <div className="lg:col-span-3 flex flex-col overflow-hidden bg-white ">
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
                <Link
                  href={undefined}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <Bell className="h-6 w-6" />
                </Link>
                <div className="ml-3 relative">
                  <div className="flex items-center">
                    <button className="bg-gray-200 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                        AS
                      </div>
                    </button>
                    <ChevronDown className="ml-1 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-2 border-t  flex items-center">
              <div className="mr-4">
                Olá <span className="font-medium text-blue-500">{dadosConta?.dados.cliente.nome}</span>👋
              </div>
            </div>
          </header>
  
          <main className="flex-1 overflow-y-auto py-6 px-4 sm:px-6 lg:px-8 bg-white no-scrollbar xl:overflow-y-scroll">
          {page === "inicio" ? (
            <Home/>
          ) : page === "Transferencias" ? (
            <Transferencias/>
          ) : page === "Mapa" ? (
            <Mapa/>
          )
          : page === "Pagamentos" ? (
            <Pagamentos/>
          )
          : null}
          </main>
        </div>
      </main>
        
     );
}
