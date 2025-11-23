/* eslint-disable react-hooks/exhaustive-deps */
import Skeleton from "react-loading-skeleton";
import { FiXCircle } from "react-icons/fi"; 
import { LevantamentoType } from "@/types/commons";
import { BiMoneyWithdraw } from "react-icons/bi";
import { useEffect, useState } from "react";
import api from "@/utils/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { formatarData, formatarKz } from "@/constants/modules";
import ConfirmacaoModal from "../modals/ConfirmacaoModal";
import ValidacaoModal from "../modals/ValidacaoModal";
import { useDisclosure } from "@nextui-org/react";

interface Props {
  idConta: number;
  setListaLevantamentos: (levantamentos: LevantamentoType[]) => void;
  listaLevantamentos: LevantamentoType[];
}

export default function LevantamentosList({ idConta }: Props) {
  const [listaLevantamentos, setListaLevantamentos] = useState<LevantamentoType[]>();
  const [levantamentoSelecionado, setLevantamentoSelecionado] = useState<LevantamentoType | null>(null); // Levantamento selecionado
   const { isOpen, onOpen, onClose } = useDisclosure();
   const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [otp, setOtp] = useState("");
  useEffect(() => {
    async function getAllProducts() {
      try {
        const levantamentosRecentes = await api.get(`/trasacao/levantamentos/${idConta}`);
        

        setListaLevantamentos(levantamentosRecentes.data.Levantamentos);
        //setl(levantamentosRecentes.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            toast.error(error.response?.data.message);
          } else {
            toast.error("Sem conexão com o servidor" + error);
          }
        }
      }
    }

    getAllProducts();
  }, []);
  async function handleCancelLevantamento(otp: string) {
      setIsLoading(true);
      
      try {
        if (otp.length < 6) return;
        if (!levantamentoSelecionado) {
          toast.error("Levantamento não selecionado!");
          setIsLoading(false);
          return;
        }
        const dataset = {
          idlevantamento: Number(levantamentoSelecionado.idLevantamento),
        }
      await api.post(`/trasacao/Cancelarlevantamento`, dataset);
      toast.success("Levantamento cancelado com sucesso!");
      setListaLevantamentos((prev) => prev?.filter((item) => item.idLevantamento !== levantamentoSelecionado.idLevantamento));
      onClose2();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          toast.error(error.response?.data.message);
        } else {
          toast.error("Sem conexão com o servidor" + error);
        }
      }
    }finally {
      setIsLoading(false);
    }
  }

  function abrirModal(levantamento: LevantamentoType) {
    setLevantamentoSelecionado(levantamento);
    onOpen();
  }

  return (
    <>
      {!listaLevantamentos && (
        <>
          <Skeleton borderRadius={10} height={50} style={{ width: "100%" }} />
          <Skeleton borderRadius={10} height={50} style={{ width: "100%" }} />
          <Skeleton borderRadius={10} height={50} style={{ width: "100%" }} />
        </>
      )}

      {listaLevantamentos && listaLevantamentos.length === 0 && (
        <div className="withoutTransactions">Sem levantamentos</div>
      )}

      {listaLevantamentos &&
        listaLevantamentos.length > 0 &&
        listaLevantamentos.map((levantamento) => (
          <div
            key={levantamento.data}
            className="cardDashboardTransaction flex justify-between w-full p-2 py-3 items-center"
            style={{ border: "none", borderBottom: "1px solid #efefef", borderRadius: "0px" }}
          >
            <div
              className="iconContainer p-1 bg-[#AE8C46]"
              style={{
                borderRadius: "8px",
              }}
            >
              <BiMoneyWithdraw
                size={25}
                className="text-white"
                style={{
                  borderRadius: "8px",
                }}
              />
            </div>
            <p style={{ fontWeight: "700" }} className="text-bold text-14 capitalize text-default-700">{formatarKz(levantamento.valor)}</p>
            <p className="text-bold text-14 capitalize text-default-700">{formatarData(levantamento.data)}</p>
            <button
              className="cancel-button flex items-center text-red-500 hover:text-red-700"
             onClick={() =>abrirModal(levantamento)}
            >
              <FiXCircle className="mr-1" />
            
            </button>
          </div>
        ))}
            {levantamentoSelecionado && (
     
         <ConfirmacaoModal
              isOpen={isOpen}
              onClose={onClose}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              onOpen2={onOpen2}
              title="Confirmação de Cancelamento"
              dados={[
                { key: "Montante", value: `${formatarKz(levantamentoSelecionado.valor)}` },
                { key: "Data", value: `${formatarData(levantamentoSelecionado.data)}` },
                { key: "Estado", value: `${levantamentoSelecionado.estado}` },
              ]}
            />
            )}
         <ValidacaoModal
              isOpen={isOpen2}
              onClose={onClose2}
              otp={otp}
              setOtp={setOtp}
              isLoading={isLoading}
              handleFunction={handleCancelLevantamento}
            />

      {/*isOpen && (
				<Modal isOpen={isOpen} onClose={()=>{
          onClose()
          }} placement="top-center">
            <ModalContent>
              <ModalHeader className="flex flex-col gap-1">Levantamento sem Cartão
              </ModalHeader>
              <ModalBody>
                  <Input
                    autoFocus
                    label="Descrição do Emissor"
                    type="text"
                    variant="flat"
                    value={upData.transfers.emissor_description}
                    disabled
                  />
                  <Input
                    autoFocus
                    label="NIB do Emissor"
                    type="text"
                    variant="flat"
                    value={upData.accountFrom}
                    disabled
                  />
                  <Input
                    label="Montante"
                    type="text"
                    variant="flat"
                    value={useUtils.formatBalance(upData.balance)}
                    disabled
                  />
                  <Input
                    label="Data de validade"
                    type="text"
                    variant="flat"
                    disabled
                    value={useUtils.addOneDay(upData.date)}
                  />
                  <Input
                    label="Estado do levantamento"
                    type="text"
                    variant="flat"
                    disabled
                    value={upData.status === 1 ? "Pendente" : upData.status === 2 ? "Finalizado" : upData.status === 3 ? "Cancelado" : "Expirado"}
                  />
              </ModalBody>
              <ModalFooter>
              
                <Button variant="flat" color="danger" disabled={loading} onPress={async ()=>{
                  setLoading(true)
                  const resp = await api.put(`/cancelUpmoney/${upData.transferId}`)
                  if (resp.data.success) {
                    toast.success("Levantamento cancelado com sucesso!")
                    useAccount.updateAuthorizedBalance(resp.data.balance.authorized_balance)
                    useAccount.updateAvailableBalance(resp.data.balance.available_balance)
                    useAccount.updateUpBalance(resp.data.balance.up_balance)
                    setUpmoneyList({success: true, data: resp.data.upmoneyList})
                    onClose()
                  }
                  else {
                    toast.error("Falha ao cancelar levantamento!")
                  }
                  setLoading(false)
                }}>{loading ? (
                  <TailSpin
                  height="25"
                  width="25"
                  color="#f00"
                  ariaLabel="tail-spin-loading"
                  radius="1"
                  visible={true}
                  />
                ) : (
                  'Cancelar levantamento'
                )}</Button>
                <Button color="default" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
			)*/}
    </>
  );
}
