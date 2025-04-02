/* eslint-disable react-hooks/exhaustive-deps */ "use client";
import {  useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InfoError from "@/components/InfoError";
import { TailSpin } from "react-loader-spinner";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
    resposta: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(1, "O campo não pode estar vazio!")

});

type FormType = z.infer<typeof FormSchema>;

export default function PersonalData() {


  const router = useRouter();
  const [Pergunta, setPergunta] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  let email = "";
  if (typeof window !== "undefined") {
    email = localStorage.getItem("email") || '';
  }
    useEffect(() => {
        async function fetchPergunta() {
            const response = await api.get(`/cliente/perguntaseguranca/${email}`)
            const pergunta = response.data.pergunta;;
            setPergunta(pergunta);
        }
        if (email) {
            fetchPergunta();
        }
    }, [email])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

 
 
  

  async function submitForm(data:FormType) {
    setIsLoading(true);
    try {
        const dados={
            email,
            ...data
        }
  
      const response =await api.post(`/cliente/resposta`,dados);
      router.push("/credencias/dados");
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
    <form onSubmit={handleSubmit(submitForm)} className="login_form" autoComplete="off">
      <div className="header_form">
        <h1>Pergunta de Segurança</h1>
        <p>
        Para confirmar a sua identidade, por favor responda à pergunta de segurança abaixo
        </p>
      </div>
      <div className="body_form">
        <div className="input_field">
          <label htmlFor="name">Pergunta de Segurança</label>
          <input
            type="text"
            placeholder="Digite sua nova senha"
            disabled
             value={Pergunta || ""}
          />          
        </div>

        <div className="input_field">
          <label htmlFor="email">Resposta</label>
          <input
            type="text"
            placeholder="Digite a sua resposta"
            {...register("resposta")}
          />
          {errors.resposta && <InfoError message={errors.resposta.message} />}
        </div>

        <Button type="submit" disabled={isLoading} className="button_auth">
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
            "Enviar Resposta"
          )}
        </Button>
      </div>
    </form>
  );
}
