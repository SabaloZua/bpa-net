import api from "@/utils/axios";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { AxiosError } from "axios";
import { FormEvent } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import { toast } from "sonner";

type Dados = {
  key: string;
  value: string;
};

interface Props {
  isOpen: boolean;
  isLoading: boolean;
  setIsLoading: (isLoading:boolean)=>void;
  onOpen2:()=>void;
  onClose: () => void;
  title: string;
  dados: Dados[];
}

export default function ConfirmacaoModal({ isOpen, onClose, isLoading, setIsLoading, onOpen2, dados, title }: Props) {
  async function enviarCodigoOTP(e: FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const dataset = {
        idconta: Number(localStorage.getItem("idConta")),
        
      };

      const url = "/trasacao/codigo";
      await api.post(url, dataset);
      onClose();
      onOpen2();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Sem conexão com o servidor" + error);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      size={"lg"}
      onClose={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              {/* Confirme os dados da transferência */}
              {title}
            </ModalHeader>
            <ModalBody>
              <form onSubmit={enviarCodigoOTP}>
                <div className="flex flex-col gap-3 justify-center items-center my-3">
                
                    {
                        dados.map((dado) => (
                            <p key={dado.key}>{dado.key}: {dado.value} </p>
                        ) )
                    }
                  
                  {/* <p>Beneficiário: {beneficiario}</p>
                  <p>Montante: {formataSaldo(montante)},00 kz </p> */}
                </div>
                <div className="body_form">
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
                        Confirmar <FaArrowRightLong style={{ marginLeft: "10px" }} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
