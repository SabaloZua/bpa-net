"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import welcome from "@/assets/images/resetPass.svg";
import { FaArrowRightLong } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import api from "@/utils/axios";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import "@/styles/email_campos.css";
import "@/styles/email.css";
import FirstLoginModal from "@/components/modals/FirstLoginModal";
import { useDisclosure } from "@nextui-org/react";
import Logo from "@/components/Logo";

const formSchema = z
  .object({
    codigoAcesso: z.string().min(4, "A senha deve ter no mínimo 4 caracteres"),
    confirmarSenha: z.string(),
    pergunta: z
      .string()
      .min(10, "A pergunta deve ter no mínimo 10 caracteres")
      .max(100, "A pergunta deve ter no máximo 100 caracteres"),
    resposta: z
      .string()
      .min(3, "A resposta deve ter no mínimo 3 caracteres")
      .max(50, "A resposta deve ter no máximo 50 caracteres"),
  })
  .refine((data) => data.codigoAcesso === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  });

type FormData = z.infer<typeof formSchema>;

export default function PrimeiroLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function submitForm(data: FormData) {
    setIsLoading(true);
    try {
      await api.post("/login/primeirologin", {
        idconta: Number(localStorage.getItem("idConta")),
        codigoacesso: data.codigoAcesso,
        pergunta: data.pergunta,
        resposta: data.resposta,
      });

      router.replace("/dashboard");
      //router.push("/registo/tipo-conta");
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

  useEffect(() => onOpen(), [onOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A82FF]/10 to-[#1A82FF]/5 flex items-center justify-center p-4 md:p-0 md:items-start md:justify-start">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center gap-8 ">
     
        <div className="hidden lg:block w-1/2">
          <Image src={welcome} alt="Segurança Bancária" className="w-full h-auto" width={100} />
        </div>

       
        <div className="w-full lg:w-1/2">
          <div className="bg-white w-full max-w-md mx-auto p-8 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <Logo size={10} className="text-center"/>
              <p className="text-gray-600 mt-2">Configure suas credenciais de acesso</p>
            </div>

            <form onSubmit={handleSubmit(submitForm)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Código de Acesso
                </label>
                <input
                  type="password"
                  {...register("codigoAcesso")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A82FF] focus:border-transparent transition"
                  placeholder="Mínimo 4 caracteres"
                />
                {errors.codigoAcesso && (
                  <p className="text-red-500 text-sm mt-1">{errors.codigoAcesso.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirme sua Senha
                </label>
                <input
                  type="password"
                  {...register("confirmarSenha")}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A82FF] focus:border-transparent transition"
                  placeholder="Digite novamente sua senha"
                />
                {errors.confirmarSenha && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmarSenha.message}</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Crie sua Pergunta de Segurança
                  </label>
                  <input
                    type="text"
                    {...register("pergunta")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A82FF] focus:border-transparent transition"
                    placeholder="Ex: Qual foi o nome do meu primeiro professor?"
                  />
                  {errors.pergunta && (
                    <p className="text-red-500 text-sm mt-1">{errors.pergunta.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sua Resposta
                  </label>
                  <input
                    type="text"
                    {...register("resposta")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1A82FF] focus:border-transparent transition"
                    placeholder="Digite a resposta para sua pergunta"
                  />
                  {errors.resposta && (
                    <p className="text-red-500 text-sm mt-1">{errors.resposta.message}</p>
                  )}
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="button_auth">
                {isLoading ? (
                  <TailSpin
                    height="25"
                    width="25"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  <>
                    Confirmar configurações <FaArrowRightLong style={{ marginLeft: "10px" }} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
      <FirstLoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>


  );
}
