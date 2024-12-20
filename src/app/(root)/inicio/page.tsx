import RightSideba from "@/Components/RightSideba";
import TotalConta from "@/Components/TotalConta";
import Cabecalho from '@/Components/cabecalho'

export default function Home() {

    return (
        <>
            <section className="home">
                <div className="home-content">
                    <header className="home-header">

                        <Cabecalho
                            tipo='saudacao'
                            nomeUser='Astronauta'
                            subtext='Acesse e gira a sua conta e transações de forma eficiente'
                            titulo='Seja Bem Vindo,'
                        />


                        <TotalConta saldoDisponivel={20000} />
                    </header>
                </div>

                <RightSideba />
                
            </section>
        </>
    )
}