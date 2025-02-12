'use client'
import Image from "next/image";
import style from "@/styles/not_found.module.css"
import Link from "next/link";

import { Navbar, NavbarContent, NavbarBrand, NavbarItem, NavbarMenuToggle, NavbarMenu } from "@nextui-org/react";
export default function Home() {

       
      return (
        <div className="flex flex-col">
           <Navbar isBordered isBlurred>
			<NavbarContent className="sm:hidden pr-1" justify="start">
	 				<NavbarBrand>
	 				<Image
                             src={`/icons/logo_favicon.svg`}
                             width={44}
                             height={44}
                             alt="Logo horizontal"
                             className="size-[45px] max-md:size-14 "
                         />
                         <h1 className="sidebar-logo">BPA <span className="text-sm">NET</span></h1>
					</NavbarBrand>
	 			</NavbarContent>
	 			<NavbarContent className="hidden sm:flex gap-6" justify="start">
	 				<NavbarBrand>
	 					{/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
	 					<Image
                             src={`/icons/logo_favicon.svg`}
                             width={35}
                             height={35}
                             alt="Logo horizontal"
                            className="size-[36px] max-md:size-14"
                         />
                         <h1 className="sidebar-logo">BPA <span className="text-sm">NET</span></h1>
	 				</NavbarBrand>
	 				<NavbarItem>
	 					<Link className="text-color-text"   href="/login">
	 						Entrar
	 					</Link>
	 				</NavbarItem>
	 				<NavbarItem>
	 					<Link
	 						href="/email"
	 						className="text-color-text"
	 						 
	 						aria-current="page"
	 					>
	 						Aderir
	 					</Link>
	 				</NavbarItem>
	 				<NavbarItem>
	 					<Link
	 						className="text-color-text"
						 
	 						href="/privacy-policies"
	 					>
	 						Políticas de Privacidade
	 					</Link>
	 				</NavbarItem>
	 				<NavbarItem>
	 					<Link className="text-color-text"   href="/forgot-password">
	 						Recuperar Credenciais
	 					</Link>
	 				</NavbarItem>
	 			</NavbarContent>

	 			<NavbarContent className="sm:hidden" justify="end">
	 				<NavbarMenuToggle />
	 			</NavbarContent>

	 			<NavbarMenu>
	 				<NavbarItem>
	 					<Link className="text-color-text"   href="/login">
	 						Entrar
	 					</Link>
	 				</NavbarItem>
	 				<NavbarItem>
	 					<Link
	 						href="/email"
	 						className="text-color-text"
	 						 
	 						aria-current="page"
	 					>
	 						Aderir
	 					</Link>
	 				</NavbarItem>
	 				<NavbarItem>
	 					<Link
	 						className="text-color-text"
	 						 
	 						href="/privacy-policies"
	 					>
	 						Políticas de Privacidade
	 					</Link>
	 				</NavbarItem>
	 				<NavbarItem>
	 					<Link className="text-color-text"   href="/forgot-password">
	 						Recuperar Credenciais
	 					</Link>
	 				</NavbarItem>
	 			</NavbarMenu>
			</Navbar>
        <main className="w-full flex-1">
            
            
            <div className={`  ${style.conteudo}`} >


              <div className={` ${style.contimg}`} >
                 <Image src={'/icons/erro404.svg'}
                 width={100}
                 height={100}
                 alt="image erro"
                 className={style.imagem}
                 />
              </div>

              <div className={style.conttexto}>
                <h1 className= {style.titulo}>Erro página não encontrada</h1>
                <p className={`${style.texto} ` }>
                  Por favor,  verifica a URL e tente novamente <br/>
                  Se o problema presistir, entre em contacto com suporte<br/>
                  Agradecemos a sua compreensão.
                  
                   </p>
              <Link href={"/"} className= {style.btm}>
              <p>
              voltar para o inicio
              </p>
              </Link>

              </div>

            </div>

        </main>
        </div>
      );
    
    }