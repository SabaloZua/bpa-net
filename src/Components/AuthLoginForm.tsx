"use client";

import Link from "next/link";
import styles from "@/styles/aderir_login.module.css";
import CustomInput from "./CustomInput";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function AuthForm() {
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-6">
        {/* <div className=" flex mb-3 items-center gap-2 justify-center">
          <Image src={`/icons/logo_favicon.svg`} width={36} height={36} alt="BPA Logo" />
          <h1 className="text-30 font-ibm-plex-serif font-bold text-black-1">
            BPA <span className="text-sm">NET</span>
          </h1>
        </div> */}

        <Logo size={36} position="center"/>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className={`${styles.titulo} font-semibold text-gray-600`}>
            Faça login na sua conta
            <p className={`${styles.subtitulo} font-normal text-gray-600 mt-[9px]`}>
              Ainda não tem uma conta?{" "}
              <Link href={'/aderir'} className={`${styles.corlink} underline cursor-pointer`}>Criar conta</Link>
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

        <Link
          href={"/inicio"}
          className={` ${styles.botalogin} bg-blue-400 w-full py-2 hover:bg-blue-500  gap-1 flex hover:gap-2 transition-all`}
        >
          Entrar <ArrowRight strokeWidth={3} size={16} className="relative top-[1px]" />
        </Link>
      </form>

      <div className="">
        <p className="text-14 text-center   text-gray-600">
          {" "}
          <span className={`${styles.corlink} underline cursor-pointer`}>
            Politicas de Privacidade
          </span>{" "}
          são aplicáveis
        </p>
        <p className=" text-gray-400 text-14 absolute bottom-5  right-[200px]  ">
          &copy; 2025 Banco de Poupança
        </p>
      </div>

      {/* <div className={`${styles.aderirCard} bg-gray-300`}>
      <div className={`${styles.textoCard}`}>
            <span className={`${styles.tituloCard}`}>Ja aderiu ao BPA NET?</span>
            <span className={`${styles.mesagemcard}`}>
            Com o BPA NET poderá realizar todas as suas operações em qualquer lugar.
            </span>
          </div>
          <ArrowRight strokeWidth={2} size={20} />
      </div>  */}
    </section>
  );
}
