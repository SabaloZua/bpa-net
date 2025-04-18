
"use client";

import Link from "next/link";
import styles from "@/styles/aderir_login.module.css";
import "@/styles/email_verification.css";
import { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from "lucide-react";
import { Eye, EyeClosed } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import FingerprintJS from "@fingerprintjs/fingerprintjs"; // lib que cria um id unico do navegador/dispositivo do usuario
import Browser from "bowser";
import api from "@/utils/axios";
import { TailSpin } from "react-loader-spinner";
import { useState, useEffect } from "react";
import InfoError from "./InfoError";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import useContaStore from "@/contexts/contaStore";

const FormSchema = z.object({
  numeroAdesao: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(1, "O campo não pode estar vazio!"),

  codigoAcesso: z
    .string({ required_error: "O campo não pode estar vazio!" })
    .min(1, "O campo não pode estar vazio!"),
});

type FormType = z.infer<typeof FormSchema>;

export default function AuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const useConta = useContaStore();
  const [otp, setOtp] = useState("");
  const [id, setid] = useState<string>();
  const [navegador, setnavegador] = useState<string>();
  const [sistemaoperativo, setsistemaoperativo] = useState<string>();

  const [mostrarSenha, setMostrarSenha] = useState(true);
  const mudarIcon = mostrarSenha === true ? false : true;

  useEffect(() => {
    // função que coleta os dados do usuario
    const collectFingerprint = async () => {
      const fp = await FingerprintJS.load();
      // result recebe os dados coletados  do dispositivo/usuario
      const result = await fp.get();
      // pegando o Id unico
      setid(result.visitorId);
      console.log(result.visitorId)

      const browserInfo = Browser.getParser(navigator.userAgent);
      // getBrowserName retorna o nome do navegador do usuario
      setnavegador(browserInfo.getBrowserName());
      console.log(browserInfo.getBrowserName());
      //// getOS retorna o nome do sistema operativo  do usuario
      setsistemaoperativo(browserInfo.getOS().name);
    };

    //chamada da função
    collectFingerprint();
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>({
    resolver: zodResolver(FormSchema),
  });

  function handleInput(otp:string){
    setOtp(otp);
    if(otp.length == 6){
      submitFormModal(otp)
      return;
    }
  }

  const submitForm = async (data: FormType) => {
    setIsLoading(true);
    try {
      await api.post("/login/generate2fa", {
        numeroAdesao:data.numeroAdesao.trim(),
        codigoAcesso:data.codigoAcesso.trim()
      });
      onOpen();
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
  };

  const submitFormModal = async (OTP: string) => {

    if(OTP.length < 6){
      toast.error("Digite o código correctamente");
      return;
    }
    setIsLoadingModal(true);
    try {
      console.log(OTP);

   const result=await signIn("credentials", {
        codigo2fa: OTP,
        iddispositivo: id,
        sistemadispositivo: sistemaoperativo,
        navegadordispositivo: navegador,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return;
      }

      const response = await api.get(`/login/verificalogin/${OTP}`);
      useConta.setId(Number(response.data.contaid));
      localStorage.setItem("idConta", response.data.contaid);
      if (response.data.primeirologin == true) {
        router.push("/primeiroLogin");
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Sem conexão com o servidor");
        }
      }
    } finally {
      setIsLoadingModal(false);
    }
  };

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-6">
        {/* <div className=" flex mb-3 items-center gap-2 justify-center">
          <Image src={`/icons/logo_favicon.svg`} width={36} height={36} alt="BPA Logo" />
          <h1 className="text-30 font-ibm-plex-serif font-bold text-black-1">
            BPA <span className="text-sm">NET</span>
          </h1>
        </div> */}

        <div className={` flex cursor-pointer items-center gap-1 justify-center`}>
          <Image
            src={`/icons/logo_favicon.svg`}
            width={10}
            height={10}
            alt="Logo horizontal"
            className="size-[20px]  md:size-[36px] max-md:size-8"
          />

          <h1 className="text-30 font-ibm-plex-serif font-bold text-black-1">BPA</h1>
        </div>

        <div className="flex flex-col gap-1 md:gap-3 text-center">
          <h1 className={`${styles.titulo} font-semibold text-gray-600`}>
            Entre no BPA Net
            {/* <p className={`${styles.subtitulo} font-normal text-gray-600 mt-[9px]`}>
              Ainda não tem uma conta?{" "}
              <Link href={"/aderir"} className={`${styles.corlink} underline cursor-pointer`}>
                Criar conta
              </Link>
            </p> */}
          </h1>
        </div>
      </header>

      <form className="space-y-4" onSubmit={handleSubmit(submitForm)} autoComplete="off">
        <div className="form-item text-gray-700 focus-within:text-bankGradient">
          <label
            className={`${styles.lableinputs} text-[#565656] w-full max-w-[280px] font-medium `}
          >
            Número de Adesão
          </label>

          <div className=" w-full items-center relative">
            <Input
              placeholder="Insira o seu número de adesão"
              className={`input-class `}
              type="text"
              maxLength={40}
              {...register("numeroAdesao")}
            />
          </div>
          {errors.numeroAdesao && <InfoError message={errors.numeroAdesao.message} />}
        </div>

        <div className="form-item text-gray-700 focus-within:text-bankGradient">
          <label
            className={`${styles.lableinputs} text-[#565656] w-full max-w-[280px] font-medium `}
          >
            Código de Acesso
          </label>

          <div className=" w-full items-center relative">
            <Input
              placeholder="Insira o seu código de acesso"
              className={`input-class`}
              type={`${mostrarSenha ? "password" : "text"}`}
              maxLength={20}
              {...register("codigoAcesso")}
            />

            <span
              className="text-gray-400 absolute left-[90%] top-3 "
              onClick={() => {
                setMostrarSenha(mudarIcon);
              }}
            >
              {mudarIcon ? <EyeClosed /> : <Eye />}
            </span>
          </div>
          {errors.codigoAcesso && <InfoError message={errors.codigoAcesso.message} />}
        </div>
        <Link className={`${styles.lableinputs} text-[#63B5E7] w-full flex justify-end`} href={"/credencias/email"}>Recuperar Credencias</Link>

        <button className={`button_auth`} type="submit" disabled={isLoading}>
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
              Entrar <ArrowRight strokeWidth={3} size={16} className="relative top-[1px]" />
            </>
          )}
        </button>
      </form>

      <Link href={"/aderir"} className={`${styles.aderirCard} bg-gray-200`}>
        <div className={`${styles.textoCard}`}>
          <span className={`${styles.tituloCard}`}>Ainda não aderiu ao BPA NET?</span>
          <span className={`${styles.mesagemcard}`}>
            Com o BPA NET poderá realizar todas as suas operações em qualquer lugar.
          </span>
        </div>
        <ArrowRight strokeWidth={2} size={20} className="" />
      </Link>

      <Modal
        isOpen={isOpen}
        size={"lg"}
        onClose={onClose}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        backdrop="blur"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Código de verificação</ModalHeader>
              <ModalBody>
                <p>
                  Foi enviado um código de verificação para o seu e-mail, por favor Insira-o para
                  poder continuar
                </p>
                <div className="body_form">
                  <div className="w-full overflow-x-hidden">
                    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} className="w-[100%] flex gap-1 justify-center text-center"
                    value={otp}
                    onChange={(otp) => handleInput(otp)}
                    style={{}}>
                      <InputOTPGroup className="flex gap-2 ">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  <button
                    type="button"
                    disabled={isLoadingModal}
                    className="button_auth"
                    onClick={()=>submitFormModal(otp)}
                  >
                    {isLoadingModal ? (
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
                        Entrar <FaArrowRightLong style={{ marginLeft: "10px" }} />
                      </>
                    )}
                  </button>
                  <div className="terms">
                    {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                    <p
                      style={{
                        color: "var(--color-focus)",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Reenviar código
                    </p>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
