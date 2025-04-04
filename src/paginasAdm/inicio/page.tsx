// page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, DollarSign, Users,  TrendingUp, Activity, Calendar } from "lucide-react";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart";
import { CartesianGrid, XAxis, YAxis, Area, AreaChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import {DadoAdmin} from '@/types/commons'

// Dados para os gráficos
const transactionData = [
  { name: "Jan", valor: 1200 },
  { name: "Fev", valor: 1900 },
  { name: "Mar", valor: 1500 },
  { name: "Abr", valor: 2100 },
  { name: "Mai", valor: 2400 },
  { name: "Jun", valor: 1800 },
  { name: "Jul", valor: 2200 },
  { name: "Ago", valor: 2600 },
  { name: "Set", valor: 2900 },
  { name: "Out", valor: 3100 },
  { name: "Nov", valor: 2800 },
  { name: "Dez", valor: 3300 },
];


interface DashboardProps {
 
  dados: DadoAdmin | undefined;
}
export default function Inicio({dados}:DashboardProps) {


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            31/03/2025
          </Button>
          <Button variant="default" size="sm">
            Exportar Relatório
          </Button>
        </div>
      </div>

      <Tabs defaultValue="visao-geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="transacoes">Transações</TabsTrigger>
          <TabsTrigger value="clientes">Clientes</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Kzs {dados?.valorTotalTransacoes}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  +20.1% do mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium"> Clientes</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dados?.totalClientes}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  +180 novos esta semana
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Transações</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dados?.totalTransacoes}</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  +19% do mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contas Ativas</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dados?.percentagemContasAtivas}%</div>
                <p className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  +201 desde janeiro
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Receita Total</CardTitle>
                <CardDescription>Evolução da Receita Total</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer className="h-[300px]" config={{}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={transactionData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="valor" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1) / 0.2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>


          
          </div>
         
        </TabsContent>
        
        <TabsContent value="transacoes">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Transações</CardTitle>
              <CardDescription>Lista das transações mais recentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="p-2 text-left font-medium">ID</th>
                      <th className="p-2 text-left font-medium">Cliente</th>
                      <th className="p-2 text-left font-medium">Tipo</th>
                      <th className="p-2 text-left font-medium">Valor</th>
                      <th className="p-2 text-left font-medium">Data</th>
                      <th className="p-2 text-left font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-2">#TR-{1000 + i}</td>
                        <td className="p-2">Cliente {i + 1}</td>
                        <td className="p-2">{i % 2 === 0 ? "Transferência" : "Pagamento"}</td>
                        <td className="p-2">R$ {(Math.random() * 1000).toFixed(2)}</td>
                        <td className="p-2">31/03/2025</td>
                        <td className="p-2">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            i % 3 === 0 
                              ? "bg-green-100 text-green-800" 
                              : i % 3 === 1 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-red-100 text-red-800"
                          }`}>
                            {i % 3 === 0 ? "Concluído" : i % 3 === 1 ? "Pendente" : "Falhou"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Fechamento da tag Tabs */}
      </Tabs>
    </div>
  );
}
