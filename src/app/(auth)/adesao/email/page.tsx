"use client";

import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

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
import { ArrowRight, Mail } from "lucide-react";

const verifyEmailSchema = z.object({
  email: z.string(),
});

type verifyEmailSchema = z.infer<typeof verifyEmailSchema>;

const NovaAdesaoPag = () => {
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
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Email</h2>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600">
          Bem-vindo ao nosso Internet Banking! Vamos configurar sua conta em poucos passos
        </p>
        <p className="text-sm text-gray-900">
          Para começar sua adesão, informe o e-mail vinculado à sua conta BPA
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Input {...register("email")} />
        </div>
      </div>

      <Button type="submit">
        Continuar
        <ArrowRight style={{ width: "1.25rem", height: "1.25rem" }} />
      </Button>
      <Modal isOpen={isOpen} placement="center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Digite o código de verificação
              </ModalHeader>
              <ModalBody>
                <p>
                  Enviamos um código de verificação para seu e-mail. Digite-o abaixo para continuar.
                </p>
                <div className="flex gap-10 justify-center ">
                  <InputOtp
                    length={4}
                    value={value}
                    onValueChange={setValue}
                    size="lg"
                    variant="faded"
                    color="primary"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Btn color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Btn>
                <Button color="primary" onClick={() => router.replace("/adesao/dados")}>
                  Avançar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </form>
  );
};

{
  /* <div>
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Mail className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold">Email</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Bem-vindo ao nosso Internet Banking! Vamos configurar sua conta em poucos passos
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Para começar sua adesão, informe o e-mail vinculado à sua conta BPA
          </label>
          <input
            type="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Seu email"
          />
        </div>
      </div>
    </div> */
}

export default NovaAdesaoPag;
