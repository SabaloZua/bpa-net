/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { useStepperRegistoStore } from "@/contexts/stepsStore";
import "@/styles/credentials.css";
import picture from "@/assets/images/Certification-bro.svg";
import { AxiosError } from "axios";
import api from "@/utils/axios";
import { TailSpin } from "react-loader-spinner";
import FingerprintJS from "@fingerprintjs/fingerprintjs"; // lib que cria um id unico do navegador/dispositivo do usuario
import Browser from "bowser";

export default function RegisterCredentials() {
  const router = useRouter();
  const stepsStore = useStepperRegistoStore();

  const [id, setid] = useState<string>();
  const [navegador, setnavegador] = useState<string>();
  const [sistemaoperativo, setsistemaoperativo] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    stepsStore.setCurrentStepRegisto(4);
  }, []);

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

  async function formSubmit() {
    /*if (validateForm()) {
				await validateFaces();
			} else {
			}*/

    setIsLoading(true);
    try {
      if (typeof window !== "undefined") {
        const NumberOfTipoConta = localStorage.getItem("tipoConta") == "c1" ? 1 : 2;

        const dados = {
          nomeCliente: localStorage.getItem("nomeCliente") || "",
          emailCliente: localStorage.getItem("email") || "",
          dataNascimento: localStorage.getItem("dataNascimento") || "",
          numeroBi: localStorage.getItem("numeroBi") || "",
          telefone: localStorage.getItem("telefone") || "",
          municipio: localStorage.getItem("municipio") || "",
          areaActividade: localStorage.getItem("areaActividade") || "",
          local: localStorage.getItem("local") || "",
          idTipoConta: NumberOfTipoConta,
          navegador: navegador,
          sistemaoperativo: sistemaoperativo,
          iddispositivo: id,
        };

        await api.post(`/openacount/`, dados);
      }

      router.push("/login");
      toast.success("Cliente criado com sucesso!!!");
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
    router.push("/credenciais");
  }

  function submitForm() {
    formSubmit();
  }

  return (
    <form className="login_form">
      <div className="header_form">
        <h1>Credenciais</h1>
        <p>Obrigado por aguardar, estamos finalizando o processo.</p>
      </div>
      <div className="body_form">
        <div className="container_body">
          <Image src={picture} alt="" />
          <h1>Finalizando! </h1>
          <p>
            Estamos gerando as suas credenciais de acesso ao BFA NET. As credenciais serão enviadas
            para o seu email, posteriormente poderá alterá-las.
          </p>
        </div>
        <button type="button" onClick={submitForm} disabled={isLoading} className="button_auth">
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
            "Obter credenciais"
          )}
        </button>
      </div>
    </form>
  );
}
