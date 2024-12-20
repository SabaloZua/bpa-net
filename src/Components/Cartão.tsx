import Link from "next/link";
import Image from "next/image";
export default function Cartao() {
    return (

        <div className="flex flex-col">
          
            <Link href={'/'} className="bank-card">
       
                <div className="bank-card_content">
                <Image
                        src={'/icons/lines.png'}
                        width={500}
                        height={290}
                        alt="line"
                        className="absolute top-6 left-0  "
                    />
                    <div>
                        <p className="font-ibm-plex-serif font-black text-white">
                            Banco BPA
                        </p>
                    </div>

                    <article className="flex flex-col gap-2" >
                    <Image
                        src={'/icons/chip.svg'}
                        width={55}
                        height={40}
                        alt="logo banco"
                        className="mb-2"  
                    />

                     <p className="text-14 font-semibold tracking-[1.1px] text-white mb-2">
                            **** **** **** <span className="text-16">4393</span>
                        </p>
                        <div className=" flex justify-between">
                            <h1 className="text-12 font-semibold text-white">Astronauta SZ</h1>
                            <h2 className="text-12 font-semibold text-white">**/****</h2>
                        </div>
                      
                       
                    </article>
                </div>

                <div className=" bank-card_icon">
                    <Image
                        src='/icons/multi.svg'
                        width={80}
                        height={50}
                        alt="pay"
                        className="ml-5"
                    />
                    <p className="text-white text-12 ml-5">Dérbito</p>
              
                </div>
            </Link>
        </div>

    )
}