import api from "@/utils/axios"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name:'credentials',
            credentials:{
                codigo2fa: {label:"codigo2fa", type:"text"},
                iddispositivo: {label:"iddispositivo", type:"text"},
                sistemadispositivo: {label:"sistemadispositivo", type:"text"},
                navegadordispositivo: {label:"navegadordispositivo", type:"text"},
            },

            async authorize(credentials) {
                const response = await api.post('/login/verify2fa',
                {
                    codigo2fa:credentials?.codigo2fa,
                    iddispositivo:credentials?.iddispositivo,
                    sistemadispositivo: credentials?.sistemadispositivo,
                    navegadordispositivo: credentials?.navegadordispositivo
                })

                const user = await response.data;
                if(user && response.status == 200){
                    return user
                }


                return null
            },

           

        })
    ],
    
    pages:{
        signIn:'/login'
    },
    callbacks:{
        async jwt({token, user}) {
            if(user){
                token.user = user;
            }
            return token;
        },
        async session({session, token}){
            session = token.user as any
            return session
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }