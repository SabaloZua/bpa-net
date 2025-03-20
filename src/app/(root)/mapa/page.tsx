'use client'
import dynamic from "next/dynamic"
import Cabecalho from '@/components/Cabecalho'
const MapaComponent = dynamic(() => import("@/components/Mapa/mapa"), { ssr: false })

export default function localizaratms(){
    return(
        <div>
        <Cabecalho Titulo='Mapa' subTitulo='Localize Atms em qualquer lugar'/>

            <MapaComponent/>
        </div>
    )
}