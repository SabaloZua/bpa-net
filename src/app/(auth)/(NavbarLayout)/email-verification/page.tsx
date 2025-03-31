"use client";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import verification from "@/assets/images/email-verification.svg";
import "@/styles/email_campos.css";
import "@/styles/email.css";
import { TailSpin } from "react-loader-spinner";
import api from "@/utils/axios";
import { useUserStore } from "@/contexts/userStore";
import { useRouter } from "next/navigation";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const useStore = useUserStore();
  const router = useRouter();

  let email = "";
  if (typeof window !== "undefined") {
    email = localStorage.getItem("email") ?? useStore.email;
  }

  async function APICall() {
    setLoading(true);
    try {
      const response = await api.get(`/openaccount/emailvalidete/${email}`);
      if (response.status === 201) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch {
      toast.error("Sem conexão com o servidor");
      setLoading(false);
    }
  }

  async function resendEmail() {
    APICall();
  }

  return (
    <div className="home_main">
      <div className="home_body">
        <div className="left">
          <Image src={verification} alt="Email Verification" />
          <h1>Verifique a sua caixa de entrada</h1>
          <p>Foi enviado um email para o seu endereço, acesse e verifique o seu email.</p>
        </div>
        <div className="right">
          <form className="login_form">
            <div className="header_form">
              <h1>Verifique a sua caixa de entrada</h1>
              <p>
                Foi enviado um email para o seu endereço, acesse e verifique o seu email.{" "}
                <Link
                  onMouseDown={(event) => {
                    event.preventDefault();
                    router.back();
                  }}
                  href={""}
                >
                  Corrigir email
                </Link>
              </p>
            </div>
            <div className="body_form">
              <button
                type="button"
                onClick={resendEmail}
                disabled={loading}
                className="button_auth"
              >
                {loading ? (
                  <TailSpin
                    height="25"
                    width="25"
                    color="#fff"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    visible={true}
                  />
                ) : (
                  "Reenviar email"
                )}
              </button>
              <div className="terms">
                <p>Verifique o seu correio eletrônico.</p>
              </div>
            </div>
          </form>
          <p className="basic_text not_found_footer">© 2025 Banco de Poupança Angolano</p>
        </div>
      </div>
    </div>
  );
}
