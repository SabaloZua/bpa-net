'use client'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { ArrowRight  } from "lucide-react";
const personalDataSchema = z.object({
    resposta: z.string(),

});
type personalDataSchema = z.infer<typeof personalDataSchema>;






export default function Confirmar() {
    const [dispositivo, setDispositivo] = useState<string | null>(null);
    const [usuario, setUsuario] = useState<string | null>(null);
    const [Pergunta, setPergunta] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setDispositivo(searchParams.get("dispositivo"));
        setUsuario(searchParams.get("usuario"));
    }, []);

    useEffect(() => {
        async function fetchPergunta() {
            const response = await api.get(`/login/buscarpergunta/${usuario}`)
            const pergunta = response.data.pergunta;;
            setPergunta(pergunta);
        }
        if (usuario) {
            fetchPergunta();
        }
    }, [usuario])


    const { register, handleSubmit } = useForm<personalDataSchema>({
        resolver: zodResolver(personalDataSchema),
    });
    const router = useRouter();

    async function handleVerifyPersonalData(data: personalDataSchema) {
        try {
            // setIsLoading(true);
            const dados = {
                iddispositivo: dispositivo,
                idusuario: usuario,
                ...data
            }
            console.log(dados)
              await api.post(`/login/verificarresposta`, dados);
            setIsLoading(true);
            router.push("/inicio");
            toast.success("Dados verificados com sucesso");
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
        <h2 className="text-xl font-medium text-gray-600">Verificação de Segurança</h2>
        <p className="text-gray-500 text-sm mt-2">
          Para confirmar a sua identidade, por favor responda à pergunta de segurança abaixo
        </p>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>

      <form onSubmit={handleSubmit(handleVerifyPersonalData)}>
        <div className="mb-5">
          <div className="flex items-center mb-2">
            
            <label htmlFor="securityQuestion" className="block text-gray-500 font-normal">
              Pergunta de Segurança
            </label>
          </div>
          <div className="bg-gray-50 p-3 rounded-md border border-gray-200 mb-4">
            <p className="text-gray-400">{Pergunta}</p>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="securityAnswer" className="block text-gray-500 font-normal text-sm mb-2">
            Sua Resposta <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              
              className={`w-full px-3 text-gray-600 py-3 border rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 transition-all duration-200`}
              placeholder="Insira sua resposta"
              {...register("resposta")}
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
              Continuar
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