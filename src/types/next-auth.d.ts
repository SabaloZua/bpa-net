import NextAuth from "next-auth";

declare module 'next-auth'{
    interface Session{
        user:{
            nome:string;
            
        },
        contaid:number;
        primeirologin:boolean;
    }
}