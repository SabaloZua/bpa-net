'use client'
import dynamic from "next/dynamic"

const MapaComponent = dynamic(() => import("@/Components/Mapa/mapa"), { ssr: false })

export default function localizaratms(){
    return(
        <div>
            <MapaComponent/>
        </div>
    )
}