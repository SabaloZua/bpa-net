"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {

    Form,
  FormControl,

  FormField,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";


import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "O campo deve ter no mínimo 2 caracteres",
  }),
});

export default function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);

  if(type == ""){
    setUser(null)

  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
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
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">
                        Nº de Adesão ou Email
                    </FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input placeholder="Insira o Nº de Adesão ou Email" className="input-class" {...field}/>
                        </FormControl>
                        <FormMessage className="form-message">

                        </FormMessage>
                    </div>
                  </div>
                )}
              />

            <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <div className="form-item">
                    <FormLabel className="form-label">
                        Código de Acesso
                    </FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input placeholder="Insira o seu código de acesso" className="input-class" {...field}/>
                        </FormControl>
                        <FormMessage className="form-message">

                        </FormMessage>
                    </div>
                  </div>
                )}
              />
              <Button type="submit" className="bg-blue-400 w-full hover:bg-blue-500">Entrar</Button>
            </form>
          </Form>
        </>
      )}
    </section>
  );
}
