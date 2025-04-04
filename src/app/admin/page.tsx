import Dashboard from "@/paginasAdm/dashboard/page";
import api from "@/utils/axios";
export const dynamic = 'force-dynamic';

export default async function DashboardPageAdmin() {
  let dados;
  try {
    console.log("Chamando a API /admin/dados");
    const response = await api.get(`/admin/dados`);
    console.log("Resposta da API:", response.data);
    dados = response.data.dados;
    
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    // Retorna dados padrão para evitar falha na geração estática
    dados = { totalClientes: 0 ,valorTotalTransacoes:"",totalTransacoes:0,percentagemContasAtivas:0/* ... outros valores padrão, conforme esperado pelo Dashboard */ };
  }
  
  return (
    <Dashboard dados={dados} />
  );
}