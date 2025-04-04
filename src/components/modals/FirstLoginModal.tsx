"use client"

import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/react";

interface IProps {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    isOpen: boolean;
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  onOpenChange: () => void;
}

export default function FirstLoginModal({ isOpen, onOpenChange }: IProps) {
    return (
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            motionProps={{
                variants: {
                    enter: {
                        y: 0,
                        opacity: 1,
                        transition: {
                            duration: 0.2, // Reduzir a duração da transição
                            ease: "easeOut",
                        },
                    },
                    exit: {
                        y: -10, // Reduzir a distância de deslocamento
                        opacity: 0.5, // Reduzir a opacidade durante a saída
                        transition: {
                            duration: 0.2, // Reduzir a duração da transição
                            ease: "easeIn",
                        },
                    },
                },
            }}
            size="lg"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                          Configure suas credenciais
                        </ModalHeader>
                        <ModalBody>
                             
                            <ul style={{ listStyleType: "none" }}>
                                <li>
                                    <p>
                                        1-Para sua segurança, crie uma senha forte e uma pergunta personalizada
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        
                                            2- Lembre-se de guardar sua pergunta e resposta de segurança. Elas serão necessárias caso precise recuperar seu acesso.
                                        
                                    </p>
                                </li>
                                
                                
                            </ul>
                        </ModalBody>
                        <ModalFooter>

                            <Button
                                color="success"
                                radius="sm"
                                variant="flat"
                                onPress={onClose}
                            >
                                Continuar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
