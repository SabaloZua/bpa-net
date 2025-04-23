import Skeleton from "react-loading-skeleton";
import ButtonService from "../buttonService";
import { EntidadeType} from "@/types/commons";
import { entidades } from "@/constants";

interface Props{
  setEntidade: (entidade:EntidadeType)=> void
}

export default function ServicesList({setEntidade}: Props) {

  //const [entidades, setentidades] = useState<EntidadeType[]>([]);
  //const [todosProdutos, setTodosProdutos] = useState<ProdutoType[]>([]);

  /*useEffect(() => {
    async function getAllEntidades() {
      try {
        const dadosEntidades = await api.get("/entidade/dados");
       // const dadosProdutos = await api.get("/entidade/produtos");

        setentidades(dadosEntidades.data.entidade);
        console.log(dadosEntidades.data.entidade)
        //setTodosProdutos(dadosProdutos.data.produtos);
      } catch (error) {
        toast.error("Deu errado");
        console.log(error);
      }
    }

    getAllEntidades();
  }, []);*/

  return (
    <>
      {(!entidades) && (
        <>
          <Skeleton borderRadius={10} height={50} style={{ width: "100%" }} />
          <Skeleton borderRadius={10} height={50} style={{ width: "100%" }} />
          <Skeleton borderRadius={10} height={50} style={{ width: "100%" }} />
        </>
      )}
      {entidades && entidades.length > 0 && (
        entidades.map((entidade) => (
         <ButtonService onClick={()=>{
            setEntidade(entidade)
          }}  key={entidade.id} image={`/images/${entidade.logo}`} serviceName={entidade.nome} />
        ))

        
      )}
    </>
  );
}
