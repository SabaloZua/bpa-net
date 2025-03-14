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
import { useState, useRef, useEffect } from "react";
import InfoError from "./InfoError";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [currentInput, setCurrentInput] = useState(0);
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

      const browserInfo = Browser.getParser(navigator.userAgent);
      // getBrowserName retorna o nome do navegador do usuario
      setnavegador(browserInfo.getBrowserName());
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

  const submitForm = async (data: FormType) => {
    setIsLoading(true);
    try {
      await api.post("/login/generate2fa", data);
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
    setIsLoadingModal(true);
    try {

      await signIn('credentials',{
        codigo2fa: OTP,
        iddispositivo:  id,
        sistemadispositivo: sistemaoperativo, 
        navegadordispositivo: navegador,
        redirect:false
      })

        const response=await api.get(`/login/verificalogin/${OTP}`)
        if(response.data.primeirologin == true){
          router.replace('/primeiroLogin')
        }else{
          router.replace("/inicio");
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

  const focusNextInput = () => {
    const nextInput = inputRefs.current[currentInput + 1];
    if (nextInput) {
      nextInput.focus();
    }
  };

  const focusPreviousInput = () => {
    const previousInput = inputRefs.current[currentInput - 1];
    if (previousInput) {
      previousInput.focus();
    }
  };

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setCurrentInput((prev) => prev + 1);
      focusNextInput();
    } else {
      setCurrentInput((prev) => prev - 1);
      focusPreviousInput();
    }

    // Verifica se todos os campos estão preenchidos
    if (currentInput === 5) {
      const values = inputRefs.current.map((ref) => ref?.value || "").join("");
      submitFormModal(values);
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

      <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
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
              type="password"
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
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Código de verificação</ModalHeader>
              <ModalBody>
                <p>
                  Foi enviado um código de verificação para o seu e-mail, por favor Inisa-o para
                  poder continuar
                </p>
                <div className="body_form">
                  {
                    <div className="fragments_container">
                      {[1, 2, 3, 4, 5, 6].map((index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          id={`value${index}`}
                          className="phone_fragment"
                          ref={(el) => {
                            if (el) {
                              inputRefs.current[index - 1] = el;
                            }
                          }}
                          onChange={(e) => handleInputChange(index - 1, e)}
                        />
                      ))}
                    </div>
                  }

                  <button
                    type="button"
                    disabled={isLoadingModal || currentInput !== 6}
                    className="button_auth"
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
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
