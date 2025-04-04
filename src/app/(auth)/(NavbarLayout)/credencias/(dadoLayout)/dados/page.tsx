/* eslint-disable react-hooks/exhaustive-deps */ "use client";
import {  useState } from "react";
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
  nomeCliente: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(1, "O campo não pode estar vazio!")
    .transform((nomeCliente) => {
      return nomeCliente.trim().toUpperCase();
    
    }),
    numeroconta: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(9, "Formato de telefone inválido"),

  numeroBi: z
    .string({
      required_error: "O número do BI é obrigatório!",
    })
    .min(1, "O número do BI é obrigatório!")
    .regex(/^[0-9]{9}[A-Z|a-z]{2}[0-9]{3}$/, "Número do BI inválido!")
    .transform((phone) => {
      return phone.trim().toUpperCase();
    }),  
});

type FormType = z.infer<typeof FormSchema>;

export default function PersonalData() {


  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

 
  let email = "";
  if (typeof window !== "undefined") {
    email = localStorage.getItem("email") || '';
  }
  

  async function submitForm(data:FormType) {
    setIsLoading(true);
    try {
        const dados={
            email,
            ...data
        }
  
      const response =await api.post(`/cliente/validardados`,dados);
      localStorage.setItem("idConta", response.data.idconta);
      router.push("/credencias/nova-senha");
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
    <form onSubmit={handleSubmit(submitForm)} className="login_form" autoComplete="off">
      <div className="header_form">
        <h1>Dados pessoais</h1>
        <p>
          Introduza os seus dados pessoais abaixo. Certifique-se de digitar as informações
          corretamente.
        </p>
      </div>
      <div className="body_form">
        <div className="input_field">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            placeholder="Insira o seu Nome"
            {...register("nomeCliente")}
          />
          {errors.nomeCliente && <InfoError message={errors.nomeCliente.message} />}
        </div>

        <div className="input_field">
          <label htmlFor="email">Numero da Conta</label>
          <input
            type="text"
            placeholder="Insira o numero da sua Conta "
            {...register("numeroconta")}
          />
          {errors.numeroconta && <InfoError message={errors.numeroconta.message} />}
        </div>

        <div className="input_field">
          <label htmlFor="bi_number">Número do BI</label>
          <input
            type="text"
            placeholder="Insira o número do BI"
            {...register("numeroBi")}
            maxLength={14}
          />
          {errors.numeroBi && <InfoError message={errors.numeroBi.message} />}
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
            "Enviar dados"
          )}
        </Button>
      </div>
    </form>
  );
}
