  // eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth";

declare module 'next-auth'{
    interface Session{
        user:{
            nome: string;
            email: string; 
            numeroBi: number;
            conta: {
                tipoConta: number;
                saldo: number;
                iban: number; 
                local: string;
                area: string;
                numeroConta: number;
                estado: string;
                id: number;
         }

            
        },
        contaid:number;
        primeirologin:boolean;
    }
}