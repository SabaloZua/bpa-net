import Link from "next/link";
import Image from "next/image";
import { DadosContaType } from "@/types/commons";





interface Props {
  dados: DadosContaType | undefined;
}


function formatExpiryDate(dateStr: string | undefined): string {
    if (!dateStr) return "";
    const parts = dateStr.split('-');
    // Verifica se tem os três componentes (dd, mm, yyyy)
    if (parts.length !== 3) return dateStr;
    const [yyyy, mm, ] = parts;
    return `${mm}/${yyyy}`;
  }
function formataEmQuatro(value:string|undefined) {
    if (typeof value !== 'string' && typeof value !== 'number') return 'Valor inválido';
    
    return String(value)
        .replace(/\D/g, '') // Remove caracteres não numéricos
        .replace(/(.{4})/g, '$1 ') // Adiciona espaço a cada 4 caracteres
        .trim(); // Remove espaço extra no final
}

function formataNome(nomeCompleto:string|undefined):string {

    if(!nomeCompleto){
      return "";
    }
    // Converter para minúsculas e separar os nomes
    const names = nomeCompleto.toLowerCase().split(" ");

    // Capturar o primeiro e o último nome
    let firstName = names[0];
    let lastName = names[names.length - 1];

    // Capitalizar a primeira letra
    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    // Retornar o nome formatado
    return `${firstName} ${lastName}`;
}

export default function Cartao({dados}:Props) {
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

                    <article className="flex flex-col gap-3" >
                    <Image
                        src={'/icons/chip.svg'}
                        width={55}
                        height={40}
                        alt="logo banco"
                        className="mb-2"  
                    />

                     <p className="text-14 tracking-[1.1px] text-white mb-2 w-full ">
                        {/* 5056 4789 3456 4393 */}
                        {formataEmQuatro(dados?.cartao.numero)}
                        </p>

                        <div className=" flex justify-between">
                            <h1 className="text-12 font-semibold text-white">{formataNome(dados?.cliente.nome)}</h1>
                            <h2 className="text-12 font-semibold text-white">{formatExpiryDate(dados?.cartao.dataValidade)}</h2>
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
                    <p className="text-white text-12 ml-5">Débito</p>
              
                </div>
            </Link>
        </div>

    )
}