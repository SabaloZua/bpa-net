import Image from "next/image"
import Link from "next/link"
import Cartao from "./Cartão"
export default function RightSideba() {
    return (
        <aside className="right-sidebar">

{/*------------------------ Secção do perfil ------------------------------------------*/} 
            <section className="flex flex-col pb-8">
                
                <div className="profile-banner" />
                
                <div className="profile">
                    <Image
                        className=" profile-img "
                        src={'/icons/perfil.jpeg'} width={90} height={90} alt="S" />

                    <div className="profile-details">
                        <h1 className="profile-name">
                            Astronauta SZ
                        </h1>
                        <p className="profile-email">Sabalovieira@gmail.com</p>
                    </div>

                </div>

            </section>
{/*------------------------ Fim Secção do Cartão ------------------------------------------*/}


  {/*------------------------ Secção do Cartão ------------------------------------------*/}
            <section className="banks">
                <div className="flex w-full  justify-between">
                    <h2 className="header-2">Meus Cartões</h2>
                    <Link href={'/'} className="flex gap-2">
                        <Image src={'icons/plus.svg'}
                            width={20}
                            height={20}
                            alt="mais"
                        />

                        <h2 className="text-14 font-semibold text-gray-600">
                            Adicionar Cartão
                        </h2>
                    </Link>
                </div>

                <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
                    <div className="relative z-10">
                        <Cartao />
                    </div>
                </div>
            {/* Informações da conta */}
                <div className="mt-10 flex flex-1 flex-col gap-6">
                    <h2 className="header-2">Informações Da conta</h2>

                    <div className='space-y-5 flex  items-center' >
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between gap-10">
                                <p className="profile-email">Tipo de Conta</p>
                                <p className="profile-email">Conta a ordem</p>
                            </div>
                            <div className="flex justify-between gap-10">
                                <p className="profile-email">Estado</p>
                                <p className="profile-email">Activa</p>

                            </div>
                            <div className="flex justify-between gap-10">
                                <p className="profile-email">Data de Abertura</p>
                                <p className="profile-email">24/04/2024</p>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
{/*------------------------ Fim Secção do Cartão ------------------------------------------*/}
        </aside>
    )
}