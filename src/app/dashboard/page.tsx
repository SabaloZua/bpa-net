import nextAuthOptions from "@/lib/nextAuthOptions"
import Dashboard from "@/paginas/dashboard/page";
import api from "@/utils/axios";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function DashboardPage(){

    const session = await getServerSession(nextAuthOptions);
    console.log(session)

    try {
         
        const dadosConta = await api.get(`/conta/dadoscliente/${session?.contaid}`)
         
          
        return(
            
            <Dashboard idConta={session?.contaid} dadosConta={dadosConta.data.dados}/>

        )
 
    }catch{
         
        redirect('/login');
    }
    
 }