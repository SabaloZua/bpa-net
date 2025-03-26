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
import { publicServices, tvServices } from "@/constants";
import Image from "next/image";
import {  useState } from "react";
import { DadosContaType } from "@/types/commons";


interface Props {
  dados: DadosContaType | undefined;
}

export default function Pagamentos({dados}:Props) {
  const [tipoPag, setTipoPag] = useState<string>("");
  const [categoria, setCategoria] = useState<string>("");
  //const [todosProdutos, setTodosProdutos] = useState([]);
  //const [todosServicos, setTodosServicos] = useState([]);

  /*useEffect(()=>{

    async function getAllProducts(){
      try {
        const data = api.get('/entidade/dados');
        console.log(data)
      } catch (error) {
        console.log(error);
        
      }
     
    }

  },[])*/


  return (
    <div className="flex">
      <div>
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
        {
          tipoPag ? (
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
                          {tvServices.map((service) => (
                            <div key={service.name}>
                              <div className="flex items-center gap-2 p-1 cursor-pointer">
                                <Image src={service.icon} alt="" width={35} />
                                <span>{service.name}</span>
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
                      <div className="ListaServios bg-gray-100 rounded">
                        <h3>...</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="button_auth mt-3">Confirmar pagamento</button>
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
            <Image src={Banner} width={350} alt=""/>
          </div>
        )
        }
      </div>
      <div className="UltimosPagamentos px-4 w-96">
        <div className="border rounded-md p-4 min-h-96">
          <h1>Ultimos pagamentos</h1>
          <Separator className="mt-2"/>
        </div>
      </div>
    </div>
  );
}
