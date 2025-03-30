import { Input } from "@/components/ui/input";
import { ArrowRight, Check, ChevronsUpDown, Terminal } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Banknote, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import { DadosContaType } from "@/types/commons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { montantes } from "@/constants";
import useContaStore from "@/contexts/contaStore";
interface Props {
  dados: DadosContaType | undefined;
}

type TipoLevantamento = "mim" | "outro";

const FormSchema = z.object({
  emaildestino: z.string(),
  pin: z.string(),
  pin2: z.string(),
});

type FormType = z.infer<typeof FormSchema>;

export default function Levantamentos({ dados }: Props) {
  const [tipoLevantamento, setTipoLevantamento] = useState<TipoLevantamento>("mim");
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const useConta = useContaStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  //{ pin, valor,emaildestino,idconta}
  async function submitForm(data: FormType) {

    setIsLoading(true);
    try {
      let email:string|undefined ="";
      if(data.emaildestino==""){
        email = dados?.cliente.email;
      }else{
        email = data.emaildestino
      }

      const response = await api.post("/trasacao/levantamento", {
        idconta: Number(localStorage.getItem("idConta")),
        pin: data.pin,
        valor: Number(value.replace(" ","").replace("Kz","")),
        emaildestino: email,
      });

      useConta.setSaldo(Number(response.data.saldoactualizado))

      toast.success("Levantamento feito com sucesso",{
        action: {
          label: "Comprovativo",
          onClick: async () =>
            window.open(
              `http://localhost:5000/pdf/comprovativo/${response.data.idtransacao}`,
              "_blank"
            ),
        },
      });
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
    <div className="flex">
      <form className="max-w-[36rem]" onSubmit={handleSubmit(submitForm)}>
        <div>
          <h1 className="text-3xl text-gray-900">Levantamentos sem cartão</h1>
          <p className="font-medium text-gray-500 mt-2">
            Retire o seu dinheiro a qualquer momento.
          </p>
        </div>

        <div className="optionContainer mt-4">
          <div className="flex gap-1 items-center">
            <User className="text-gray-500" />
            <h2 className="text-[#2E90FA]">Quem vai levantar o dinheiro?</h2>
          </div>
          <div className="Options mt-2 flex p-1 gap-2">
            <div
              className={`ParaMim 
              hover:${tipoLevantamento == "outro" ? "" : "bg-gray-50"} border 
              w-72 h-16 rounded-md 
              flex items-center justify-center 
            ${tipoLevantamento == "mim" ? "border-[#2E90FA]" : ""}
            text-gray-700 cursor-pointer`}
              onClick={() => setTipoLevantamento("mim")}
            >
              Eu próprio
            </div>
            <div
              className={`
                hover:${tipoLevantamento == "mim" ? "" : "bg-gray-50"}
                w-72 h-16 rounded-md 
                flex items-center justify-center
              text-gray-700 border cursor-pointer
              ${tipoLevantamento == "outro" ? "border-[#2E90FA]" : ""}`}
              onClick={() => setTipoLevantamento("outro")}
            >
              Outra pessoa
            </div>
          </div>
        </div>
        <div className="mt-2">
          {tipoLevantamento == "outro" ? (
            <div>
              <label htmlFor="" className="text-gray-500 flex items-center">
                Endereço do email do beneficiário
              </label>
              <Input className="mt-2" placeholder="" {...register("emaildestino")} />
            </div>
          ) : (
            <div>
              <label htmlFor="" className="text-gray-500">
                Meu endereço de e-mail
              </label>
              <Input
                readOnly
                className="bg-gray-100 mt-2"
                placeholder={`${dados?.cliente.email} `}
              />
              {errors.emaildestino?.message}
            </div>
          )}
        </div>

        <div className="mt-6">
          <label htmlFor="" className="text-[#2E90FA] flex items-center gap-2">
            <Banknote className="text-gray-500" />
            Quanto dinheiro vai levantar?
          </label>
          {/* Inicio.. */}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="mt-2">
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-full justify-between ${
                  value ? "text-gray-900" : "text-gray-500"
                } text-[1rem]`}
              >
                {value
                  ? montantes.find((montante) => montante.name === value)?.name
                  : "Selecione o montante a levantar"}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
              <Command>
                <CommandList>
                  <CommandEmpty>No montante found.</CommandEmpty>
                  <CommandGroup>
                    {montantes.map((montante) => (
                      <CommandItem
                        key={montante.name}
                        value={montante.name}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        {montante.name}
                        <Check
                          className={cn(
                            "ml-auto",
                            value === montante.name ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {/* Fim Inicio... */}
        </div>

        <div className="mt-8">
          <label htmlFor="" className="text-[#2E90FA] flex items-center gap-2">
            <LockKeyhole className="text-gray-500" />
            Qual o seu código secreto?
          </label>
          <Alert className="mt-2 bg-gray-100">
            <Terminal className="h-4 w-4" />
            <AlertDescription>
              O código secreto será utilizado pelo destinatário para que possa realizar o
              levantamento
            </AlertDescription>
          </Alert>
          <Input
            className="mt-2"
            type="password"
            placeholder="***"
            {...register("pin")}
            maxLength={3}
          />
          {errors.pin?.message}
        </div>

        <div className="mt-4">
          <label htmlFor="" className="text-[#2E90FA] flex items-center gap-2">
            <LockKeyhole className="text-gray-500" />
            Repita o seu código secreto
          </label>
          <Input
            className="mt-2"
            type="password"
            placeholder="***"
            maxLength={3}
            {...register("pin2")}
          />
        </div>

        <button className="button_auth mt-8" type="submit">
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
              Continuar
              <ArrowRight style={{ width: "1.25rem", height: "1.25rem" }} />
            </>
          )}
        </button>
      </form>

      <div>
        <div className="UltimosPagamentos px-4 w-96">
          <div className="border rounded-md p-4 min-h-96">
            <h1>Levantamentos efectuados</h1>
            <Separator className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}
