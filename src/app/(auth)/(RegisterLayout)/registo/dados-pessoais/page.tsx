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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { provincias } from "@/constants";

const FormSchema = z.object({
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

  /*provincia: z.string({
    required_error: "A sua província é obrigatória!",
  }),

  municipio: z.string({
    required_error: "A seu município é obrigatório!",
  })*/
});

type FormType = z.infer<typeof FormSchema>;

export default function PersonalData() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const useStepsRegisto = useStepperRegistoStore();

  useEffect(() => {
    useStepsRegisto.setCurrentStepRegisto(1);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
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
        localStorage.setItem("provincia", data.provincia || "");
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

  async function submitForm(data: FormType) {
    const parseddataNascimento = new Date(data.dataNascimento);
    const formatedData = {
      nomeCliente: data.nomeCliente,
      numeroBi: data.numeroBi,
      dataNascimento: parseddataNascimento,
      telefone: data.telefone,
      provincia: value,
      municipio: value2,
    };

    APICall(formatedData);
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
            maxLength={9}
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

        <fieldset id="morada" name="morada_field" className="border p-1 px-2 rounded mb-4">
          <legend>Morada</legend>
          <div className="input_field">
            {/*
            <input type="text" placeholder="Seleccione a sua província" {...register("provincia")} /> */}
            <label htmlFor="name">Província</label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={`w-full justify-between ${
                    value ? "text-gray-900" : "text-gray-500"
                  } text-[1rem]`}
                >
                  {value
                    ? provincias.find((provincia) => provincia.nome === value)?.nome
                    : "Selecione a sua província"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Pesquisar Província" className="h-9" />
                  <CommandList>
                    <CommandEmpty>No provincia found.</CommandEmpty>
                    <CommandGroup>
                      {provincias.map((provincia) => (
                        <CommandItem
                          key={provincia.nome}
                          value={provincia.nome}
                          onSelect={(currentValue) => {
                            setValue(currentValue === value ? "" : currentValue);
                            setOpen(false);
                          }}
                        >
                          {provincia.nome}
                          <Check
                            className={cn(
                              "ml-auto",
                              value === provincia.nome ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* {errors.provincia && <InfoError message={errors.provincia.message} />} */}
          </div>
          <div className="input_field">
            <label htmlFor="name">Município</label>
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open2}
                  className={`w-full justify-between ${
                    value2 ? "text-gray-900" : "text-gray-500"
                  } text-[1rem]`}
                >
                  {value2
                    ? provincias
                        .find((provincia) => provincia.nome === value)
                        ?.municipios.find((municipio) => municipio === value2)
                    : "Selecione o seu município"}
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[400px] p-0">
                <Command>
                  <CommandInput placeholder="Pesquisar município" className="h-9" />
                  <CommandList>
                    <CommandEmpty>Nenhum município encontrado</CommandEmpty>
                    <CommandGroup>
                      {provincias
                        .find((provincia) => provincia.nome === value)
                        ?.municipios.map((municipio) => (
                          <CommandItem
                            key={municipio}
                            value={municipio}
                            onSelect={(currentValue) => {
                              setValue2(currentValue === value2 ? "" : currentValue);
                              setOpen2(false);
                            }}
                          >
                            {municipio}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === municipio ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {/* {errors.municipio && <InfoError message={errors.municipio.message} />} */}
          </div>
        </fieldset>

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
