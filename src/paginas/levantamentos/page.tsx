import { Input } from "@/components/ui/input";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Banknote, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import { DadosContaType } from "@/types/commons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { TailSpin } from "react-loader-spinner";
import api from "@/utils/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { Command, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { montantes } from "@/constants";
import useContaStore from "@/contexts/contaStore";

//Modals
import { useDisclosure } from "@nextui-org/react";

import "@/styles/levantamento.css";
import ConfirmacaoModal from "@/components/modals/ConfirmacaoModal";
import ValidacaoModal from "@/components/modals/ValidacaoModal";
interface Props {
  dados: DadosContaType | undefined;
}

type TipoLevantamento = "mim" | "outro";

const FormSchema = z
  .object({
    emaildestino: z.string().nonempty("Deve preencher este campo").email("Digite um email válido"),
    pin: z.string().min(3, "Seu código deve ter 3 caracteres"),
    pin2: z.string(),
    valor: z.number().min(200, "Selecione um montante"),
  })
  .refine((data) => data.pin === data.pin2, {
    message: "Os códigos não coincidem",
    path: ["pin2"],
  });

type FormType = z.infer<typeof FormSchema>;

export default function Levantamentos({ dados }: Props) {
  const [tipoLevantamento, setTipoLevantamento] = useState<TipoLevantamento>("mim");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const [otp, setOtp] = useState("");
  const [dadosForm, setDadosForm] = useState<FormType>();
  const [nomeBeneficiario, setNomeBeneficiario] = useState("");
  const [open, setOpen] = useState(false);
  //const [ultimosLevantamentos, setUltimosLevantamentos] = useState([])
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const useConta = useContaStore();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      emaildestino: String(dados?.cliente.email),
    },
  });

  //{ pin, valor,emaildestino,idconta}
  async function confirmaLevantamento(data: FormType) {
    setDadosForm(data);
    try {
      const response = await api.post("/trasacao/beneficiariolevantamento", {
        emaildestino: data.emaildestino,
      });

      setNomeBeneficiario(response.data.nome);
    } catch {
      setNomeBeneficiario(data.emaildestino);
    } finally {
      onOpen();
    }
  }

  async function submitForm(otp: string) {
    setIsLoading(true);
    try {
      if (otp.length < 6) return;
      const dataset = {
        idconta: Number(localStorage.getItem("idConta")),
        ...dadosForm,
      };
      const response = await api.post("/trasacao/levantamento", dataset);

      useConta.setSaldo(Number(response.data.saldoactualizado));

      toast.success("Levantamento feito com sucesso", {
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

  function altereTipoLevantamento(tipo: string): void {
    if (tipo == "mim") {
      setTipoLevantamento("mim");
      setValue("emaildestino", String(dados?.cliente.email));
    } else {
      setValue("emaildestino", "");
      setTipoLevantamento("outro");
    }
  }

  return (
    <div>
      <div className="levantamento-container">
        <form
          className="levantamento-form"
          onSubmit={handleSubmit(confirmaLevantamento)}
          autoComplete="off"
        >
          <div className="levantamento-header">
            <h1>Levantamentos sem cartão</h1>
            <p>Retire o seu dinheiro a qualquer momento.</p>
          </div>
          <div className="levantamento-opcoes">
            <div className="opcao-container">
              <User className="text-gray-500" />
              <h2>Quem vai levantar o dinheiro?</h2>
            </div>
            <div className="opcoes">
              <div
                className={`opcao ${tipoLevantamento == "mim" ? "selecionada" : ""}`}
                onClick={() => altereTipoLevantamento("mim")}
              >
                Eu próprio
              </div>
              <div
                className={`opcao ${tipoLevantamento == "outro" ? "selecionada" : ""}`}
                onClick={() => altereTipoLevantamento("outro")}
              >
                Outra pessoa
              </div>
            </div>
          </div>
          <div className="email-container">
            {tipoLevantamento == "outro" ? (
              <div>
                <label htmlFor="">Endereço do email do beneficiário</label>
                <Input className="email-input" {...register("emaildestino")} />
                {errors.emaildestino && (
                  <p className="text-red-500 text-sm">{errors.emaildestino.message}</p>
                )}
              </div>
            ) : (
              <div>
                <label>Meu endereço de e-mail</label>
                <Input readOnly className="email-input" placeholder={`${dados?.cliente.email} `} />
              </div>
            )}
          </div>
          <div className="montante-container">
            <label htmlFor="">
              <Banknote className="text-gray-500" />
              Quanto dinheiro vai levantar?
            </label>
            {/* Inicio.. */}
            <Controller
              control={control}
              name="valor"
              rules={{ required: "Selecione um montante" }}
              defaultValue={0}
              render={({ field }) => {
                const selected = montantes.find((montante) => montante.value === field.value);
                return (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="montante-button"
                      >
                        {selected ? selected.name : "Selecione um montante"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandEmpty>Nenhum montante encontrado.</CommandEmpty>
                        <CommandGroup>
                          {montantes.map((montante) => (
                            <CommandItem
                              key={montante.value}
                              onSelect={() => {
                                field.onChange(montante.value);
                                setOpen(false);
                              }}
                              className="cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  montante.value === field.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {montante.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
            {errors.valor && <p className="text-red-500 text-sm">{errors.valor.message}</p>}
            {/* Fim Inicio... */}
          </div>
          <div className="codigo-container">
            <label htmlFor="">
              <LockKeyhole className="text-gray-500" />
              Qual o seu código secreto?
            </label>
            <Alert className="alerta-codigo">
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
            {errors.pin && <p className="text-red-500 text-sm mt-1">{errors.pin.message}</p>}
          </div>
          <div className="codigo-container">
            <label htmlFor="">
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
            {errors.pin2 && <p className="text-red-500 text-sm mt-1">{errors.pin2.message}</p>}
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
            <div className="pagamentos-container">
              <h1>Levantamentos efectuados</h1>
              <Separator className="mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}

      <ConfirmacaoModal
        isOpen={isOpen}
        onClose={onClose}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        onOpen2={onOpen2}
        title="Confirme os dados do Levantamento sem cartão"
        dados={[
          { key: "Beneficiário", value: `${nomeBeneficiario}` },
          { key: "Email", value: `${dadosForm?.emaildestino}` },
          { key: "Montante", value: `${dadosForm?.valor},00 Kz` },
          { key: "Código", value: `${dadosForm?.pin}` },
        ]}
      />

      <ValidacaoModal
        isOpen={isOpen2}
        onClose={onClose2}
        otp={otp}
        setOtp={setOtp}
        isLoading={isLoading}
        handleFunction={submitForm}
      />
    </div>
  );
}
