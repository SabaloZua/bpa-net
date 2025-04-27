"use client";
import "@/styles/pay-types.css";
import { useEffect, useState } from "react";
//import { useDisclosure } from "@nextui-org/react";
import ServicesList from "../lists/servicesList";
import useContaStore from "@/contexts/contaStore";
import api from "@/utils/axios";
import ConfirmacaoModal from "@/components/modals/ConfirmacaoModal";
import ValidacaoModal from "@/components/modals/ValidacaoModal";
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
import { AxiosError } from "axios";
import { useDisclosure } from "@nextui-org/react";

interface Produtos{
  id: number,
   idEntidade: number, 
   descricao: string, 
   preco: string
}
interface SubProdutos{
  id: number,
  idProduto: number, 
  descricao: string, 
  preco: string
}

export default function PayServices() {

  const [entidade, setEntidade] = useState<EntidadeType>();
   const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
  const [Produto, setProduto] = useState("");
  const [prod, setPro] = useState<Produtos | null>(null)
  const [subProd,setSubProd] = useState<SubProdutos | null>(null)
  const [subProduto, setSubProduto] = useState("");

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

    useEffect(() => {
      const Produtos = produtos.find(prod => prod.descricao === Produto) ?? null;
      setPro(Produtos);
    }, [Produto, produtos]);

  useEffect(() => {
      const subprodutos = subProdutos.find(subprod => subprod.descricao === subProduto) ?? null;
      setSubProd(subprodutos);
    }, [subProduto, subProdutos]);
    
  async function confirmarPagamaneto() {
    onOpen();
  }
   async function handlePagementos(otp: string) {
      try {
      
        if(otp.length <6) return;
        setLoading(true);
  
         const result = await api.post(`/trasacao/verificacodigo`,{codigo2fa:otp})
         console.log(result);
        const dataset = {
          idconta:useAccount.id,
          identidade:entidade?.id,
          idproduto:prod?.id,
          idsubproduto:subProd?.id,
        };
  
        
        const response = await api.post("/trasacao/pagamentoentidade", dataset);
  
        useAccount.setSaldo(Number(response.data.saldoactualizado));
        onClose2();
        toast.success(response.data.message, {
          action: {
            label: "Comprovativo",
            onClick: async () =>
              window.open(
                `http://localhost:5000/pdf/comprovativo/${response.data.idtransacao}`,
                "_blank"
              ),
          },
  
        });
      } catch (erro) {
        if (erro instanceof AxiosError) {
          if (erro.response?.status === 400) {
            toast.error(erro.response?.data.message);
          } else {
            toast.error("Sem conexão com o servidor");
          }
        }
      } finally {
        setLoading(false);
      }
    }
  return (
    <div className="pt1_container">
      <div className="top">
        <h1>Pagamentos de serviços</h1>
        <div className="separator" />
      </div>
      <div className="bottom">
        <div className="left">
          <p>Selecione o serviço</p>
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
                          prod?.descricao ? "text-gray-900" : "text-gray-500"
                        } text-[1rem]`}
                      >
                        {Produto
                          ? prod?.descricao
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
                                    setProduto(currentValue === Produto ? "" : currentValue);
                                    setOpen1(false);
                                  }}
                                >
                                  {produto.descricao}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      prod?.descricao === produto.descricao ? "opacity-100" : "opacity-0"
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
                          subProduto ? "text-gray-900" : "text-gray-500"
                        } text-[1rem]`}
                      >
                        {subProduto
                          ? subProd?.descricao
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
							(produtos.find(p => p.descricao == prod?.descricao))?.id).
                              map((subproduto) => (
                                <CommandItem
                                  key={subproduto.id}
                                  value={subproduto.descricao}
                                  onSelect={(currentValue) => {
                                    setSubProduto(currentValue === subProduto ? "" : currentValue);
                                    setOpen2(false);
                                  }}
                                >
                                  {subproduto.descricao}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      subProduto === subproduto.descricao ? "opacity-100" : "opacity-0"
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
                  <input type="text" disabled value={formatarKz(Number(subProd?.preco))} />
                </div>

                <div className="input_field">
                  <label className="font-semibold">{entidade? entidade.campos[0] :"Nº da referência"} </label>
                  <input type="number"/>
                </div>

							  	
                <button
                  type="button"
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
                  onClick={confirmarPagamaneto}
                >
                  Efecutar pagamento
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <ConfirmacaoModal
                   isOpen={isOpen}
                   onClose={onClose}
                   isLoading={loading}
                   setIsLoading={setLoading}
                   onOpen2={onOpen2}
                   title="Confirme os dados do Pagamento"
                   dados={[
                     {key:"Beneficiário", value:entidade?.nome.toLocaleUpperCase() || ""},
                     {key:"Produto", value: `${prod?.descricao}- ${subProd?.descricao}`},
                     {key:"Montante", value:`${subProd?.preco},00 Kz`}
                   ]}
                 />
               <ValidacaoModal
                   isOpen={isOpen2}
                   onClose={onClose2}
                   otp={otp}
                   setOtp={setOtp}
                   isLoading={loading}
                   handleFunction={handlePagementos}
                 />
    </div>
  );
}
