'use client'
import RightSideba from "@/Components/RightSideba";
import TotalConta from "@/Components/TotalConta";
import Cabecalho from '@/Components/cabecalho'
import Tabela from '@/Components/Tabela'
import styles from '@/styles/dasbodrd.module.css'
import { User } from "@nextui-org/react";
import Cardcambio from "@/Components/Cards/Cardcambio";
export default function Home() {

    return (
        <>
            <section className="home gap-4">

                <div className={`home-content`}>
                    <header className="home-header">
                        <div className="flex justify-between mb-[15px]">
                            <Cabecalho
                                subtext='Acesse e gira a sua conta forma eficiente'
                                titulo='Dasbodrd'
                            />
                            <User

                                avatarProps={{
                                    src: "/icons/perfil.jpeg",
                                }}
                                description="Sabalovieira@gmail.com"
                                name="Astronautas SZ"
                                className="max-desktop:hidden  "
                            />
                        </div>

                        <div className={`${styles.dascontainer} shadow-chart`}>
                            <TotalConta legenda="Saldo contablistico" saldoDisponivel={20000} />
                            <TotalConta legenda="Saldo Autorizado " saldoDisponivel={20000} />
                            <TotalConta legenda="Saldo Disponivel" saldoDisponivel={20000} />
                        </div>

                        <div className={`${styles.cardtaxa}`}>
                            <h1 className={`${styles.titulotrasacao}`}>Taxa de Câmbio</h1>
                            <div className={`${styles.exchages}`}>
                                <Cardcambio />
                                <Cardcambio />
                                <Cardcambio />
                                <Cardcambio />
                            </div>
                        </div>

                    </header>

                    <div className={`bg-white ${styles.dashtrasa}`}>
                        <h2 className={`${styles.titulotrasacao} text-20`}>Trasações Recentes</h2>
                        <Tabela />
                    </div>
                </div>

                <RightSideba />

            </section>
        </>
    )
}