"use client";

import "@/styles/pay-types.css";
import { useEffect, useState } from "react";
import { useDisclosure } from "@nextui-org/react";
import ServicesList from "../lists/servicesList";
import useContaStore from "@/contexts/contaStore";
import api from "@/utils/axios";
import { EntidadeType } from "@/types/commons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { produtos, subProdutos } from "@/constants";
import { cn } from "@/lib/utils";
import { formatarKz } from "@/constants/modules";

export default function PayServices() {
  const [entidade, setEntidade] = useState<EntidadeType>();
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [subProdutoSelecionado, setSubProdutoSelecionado] = useState("");
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const useAccount = useContaStore();


  useEffect(() => {
    const btns = document.querySelectorAll(".btnService") as NodeListOf<HTMLLIElement>;
	console.log(btns)
    function setActive(btn: HTMLLIElement) {
      // biome-ignore lint/complexity/noForEach: <explanation>
      btns.forEach((btn) => {
        btn.dataset.active = "false";
		btn.style.backgroundColor ="#fff"
      });
      btn.dataset.active = "true";
	  btn.style.backgroundColor ="#D6E9FF";
    }

    // biome-ignore lint/complexity/noForEach: <explanation>
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        setActive(btn);
      });
    });
  }, []);

  return (
    <div className="pt1_container">
      <div className="top">
        <h1>Pagamentos de serviços</h1>
        <div className="separator" />
      </div>
      <div className="bottom">
        <div className="left">
          <p onClick={() => onOpen()}>Selecione o serviço</p>
          <ul className="services">
            <ServicesList setEntidade={setEntidade} />
          </ul>
        </div>
        <div className="wallet rigth">
          {entidade?.id === 0 ? (
            <>Selecione o serviço</>
          ) : (
            <>
              <form
                style={{ width: "100%" }}
                onSubmit={async (event) => {
                  event.preventDefault();
                  onOpen();
                }}
              >
                <div className="input_field">
                  <label htmlFor="email" className="font-semibold">Conta emissora</label>
                  <input type="text" disabled value={useAccount.numeroConta.replaceAll(".", " ")} />
                </div>

                <div className="input_field">
                  <label htmlFor="email" className="font-semibold">Produto</label>
                  <Popover open={open1} onOpenChange={setOpen1}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open1}
                        className={`w-full justify-between ${
                          produtoSelecionado ? "text-gray-900" : "text-gray-500"
                        } text-[1rem]`}
                      >
                        {produtoSelecionado
                          ? produtos
                              .filter((produto) => produto.idEntidade === entidade?.id).find((produto) => produto.descricao === produtoSelecionado)?.descricao
                          : "Selecione o produto"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Pesquisar produto" className="h-9" />
                        <CommandList>
                          <CommandEmpty>Nenhum produto encontrado</CommandEmpty>
                          <CommandGroup>
                            {produtos.filter((produto) => produto.idEntidade === entidade?.id).
                              map((produto) => (
                                <CommandItem
                                  key={produto.id}
                                  value={produto.descricao}
                                  onSelect={(currentValue) => {
                                    setProdutoSelecionado(currentValue === produtoSelecionado ? "" : currentValue);
                                    setOpen1(false);
                                  }}
                                >
                                  {produto.descricao}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      produtoSelecionado === produto.descricao ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="input_field">
                  <>
                    <label htmlFor="email" className="font-semibold">Pacote</label>


				 <Popover open={open2} onOpenChange={setOpen2}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open2}
                        className={`w-full justify-between ${
                          subProdutoSelecionado ? "text-gray-900" : "text-gray-500"
                        } text-[1rem]`}
                      >
                        {subProdutoSelecionado
                          ? subProdutos
                              .filter((subproduto) => subproduto.idProduto === 
							  (produtos.find(p => p.descricao == produtoSelecionado))?.id).find((subproduto) => subproduto.descricao === subProdutoSelecionado)?.descricao
                          : "Selecione o pacote"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0">
                      <Command>
                        <CommandInput placeholder="Pesquisar pacotes" className="h-9" />
                        <CommandList>
                          <CommandEmpty>Nenhum pacote encontrado</CommandEmpty>
                          <CommandGroup>
                            {subProdutos.filter((subproduto) => subproduto.idProduto === 
							(produtos.find(p => p.descricao == produtoSelecionado))?.id).
                              map((subproduto) => (
                                <CommandItem
                                  key={subproduto.id}
                                  value={subproduto.descricao}
                                  onSelect={(currentValue) => {
                                    setSubProdutoSelecionado(currentValue === subProdutoSelecionado ? "" : currentValue);
                                    setOpen2(false);
                                  }}
                                >
                                  {subproduto.descricao}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      subProdutoSelecionado === subproduto.descricao ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  </>
                </div>

                <div className="input_field">
                  <label htmlFor="email" className="font-semibold">Preço</label>
                  <input type="text" disabled value={formatarKz(Number(subProdutos.find(s => s.descricao == subProdutoSelecionado)?.preco))} />
                </div>

                <div className="input_field">
                  <label className="font-semibold">{entidade? entidade.campos[0] :"Nº da referência"} </label>
                  <input type="number"/>
                </div>

							  	
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "var(--color-focus3)",
                    color: "var(--color-focus)",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "7px",
                  }}
                >
                  Efecutar pagamento
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      {/**
		 * <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Pagamento de serviço especial</ModalHeader>
          <ModalBody>
            <Input label="Entidade" type="text" variant="flat" value={entidade?.nome} disabled />
            <Input
              label="Referência"
              type="text"
              variant="flat"
              value={entidade?.referencia}
              disabled
            />
            <Input label="Produto" type="text" variant="flat" value={"sss"} disabled />

            <Input label="Pacote" type="text" variant="flat" value={"sse"} disabled />

            <Input label="Preço" type="text" variant="flat" value={"eded"} disabled />

            <Input label={"3o3e"} type="text" variant="flat" value={"oo"} disabled />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={() => {
                onClose();
              }}
            >
              Cancelar
            </Button>
            <Button color="success" variant="flat">
              Confirmar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
		 */}
    </div>
  );
}
