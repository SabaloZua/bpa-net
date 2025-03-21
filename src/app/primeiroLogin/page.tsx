"use client";

import React, { useState } from "react";
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


const formSchema = z
  .object({
    codigoAcesso: z
      .string()
      .min(4, "A senha deve ter no mínimo 4 caracteres"),
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
      await api.post("/login/primeiroLogin", {
        idconta:Number(localStorage.getItem("idConta")),
        codigoacesso:data.codigoAcesso,
        pergunta:data.pergunta,
        resposta:data.resposta
      }
      );
     
      router.replace('/inicio');
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A82FF]/10 to-[#1A82FF]/5 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-8 ">
        {/* Illustration for larger screens */}
        <div className="hidden lg:block w-1/2">
          <Image src={welcome} alt="Segurança Bancária" className="w-full h-auto" width={200} />
        </div>

        {/* Form Container */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white w-full max-w-md mx-auto p-8 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#1A82FF]">BPA Net</h1>
              <p className="text-gray-600 mt-2">Configure suas credenciais de acesso</p>
              <p className="text-sm text-gray-500 mt-1">
                Para sua segurança, crie uma senha forte e uma pergunta personalizada
              </p>
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
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Pergunta de Segurança Personalizada
                </h2>

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

            <p className="text-sm text-gray-500 mt-6 text-center">
              Lembre-se de guardar sua pergunta e resposta de segurança. Elas serão necessárias caso
              precise recuperar seu acesso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
