"use client";

import Image from "next/image";
import Link from "next/link";

import CustomInput from "./CustomInput";
import { ArrowRight} from "lucide-react";



export default function AuthForm() {



  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-6">
        <div className=" flex mb-4 items-center gap-1">
          <Image
            src={`/icons/logo_favicon.svg`}
            width={32}
            height={32}
            alt="BPA Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            BPA <span className="text-sm">NET</span>
          </h1>
        </div>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-26 lg:text-36 font-semibold text-gray-800">
            Faça login na sua conta
            <p className="text-16 font-normal text-gray-600">
              Ainda não tem uma conta? <span className="text-[#0179FE] underline cursor-pointer">Criar conta</span>
            </p>
          </h1>
        </div>
      </header>
      

      <form className="space-y-4">

        <CustomInput
          name="username"
          label="Nº de Adesão ou Email"
          placeholder="Insira o Nº de Adesão ou Email"
        />

        <CustomInput
          name="codigo"
          label="Código de Acesso"
          placeholder="Insira o seu código de acesso"
        />

        <Link href={'/inicio'} className="bg-blue-400 w-full py-2 hover:bg-blue-500 form-btn justify-center items-center gap-2 flex hover:gap-3 transition-all">
          Entrar  <ArrowRight strokeWidth={2} size={24} />
        </Link>
      </form>
      
        
    </section>
  );
}
