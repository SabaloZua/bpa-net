/* eslint-disable react-hooks/exhaustive-deps */ "use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InfoError from "@/components/InfoError";
import { TailSpin } from "react-loader-spinner";
import { useStepperRegistoStore } from "@/contexts/stepsStore";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";

const FormSchemaPessoal = z.object({
  nomeCliente: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(1, "O campo não pode estar vazio!")
    .transform((nomeCliente) => {
      return nomeCliente.trim().toUpperCase();
      /*.split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        });*/
    }),
  dataNascimento: z
    .string()
    .refine(
      (value) => {
        const date = new Date(value);
        return !Number.isNaN(date.getTime());
      },
      {
        message: "A data de nascimento deve estar no formato válido (DD/MM/AAAA)",
        path: ["dataNascimento"],
      }
    )
    .transform((value) => {
      return new Date(value);
    }),

  telefone: z
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

  municipio: z.string({
    required_error: "A seu municípoi é obrigatório!",
  }),

  bairro: z.string(),
});

const FormSchemaComercial = z.object({
  nomeCliente: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(1, "O campo não pode estar vazio!")
    .transform((nomeCliente) => {
      return nomeCliente.trim().toUpperCase();
      // .split(" ")
      // .map((word) => {
      //   return word[0].toLocaleUpperCase().concat(word.substring(1));
      // });
    }),
  dataNascimento: z
    .string()
    .refine(
      (value) => {
        const date = new Date(value);
        return !Number.isNaN(date.getTime());
      },
      {
        message: "A data de nascimento deve estar no formato válido (DD/MM/AAAA)",
        path: ["dataNascimento"],
      }
    )
    .transform((value) => {
      return new Date(value);
    }),

  telefone: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(1, "Formato de telefone inválido"),

  numeroBi: z
    .string({
      required_error: "O número do BI é obrigatório!",
    })
    .min(1, "O número do BI é obrigatório!")
    .regex(/^[0-9]{9}[A-Z|a-z]{2}[0-9]{3}$/, "Número do BI inválido!")
    .transform((phone) => {
      return phone.trim().toUpperCase();
    }),
  areaActividade: z
    .string({ required_error: "O campo é obrigatório!" })
    .min(1, "O campo é obrigatório!"),
  local: z.string({ required_error: "O campo é obrigatório!" }).min(1, "O campo é obrigatório!"),
});

type FormTypePessoal = z.infer<typeof FormSchemaPessoal>;
type FormTypeComercial = z.infer<typeof FormSchemaComercial>;

