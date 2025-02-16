"use client"

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Image from "next/image";




const NovaAdesaoPage = () => {


  return (
    <form className="flex flex-col gap-3">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-medium">Email</h1>
          <Image src='/icons/email.png' alt="" width={30} height={10}/>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm">Bem-vindo ao nosso Internet Banking! Vamos configurar sua conta em poucos passos</p>
          <p className="text-sm">Para começar sua adesão, informe o e-mail vinculado à sua conta BPA</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Input />
        <Button>Continuar</Button>
      </div>
    </form>
  );
};

export default NovaAdesaoPage;
