"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

/**
 * Formulário de Login
 *
 * Estava a ver aquele vídeo, praticamente tirei muito do que aquele tio estava a falar
 * Não difere muito do código dele, só temos que entender o zod e o react-hook-form
 *
 * Ambos são bibliotecas para a validação de forms
 */

import {
  Form,
 
} from "@/Components/ui/form";

import { z } from "zod";
import { Button } from "./ui/button";

import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";

export default function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);

  if (type == "") {
    setUser(null);
  }

  const form = useForm<z.infer<typeof authFormSchema>>({
    resolver: zodResolver(authFormSchema),
    defaultValues: {
      username: "",
      codigo: "",
    },
  });

  function onSubmit(values: z.infer<typeof authFormSchema>) {
    console.log(values);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href={"/"}
          className=" flex mb-4 cursor-pointer items-center gap-1"
        >
          <Image
            src={`/icons/logo_favicon.svg`}
            width={32}
            height={32}
            alt="BPA Logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            BPA <span className="text-sm">NET</span>
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-26 lg:text-36 font-semibold text-gray-800">
            Faça login na sua conta
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your Account to get started"
                : "Ainda não tem uma conta? Criar conta"}
            </p>
          </h1>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4"></div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              <CustomInput
                control={form.control}
                name="username"
                label="Nº de Adesão ou Email"
                placeholder="Insira o Nº de Adesão ou Email"
              />

              <CustomInput
                control={form.control}
                name="codigo"
                label="Código de Acesso"
                placeholder="Insira o seu código de acesso"
              />

              <Button
                type="submit"
                className="bg-blue-400 w-full hover:bg-blue-500 form-btn"
              >
                Entrar 
              </Button>
            </form>
          </Form>
        </>
      )}
    </section>
  );
}