export default function PersonalData() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const useStepsRegisto = useStepperRegistoStore();
  let tipoConta = "";
  if (typeof window !== "undefined") {
    tipoConta = localStorage.getItem("tipoConta") || "";
  }

  useEffect(() => {
    useStepsRegisto.setCurrentStepRegisto(2);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypePessoal>({
    resolver: zodResolver(FormSchemaPessoal),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
  } = useForm<FormTypeComercial>({
    resolver: zodResolver(FormSchemaComercial),
  });

  //Nesta Etapa é verificada se o BI já pertence a uma conta
  async function APICall(data: any) {
    setIsLoading(true);
    try {
      console.log(data);
      await api.post(`/openacount/verificarDadosPessoais`, data);

      if (typeof window !== "undefined") {
        localStorage.setItem("nomeCliente", data.nomeCliente);
        localStorage.setItem("dataNascimento", data.dataNascimento.toDateString());
        localStorage.setItem("numeroBi", data.numeroBi);
        localStorage.setItem("telefone", data.telefone);
        localStorage.setItem("areaActividade", data.areaActividade || "");
        localStorage.setItem("local", data.local || "");
        localStorage.setItem("municipio", data.municipio || "");
      }

      router.push("/registo/validacao-identidade");
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

  async function submitForm(data: FormTypePessoal) {
    const parseddataNascimento = new Date(data.dataNascimento);
    const formatedData = {
      nomeCliente: data.nomeCliente,
      numeroBi: data.numeroBi,
      dataNascimento: parseddataNascimento,
      telefone: data.telefone,
    };

    APICall(formatedData);
  }

  async function submitForm2(data: FormTypeComercial) {
    const parseddataNascimento = new Date(data.dataNascimento);

    const formatedData = {
      nomeCliente: data.nomeCliente,
      numeroBi: data.numeroBi,
      dataNascimento: parseddataNascimento,
      telefone: data.telefone,
      areaActividade: data.areaActividade,
      local: data.local,
    };
    APICall(formatedData);
  }

  return tipoConta === "c1" ? (
    <form onSubmit={handleSubmit(submitForm)} className="login_form">
      <div className="header_form">
        <h1>Dados pessoais</h1>
        <p>
          Introduza os seus dados pessoais abaixo. Certifique-se de digitar as informações
          corretamente.
        </p>
      </div>
      <div className="body_form">
        <div className="input_field">
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            placeholder="Insira o seu nome completo"
            {...register("nomeCliente")}
          />
          {errors.nomeCliente && <InfoError message={errors.nomeCliente.message} />}
        </div>

        <div className="input_field">
          <label htmlFor="email">Data de nascimento</label>
          <input
            type="date"
            placeholder="Insira a sua data de nascimento "
            {...register("dataNascimento")}
          />
          {errors.dataNascimento && <InfoError message={errors.dataNascimento.message} />}
        </div>

        <div className="input_field">
          <label htmlFor="nomeCliente">Telefone</label>
          <input
            type="text"
            placeholder="Insira o seu número de telefone"
            {...register("telefone")}
          />
          {errors.nomeCliente && <InfoError message={errors.nomeCliente.message} />}
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

        <div className="input_field">
          <label htmlFor="name">Município</label>
          <input type="text" placeholder="Insira o nome do seu município" {...register("municipio")} />
          {errors.municipio && <InfoError message={errors.municipio.message} />}
        </div>

        <div className="input_field">
          <label htmlFor="name">Bairro</label>
          <input type="text" placeholder="Insira o nome do seu bairro" {...register("bairro")} />
          {errors.bairro && <InfoError message={errors.bairro.message} />}
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
  ) : (
    <form onSubmit={handleSubmit2(submitForm2)} className="login_form">
      <div className="header_form">
        <h1>Dados pessoais</h1>
        <p>
          Introduza os seus dados pessoais abaixo. Certifique-se de digitar as informações
          corretamente.{errors2.telefone && <h1>ola</h1>}
        </p>
      </div>
      <div className="body_form">
        <div className="input_field">
          <label htmlFor="name">Nome completo</label>
          <input
            type="text"
            placeholder="Insira o seu nome completo"
            {...register2("nomeCliente")}
          />
          {errors2.nomeCliente && <InfoError message={errors2.nomeCliente.message} />}
        </div>
        <div className="input_field">
          <label htmlFor="email">Data de nascimento</label>
          <input
            type="date"
            placeholder="Insira a sua data de nascimento "
            {...register2("dataNascimento")}
          />
          {errors2.dataNascimento && <InfoError message={errors2.dataNascimento.message} />}
        </div>
        <div className="input_field">
          <label htmlFor="bi_number">Número do BI</label>
          <input
            type="text"
            placeholder="Insira o número do BI"
            {...register2("numeroBi")}
            maxLength={14}
          />
          {errors2.numeroBi && <InfoError message={errors2.numeroBi.message} />}
        </div>

        <div className="input_field">
          <label htmlFor="name">Telefone</label>
          <input
            type="text"
            placeholder="Insira o seu número de telefone"
            {...register2("telefone")}
          />
          {errors2.telefone && <InfoError message={errors2.telefone.message} />}
        </div>
        <div className="input_field">
          <label htmlFor="bi_number">Área de atividade</label>
          <input
            type="text"
            placeholder="Insira a área de atividade do seu negócio"
            {...register2("areaActividade")}
          />
          {errors2.areaActividade && <InfoError message={errors2.areaActividade.message} />}
        </div>
        <div className="input_field">
          <label htmlFor="bi_number">Local do estabelecimento</label>
          <input
            type="text"
            placeholder="Insira o local do seu estabelecimento"
            {...register2("local")}
          />
          {errors2.local && <InfoError message={errors2.local.message} />}
        </div>
        <Button type="submit" disabled={isLoading} className="w-full">
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
