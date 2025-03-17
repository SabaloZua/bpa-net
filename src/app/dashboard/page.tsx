import nextAuthOptions from "@/lib/nextAuthOptions"
import Dashboard from "@/pages/dashboard/page";
import api from "@/utils/axios";
import { getServerSession } from "next-auth"

export default async function DashboardPage(){

    const session = await getServerSession(nextAuthOptions);

    try {
        
        const dadosConta = await api.get(`/conta/dadoscliente/${session?.contaid}`)
         
        return(
            <Dashboard idConta={session?.contaid} dadosConta={dadosConta.data}/>
        )

    } catch{
        
        return(
            <div>
                Erro 
            </div>
        )
    }
   
}