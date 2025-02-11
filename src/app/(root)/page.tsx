import RightSideba from '@/Components/RightSideba'
import Cabecalho from '../../Components/cabecalho'
import TotalConta from '../../Components/TotalConta'
import { redirect } from 'next/navigation'
import Link from 'next/link'
export default function Home() {
    /**
     * Aqui, logo que o utilizador acessar a rota ('/'), ele é redireccionado para ('/login') depois de clicar no botao de "entrar"(dentro do form de login) ele vai para a rota '/inicio'
     * 
     * Substitui o '/' por '/inicio', para ele fazer o redireccionamento inicial na tela de login
     * 
     * Se tiver outra forma melhor de lidar com isso, não hesites em adicionar 👀🤙...
     */

    redirect('/login')

    return (
        <>
            <section className="home">
                <div className="home-content">
                    <header className="home-header">

                        <Cabecalho tipo='saudacao' nomeUser='Astronauta'
                            subtext='Acesse e gira a sua conta e transações de forma eficiente'
                            titulo='Seja Bem Vindo,'/>

                        <TotalConta saldoDisponivel={20000} />
                    </header>
                </div>
                <Link href={'/incio'}>Inicio</Link>
                <Link href={'/pagamentos'}>pagamentos</Link>

                <RightSideba />
                
            </section>
        </>
    )
}