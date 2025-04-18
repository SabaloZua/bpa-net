import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

//Modals
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { TailSpin } from "react-loader-spinner";
import { FaArrowRightLong } from "react-icons/fa6";

interface Props {
  isOpen: boolean;
  otp: string;
  setOtp: (otp:string) => void;
  isLoading: boolean;
  onClose: () => void;
  handleFunction: (otp:string) => void;
}

export default function ValidacaoModal({ isOpen, onClose, otp, isLoading, setOtp, handleFunction }: Props) {
  function handleInput(otp: string) {
    setOtp(otp);
    if (otp.length == 6) {
      handleFunction(otp);
      return;
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      size={"lg"}
      onClose={onClose}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      placement="center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Validação de identidade
            </ModalHeader>
            <ModalBody>
              <form>
                <div className="flex flex-col gap-3 justify-center items-center my-3">
                  <p>Digite o código enviado na sua caixa de entrada para validar a operação</p>
                </div>
                <div className="w-full overflow-x-hidden">
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    className="w-[90%] flex gap-1 justify-center text-center"
                    value={otp}
                    onChange={(otp) => handleInput(otp)}
                  >
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
                <div className="body_form">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="button_auth"
                    onClick={() => handleFunction(otp)}
                  >
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
