'use client'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import {  useState } from "react";
import { ArrowRight  } from "lucide-react";
import useconta from "@/contexts/contaStore"
const personalDataSchema = z.object({
    senha: z.string(),
    novasenha: z.string(),
    confirmasenha:z.string()

});
type personalDataSchema = z.infer<typeof personalDataSchema>;






export default function AlteraSenha() {
    const [isLoading, setIsLoading] = useState(false);


    const { register, handleSubmit } = useForm<personalDataSchema>({
        resolver: zodResolver(personalDataSchema),
    });
    const router = useRouter();

    async function handleVerifyPersonalData(data: personalDataSchema) {
        try {
            // setIsLoading(true);
            const dados = {
                contaid:useconta.getState().id,
                ...data
            }

            const response=  await api.post(`/cliente/actualizaSenha`, dados);
            setIsLoading(true);
            router.refresh();
            toast.success(response.data.message);
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast.error(error.response?.data.message);
                } else {
                    toast.error("Sem conexão com o servidor");
                }
            }
              } finally {
                setIsLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col py-12 px-4 sm:px-6 lg:px-8">
        <header className="max-w-md w-full mx-auto mb-8 flex justify-center">
         
          <Logo size={20}/>
        </header>
        
        <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex items-center justify-center mb-6 text-blue-600">
       
      </div>
      
      <div className="mb-5 text-center">
        <h2 className="text-xl font-medium text-gray-600">Alteração de Codigo de Acesso</h2>
        <p className="text-gray-500 text-sm mt-2">
          Para Alterar o seu Codigo de Acesso digite as suas novas credenciais
        </p>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>

      <form onSubmit={handleSubmit(handleVerifyPersonalData)}>
        <div className="mb-5">
          <div className="flex items-center mb-2">
            
            <label htmlFor="securityQuestion" className="block text-gray-500 font-normal">
             Seu codigo de acesso Actual<span className="text-red-500">*</span>
            </label>
          </div>
          
          <div className="relative">
            <input
              
              className={`w-full px-3 text-gray-600 py-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 transition-all duration-200`}
              placeholder="Insira o seu  Codigo de Acesso"
              {...register("senha")}
              disabled={isLoading}
              autoComplete="off"
            />
          
          </div>
        </div>
        <div className="mb-5">
          <div className="flex items-center mb-2">
            
            <label htmlFor="securityQuestion" className="block text-gray-500 font-normal">
             Novo codigo de Acesso <span className="text-red-500">*</span>
            </label>
          </div>
          
          <div className="relative">
            <input
              
              className={`w-full px-3 text-gray-600 py-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 transition-all duration-200`}
              placeholder="Insira o seu novo Codigo de Acesso"
              {...register("novasenha")}
              disabled={isLoading}
              autoComplete="off"
            />
          
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="securityAnswer" className="block text-gray-500 font-normal text-sm mb-2">
            Confirme o Seu Codigo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              
              className={`w-full px-3 text-gray-600 py-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 transition-all duration-200`}
              placeholder="Confirme o seu novo Codigo de Acesso"
              {...register("confirmasenha")}
              disabled={isLoading}
              autoComplete="off"
            />
          
          </div>
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-3 rounded-md transition duration-300 flex items-center justify-center ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </>
          ) : (
            <>
              Alterar
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Esta verificação ajuda a proteger sua conta contra acessos não autorizados.
        </p>
      </div>
    </div>
        </div>
        
        <footer className="max-w-md w-full mx-auto mt-8 text-center">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} BPA.NET | Todos os direitos reservados
          </p>
        </footer>
      
        </div>
    )
}