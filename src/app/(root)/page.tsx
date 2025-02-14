import { redirect } from 'next/navigation'
export default function Home() {
    /**
     * Aqui, logo que o utilizador acessar a rota ('/'), ele é redireccionado para ('/login') depois de clicar no botao de "entrar"(dentro do form de login) ele vai para a rota '/inicio'
     * 
     * Substitui o '/' por '/inicio', para ele fazer o redireccionamento inicial na tela de login
     * 
     * Se tiver outra forma melhor de lidar com isso, não hesites em adicionar 👀🤙...
     */

    redirect('/login')

    return  <div></div>
}