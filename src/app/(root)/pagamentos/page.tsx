import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { log } from "console";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page() {

  const session = await getServerSession(nextAuthOptions);
  console.log(session)

  log(session?.primeirologin)

  if(session?.primeirologin == true){
    redirect('/primeiroLogin')
  }


  return (
    <div className="flex flex-col gap-5 items-center h-full py-7 px-4">
      <h1 className="py-4 text-gray-600 text-2xl text-center">Meus Pagamentos {session?.contaid}</h1>
      <div>
        <Image 
            src={"/icons/pagamentos1.svg"} 
             alt="" 
             width={400} 
             height={50}
            />
      </div>
    </div>

    
  );
}
