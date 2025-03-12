"use client";
import Image from "next/image";
import style from "@/styles/not_found.module.css";
import Link from "next/link";

import { Header } from "@/components/Header";
export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="w-full flex-1">
        <div className={`  ${style.conteudo}`}>
          <div className={` ${style.contimg}`}>
            <Image
              src={"/icons/erro404.svg"}
              width={100}
              height={100}
              alt="image erro"
              className={style.imagem}
            />
          </div>

          <div className={style.conttexto}>
            <h1 className={style.titulo}>Erro página não encontrada</h1>
            <p className={`${style.texto} `}>
              Por favor, verifica a URL e tente novamente <br />
              Se o problema presistir, entre em contacto com suporte
              <br />
              Agradecemos a sua compreensão.
            </p>
            <Link href={"/"} className={style.btm}>
              <p>voltar para o inicio</p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
