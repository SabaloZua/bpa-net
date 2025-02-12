
import Cartao from "./Cartão"
import styles from '@/styles/Righitsibar.module.css'


export default function RightSideba() {
    return (
        <aside className={`right-sidebar `}>


{/*------------------------ Fim Secção do Cartão ------------------------------------------*/}


  {/*------------------------ Secção do Cartão ------------------------------------------*/}
            <section className="banks ">
                <div className="flex flex-col">
                    <p className={`${styles.profilenome}   text-gray-700 mb-4`}>Meus Cartões</p>
                    
                        <Cartao />

                        <div className="  w-full  items-center flex flex-col gap-2 mt-4">
                            <div className="flex justify-between w-full ">
                                <h1 className={`${styles.titlecont} font-normal text-gray-600`}>Tipo de Cartão</h1>
                                <p className={`${styles.infocont} font-normal text-gray-600`}>Dérbito</p>
                            </div>

                            <div className="flex justify-between w-full ">
                                <h1  className={`${styles.titlecont} font-normal text-gray-600`}>Estado</h1>
                                <p className={`${styles.infocont} font-normal text-gray-600`}>Activo</p>

                            </div>
                            <div className="flex justify-between w-full ">
                                <h1  className={`${styles.titlecont} font-normal text-gray-600`}>Valido Até</h1>
                                <p className={`${styles.infocont} font-normal text-gray-600`}>12/2035</p>

                            </div>
                        </div>

                    </div>
                          {/* Informações da cartao */}
                        
                <div className="w-full h-[0.5px] bg-[#efefef]  m-[3px 0px]"/>
                     {/* Informações da conta */}

                <div className="flex flex-1 flex-col gap-3">
                    <h2 className={`${styles.titlesec}   text-gray-700`}>Informações Da conta</h2>

                        <div className="flex flex-col gap-2 w-full">
                            <div className="flex justify-between w-full ">
                                <h1 className={`${styles.titlecont} font-normal text-gray-600`}>Tipo de Conta</h1>
                                <p className={`${styles.infocont} font-normal text-gray-600`}>Conta a ordem</p>
                            </div>
                            <div className="flex justify-between  w-full ">
                                <h1  className={`${styles.titlecont} font-normal text-gray-600`}>Estado</h1>
                                <p className={`${styles.infocont} font-normal text-gray-600`}>Activa</p>

                            </div>
                            <div className="flex justify-between   w-full ">
                                <h1  className={`${styles.titlecont} font-normal text-gray-600`}>Data de Abertura</h1>
                                <p className={`${styles.infocont} font-normal text-gray-600`}>24/04/2024</p>
                            </div>
                        </div>


                   
                </div>
            </section>
{/*------------------------ Fim Secção do Cartão ------------------------------------------*/}
        </aside>
    )
}