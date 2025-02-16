"use client";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button as Btn,
  useDisclosure,
} from "@heroui/react";

import { InputOtp } from "@heroui/react";
import { useRouter } from "next/navigation";


const verifyEmailSchema = z.object({
  email: z.string(),
});

type verifyEmailSchema = z.infer<typeof verifyEmailSchema>;

const NovaAdesaoPage = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = useState("");

  const { register, handleSubmit } = useForm<verifyEmailSchema>({
    resolver: zodResolver(verifyEmailSchema),
  });

  function handleVerifyEmail() {
    onOpen();
  }

  

  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(handleVerifyEmail)} className="flex flex-col gap-3">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <h1 className="text-2xl font-medium">Email</h1>
          <Image src="/icons/email.png" alt="" width={30} height={10} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm">
            Bem-vindo ao nosso Internet Banking! Vamos configurar sua conta em poucos passos
          </p>
          <p className="text-sm">
            Para começar sua adesão, informe o e-mail vinculado à sua conta BPA
          </p>
        </div>

        <Input {...register("email")} />

        <Button type="submit">Continuar</Button>
        <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Digite o código de verificação
                </ModalHeader>
                <ModalBody>
                  <p>
                    Enviamos um código de verificação para seu e-mail. Digite-o abaixo para
                    continuar.
                  </p>
                  <div className="flex gap-10 justify-center ">
                    <InputOtp length={4} value={value} onValueChange={setValue} 
                    size="lg" variant="faded" color="primary"/>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Btn color="danger" variant="light" onPress={onClose}>
                    Cancelar
                  </Btn>
                  <Button color="primary" onClick={()=>router.replace('/adesao-dados')}>
                    Avançar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </form>
  );
};

export default NovaAdesaoPage;
