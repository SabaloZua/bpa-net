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
    codigoacesso: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(1, "O campo não pode estar vazio!"),
  
    confirmacodigo: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(8, "O Campo deve ter no minimo 8 caractees"),
  
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
  let idconta=""
  if (typeof window !== "undefined") {
    email = localStorage.getItem("email") || '';
    idconta=localStorage.getItem("idConta")|| '';
  }
  

  async function submitForm(data:FormType) {
    setIsLoading(true);
    try {
        const dados={
            email,
            idconta,
            ...data
        }
  
      const response =await api.post(`/cliente/novascredencias`,dados);
      router.push("/login");
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
        <h1>Novo Codigo de Acesso</h1>
        <p>
          Introduza o seu Novo Codigo de acesso abaixo. Certifique-se de digitar as informações
          corretamente.
        </p>
      </div>
      <div className="body_form">
        <div className="input_field">
          <label htmlFor="name">Senha</label>
          <input
            type="text"
            placeholder="Digite sua nova senha"
            {...register("codigoacesso")}
          />
          {errors.codigoacesso && <InfoError message={errors.codigoacesso.message} />}
        </div>

        <div className="input_field">
          <label htmlFor="email">Confirme a sua senha</label>
          <input
            type="text"
            placeholder="Confirme o seu novo codigo "
            {...register("confirmacodigo")}
          />
          {errors.confirmacodigo && <InfoError message={errors.confirmacodigo.message} />}
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
