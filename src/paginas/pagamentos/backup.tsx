import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Banner from "@/assets/images/pagamentos_banner.svg";
import { publicServices, } from "@/constants";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { DadosContaType, EntidadeType, ProdutoType } from "@/types/commons";
import api from "@/utils/axios";
import { toast } from "sonner";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { TailSpin } from "react-loader-spinner";
import { FaArrowRightLong } from "react-icons/fa6";
import { AxiosError } from "axios";
import useContaStore from "@/contexts/contaStore";

interface Props {
  dados: DadosContaType | undefined;
}

export default function Pagamentos({ dados }: Props) {
  const [tipoPag, setTipoPag] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("tv");
  const [todasEntidades, setTodasEntidades] = useState<EntidadeType[]>([]);
  const [todosProdutos, setTodosProdutos] = useState<ProdutoType[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<ProdutoType[]>([]);
  const [entidadeSelecionada, setEntidadeSelecionada] = useState<number>(0);
  const [produtoSelecionado, setProdutoSelecionado] = useState(0);
  const useConta = useContaStore()

  const [isLoading, setIsLoading] = useState(false);
   const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    async function getAllProducts() {
      try {
        const dadosEntidades = await api.get("/entidade/dados");
        const dadosProdutos = await api.get("/entidade/produtos");

        setTodasEntidades(dadosEntidades.data.entidade);
        setTodosProdutos(dadosProdutos.data.produtos);
      } catch (error) {
        toast.error("Deu errado");
        console.log(error);
      }
    }

    getAllProducts();
  }, []);

  function handleSetProducts(id: number) {
    setProdutosFiltrados(todosProdutos.filter((el) => el.idEntidade == id));
    console.log(produtosFiltrados);
  }

  console.log(todosProdutos)

  //Criar uma funcao generica de submit

  const handleSubmit = async (e:FormEvent) => {
    e.preventDefault()
    setIsLoading(true);
    try {
      const response = await api.post("/trasacao/pagamentoentidade", {
          idconta:dados?.id,
          identidade: entidadeSelecionada,
          idproduto: produtoSelecionado
      });

      useConta.setSaldo(Number(response.data.saldoactualizado))
      
      toast.success("Pagamento realizado com sucesso!",{
        action: {
          label: "Comprovativo",
          onClick: async () =>
            window.open(
              `http://localhost:5000/pdf/comprovativo/${response.data.idtransacao}`,
              "_blank"
            ),
        },
      })
      onClose()
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
  };

  

  return (
    <div className="flex">
      <div >
        <div>
          <h1 className="text-3xl text-gray-900">Pagamentos</h1>
          <p className="font-medium text-gray-500 mt-2">Page onde quiser</p>
        </div>
        <div id="tipoPagamentoContainer" className="mt-5 flex gap-4">
          <div id="tipoPagamento">
            <label htmlFor="" className="text-gray-700">
              Seleccione o tipo de pagamento
            </label>
            <Select value={tipoPag} onValueChange={setTipoPag}>
              <SelectTrigger className="md:w-[16rem] mt-2">
                <SelectValue placeholder="Seleccione" />
              </SelectTrigger>
              <SelectContent className="text-gray-700">
                <SelectItem value="pagServicos">Pagamento de serviços</SelectItem>
                <SelectItem value="pagReferencia">Pagamento por referência</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {tipoPag == "pagServicos" && (
            <>
              <div id="categoriaPagamento">
                <label htmlFor="" className="text-gray-700">
                  Seleccione a categoria
                </label>
                <Select value={categoria} onValueChange={setCategoria}>
                  <SelectTrigger className="md:w-[16rem] mt-2">
                    <SelectValue placeholder="Seleccione" />
                  </SelectTrigger>
                  <SelectContent className="text-gray-700">
                    <SelectItem value="tv">Tv, internet e Telecom</SelectItem>
                    <SelectItem value="public">Serviços Públicos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
        {tipoPag ? (
          <div
            id="PagamentoSection"
            className="
        w-[600px] mt-4 text-gray-600 border px-4 py-6 rounded border-[#1A82FF]"
          >
            <div className="title flex flex-col items-center gap-2 ">
              <h2>
                {tipoPag == "pagServicos" ? "Pagamento de serviços " : "Pagamento por referência"}
              </h2>
              <div className="w-20 bg-gray-400 h-[1px]"></div>
            </div>
            {tipoPag == "pagServicos" ? (
              <>
                <div className="mt-4 flex gap-2 h-30">
                  <div className="w-[250px]">
                    <h3>Seleccione o serviço</h3>
                    <div className="ListaServios bg-gray-100 rounded  mt-3 p-1">
                      {categoria == "tv" ? (
                        <>
                          {todasEntidades.map((entidade) => (
                            <div
                              key={entidade.id}
                              onClick={() => {
                                setEntidadeSelecionada(entidade.id);
                                handleSetProducts(entidade.id);
                              }}
                            >
                              <div
                                className={`flex items-center gap-2 p-1 cursor-pointer transition-all ${
                                  entidade.id == entidadeSelecionada ? "bg-gray-400" : ""
                                }`}
                              >
                                <Image
                                  src={`/images/${entidade.logo}`}
                                  alt=""
                                  width={35}
                                  height={35}
                                />
                                <span>{entidade.nome}</span>
                              </div>
                              <Separator />
                            </div>
                          ))}
                        </>
                      ) : categoria == "public" ? (
                        <>
                          {publicServices.map((service) => (
                            <div key={service.name}>
                              <div className="flex items-center gap-2 p-1 cursor-pointer">
                                <Image src={service.icon} alt="" width={35} />
                                <span>{service.name}</span>
                              </div>
                              <Separator />
                            </div>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="lg:col-span-1">
                      <div className="ListaServios bg-gray-100 rounded min-h-80">
                        {produtosFiltrados.length != 0 ? (
                          <>
                            {produtosFiltrados.map((el) => (
                              <div
                                key={el.id}
                                className={`p-2 flex justify-center items-center border-b cursor-pointer  ${
                                  el.id == produtoSelecionado
                                    ? "bg-gray-400 hover:bg-gray-400"
                                    : ""
                                }`}
                                onClick={() => setProdutoSelecionado(el.id)}
                              >
                                {el.descricao}
                              </div>
                            ))}
                          </>
                        ) : (
                          <span className="text-center mt-20">Nenhum produto seleccionado</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="button_auth mt-3 cursor-pointer disabled:bg-blue-400" type="submit"  disabled={!entidadeSelecionada || !produtoSelecionado!} onClick={()=> onOpen()}>
                  Continuar
                </button>
              </>
            ) : (
              <>
                <div className="mt-4 flex flex-col justify-center items-center gap-3 px-2">
                  <div className="campo w-full">
                    <label htmlFor="">Conta de origem</label>
                    <Input readOnly className="bg-gray-100" placeholder={dados?.numeroConta} />
                  </div>
                  <div className="campo w-full">
                    <label htmlFor="">Referência</label>
                    <Input placeholder="Introduza o número da referência" />
                  </div>
                  <div className="campo w-full">
                    <label htmlFor="">Valor a pagar</label>
                    <Input placeholder="Introduza o valor a pagar" />
                  </div>
                  <button className="button_auth">Confirmar pagamento</button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="p-4">
            <Image src={Banner} width={350} alt="" />
          </div>
        )}
      </div>
      <div className="UltimosPagamentos px-4 w-96">
        <div className="border rounded-md p-4 min-h-96">
          <h1>Ultimos pagamentos</h1>
          <Separator className="mt-2" />
        </div>
      </div>

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
              <ModalHeader className="flex flex-col gap-1 text-center">Confirme os dados do pagamento</ModalHeader>
              <ModalBody>

                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-3 justify-center items-center my-3">
                    <p>
                     Entidade: {todasEntidades.find((el) => el.id == entidadeSelecionada)?.nome}
                  
                    </p>
                    <p>
                  
                     Referencia: {todasEntidades.find((el) => el.id == entidadeSelecionada)?.referencia}
                    </p>
                    <p>
                  
                     Valor: {todosProdutos.find(el => el.id == produtoSelecionado)?.preco},00 Kz
                    </p>
                  </div>
                  <div className="body_form">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="button_auth"
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
                          Confirmar Pagamento <FaArrowRightLong style={{ marginLeft: "10px" }} />
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
    </div>
  );
}
