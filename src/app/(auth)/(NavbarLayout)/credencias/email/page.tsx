
"use client";
import { AxiosError } from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import "@/styles/email_verification.css";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import InfoError from "@/components/InfoError";
import welcome from "@/assets/images/CredenciasEmail.png";
import "@/styles/email_campos.css";
import "@/styles/email.css";
import { TailSpin } from "react-loader-spinner";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import api from "@/utils/axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
//import { useUserStore } from "@/contexts/userStore";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatório!")
    .email("Email inválido! Corrija o email")
    .transform((email) => {
      return email.trim().toLowerCase();
    }),
});

type FormType = z.infer<typeof FormSchema>;

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [otp, setOtp] = useState("");
  //const { setEmail } = useUserStore();

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
      await api.post("/cliente/emailverifica", data);
      //setEmail(data.email);
      if (typeof window !== "undefined") {
        localStorage.setItem("email", data.email);
      }
      onOpen();
      //router.push("/registo/tipo-conta");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 400) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Sem conexão com o servidor")
        }
      }
    } finally {
      setIsLoading(false);
    }
  };
  const submitFormModal = async (OTP: string) => {
    setIsLoadingModal(true);
    try {
      console.log(OTP);
      await api.post("/cliente/verificacodigo", { codigo2fa: OTP });
      router.push("/credencias/dados");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data.message);
          return;
        } else {
          toast.error("Sem conexão com o servidor");
        }
      }
    } finally {
      setIsLoadingModal(false);
    }
  };


  function handleInput(otp: string) {
    setOtp(otp);
    if (otp.length == 6) {
      submitFormModal(otp)
      return;
    }
  }




  return (
    <div className="home_main">
      <div className="home_body">
        <div className="left">
          <Image src={welcome} alt="welcome" />
          <h1>Recupere a suas Credecias</h1>
          <p>Recupere as suas Credencias a qualquer momento</p>
        </div>
        <div className="right">
          <form onSubmit={handleSubmit(submitForm)} className="login_form" autoComplete="off">
            <div className="header_form">
              <h1>Recupere as sua Credencias</h1>
              <p>
                Lembrou das suas Credencias? <Link href={"/login"}>Fazer login</Link>
              </p>
            </div>
            <div className="body_form">
              <div className="input_field">
                <label id="LRE" htmlFor="email">
                  Endereço de email a associado a sua conta <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="Insira o seu endereço de email "
                  {...register("email")}
                />
                {errors.email && <InfoError message={errors.email.message} />}
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
                    Continuar <FaArrowRightLong style={{ marginLeft: "10px" }} />
                  </>
                )}
              </button>
              <div className="terms">
                <p>
                  <Link href="/privacy-policies">Políticas de Privacidade e Termos de Uso</Link>.
                </p>
              </div>
            </div>
          </form>
          <p className="basic_text not_found_footer">© 2025 Banco de Poupança Angolano</p>
        </div>
      </div>

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
                  <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} className="w-[90%] flex gap-1 justify-center text-center"
                    value={otp}
                    onChange={(otp) => handleInput(otp)}>
                    <InputOTPGroup className="flex gap-2 ">
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  <button
                    type="button"
                    disabled={isLoadingModal}
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
                      <Link href={'/credencias/pergunta'}>Tentar outra forma</Link>
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
    </div>
  );
}
