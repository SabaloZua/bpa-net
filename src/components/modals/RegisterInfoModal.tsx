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

export default function RegisterInfoModal({ isOpen, onOpenChange }: IProps) {
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
							Não prossiga antes de ler!
						</ModalHeader>
						<ModalBody>
							<p>
								Para criar sua conta com segurança e facilidade, siga estas
								orientações adicionais:
							</p>
							<ul style={{ listStyleType: "none" }}>
								<li>
									<p>
										<strong>1- Tenha seu bilhete de identidade em mãos.</strong>
									</p>
								</li>
								<li>
									<p>
										<strong>
											2- Esteja preparado para fornecer fotografias nítidas e
											claras.
										</strong>
									</p>
								</li>
								<li>
									<strong>
										<p>
											3- Ao cancelar o processo, será necessário reiniciá-lo.
										</p>
									</strong>
								</li>
							</ul>
							<p>
								Por favor, esteja ciente de que, para garantir a segurança de
								sua conta,{" "}
								<strong>
									todas as informações fornecidas devem ser claras, válidas e
									legíveis
								</strong>
								. Caso contrário, a conta não poderá ser criada. Agradecemos sua
								colaboração e compreensão!
							</p>
						</ModalBody>
						<ModalFooter>

							<Button
								color="success"
								radius="sm"
								variant="flat"
								onPress={onClose}
							>
								Aceitar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
