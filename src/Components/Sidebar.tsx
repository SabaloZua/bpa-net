'use client'
import Link from "next/link"
import Image from "next/image"
import { sidebarLinks } from "@/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Footersibar from "./Footersibar"
import styles from '@/styles/sidebar.module.css'

    /*
        Notas importantes para compreenção 
        neste componete é utilizado a função cn que vem do arquivo utils em lib
        essa  função neste componete é usada para modificar o estilo de um link se ele estiver activo
        essa função basicamente  recebe dois paramentros o primeiro e a classe padrão do link com as cores e formatações padrao
        e o segundo parametro é um objecto literal com a chave que a classe com as formatações que o link vai adotar quanto estiver activo
        e o valor é o link clicado
        Exemplo
        cn("classePadrão",{
        "ClasseDoLinkActivo": link activo
        })  

        *SE PODERES fazer outro sidbar melhor*
    */

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <>
            <section className="sidebar">
                <nav className="flex flex-col gap-3 ">
                    <Link href={'/inicio'} className=" flex mb-4 cursor-pointer items-center gap-2">
                        <Image
                            src={`/icons/logo_favicon.svg`}
                            width={40}
                            height={40}
                            alt="Logo horizontal"
                            className="size-[36px] max-md:size-14"
                        />
                        <h1 className="sidebar-logo">BPA <span className="text-sm">NET</span></h1>
                    </Link>
                    {sidebarLinks.map((item) => {
                        
                        // busca o da pagina link activo o clicado 
                        const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                        
                        return (
                            <Link href={item.route} key={item.label}
                                className={cn(`sidebar-link  `, {
                                    'bg-bank-gradient': isActive
                                })}
                            >
                                <div className="relative size-6">
                                    <Image
                                        src={item.imgURL}
                                        alt={item.label}
                                        fill
                                        className={cn({
                                            'brightness-[3] invert-0': isActive
                                        })}
                                    />
                                </div>
                                <p className={cn('sidebar-label', {
                                    '!text-white': isActive
                                })}>
                                    {item.label}
                                </p>

                            </Link>
                        )
                    }

                    )}

                </nav>
                <Footersibar tipo={""} />
            </section>

        </>
    )
}