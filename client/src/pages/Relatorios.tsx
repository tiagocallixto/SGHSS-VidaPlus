import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Users, Calendar, Download, Filter, Eye } from "lucide-react";

interface RelatorioData {
  mes: string;
  consultas: number;
  pacientes: number;
  profissionais: number;
  receita: number;
}

export default function Relatorios() {
  const [tipoRelatorio, setTipoRelatorio] = useState<"consultas" | "financeiro" | "desempenho">("consultas");
  const [dataInicio, setDataInicio] = useState("2025-01-01");
  const [dataFim, setDataFim] = useState("2025-01-31");

  const dadosConsultas: RelatorioData[] = [
    { mes: "Janeiro", consultas: 245, pacientes: 156, profissionais: 24, receita: 24500 },
    { mes: "Fevereiro", consultas: 312, pacientes: 178, profissionais: 26, receita: 31200 },
    { mes: "Março", consultas: 289, pacientes: 165, profissionais: 25, receita: 28900 },
  ];

  const consultasPorEspecialidade = [
    { especialidade: "Cardiologia", consultas: 145, percentual: 22 },
    { especialidade: "Clínica Geral", consultas: 198, percentual: 30 },
    { especialidade: "Dermatologia", consultas: 89, percentual: 13 },
    { especialidade: "Endocrinologia", consultas: 112, percentual: 17 },
    { especialidade: "Ortopedia", consultas: 112, percentual: 18 },
  ];

  const profissionaisMaisAtivos = [
    { nome: "Dr. João Silva", consultas: 87, taxa: 95 },
    { nome: "Dra. Maria Santos", consultas: 76, taxa: 92 },
    { nome: "Dr. Carlos Oliveira", consultas: 65, taxa: 88 },
    { nome: "Dra. Ana Costa", consultas: 54, taxa: 85 },
  ];

  const pacientesNovos = [
    { mes: "Janeiro", novos: 45, retorno: 111 },
    { mes: "Fevereiro", novos: 52, retorno: 126 },
    { mes: "Março", novos: 48, retorno: 117 },
  ];

  return (
    <DashboardLayout title="Relatórios">
      <div className="space-y-6">
        {/* Filtros */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Tipo de Relatório */}
              <select
                value={tipoRelatorio}
                onChange={(e) => setTipoRelatorio(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="consultas">Relatório de Consultas</option>
                <option value="financeiro">Relatório Financeiro</option>
                <option value="desempenho">Relatório de Desempenho</option>
              </select>

              {/* Data Início */}
              <input
                type="date"
                value={dataInicio}
                onChange={(e) => setDataInicio(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Data Fim */}
              <input
                type="date"
                value={dataFim}
                onChange={(e) => setDataFim(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Botões */}
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>

              <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Executivo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Consultas</p>
                  <p className="text-2xl font-bold text-gray-900">846</p>
                  <p className="text-xs text-green-600 mt-1">↑ 15% vs mês anterior</p>
                </div>
                <Calendar className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pacientes Atendidos</p>
                  <p className="text-2xl font-bold text-gray-900">499</p>
                  <p className="text-xs text-green-600 mt-1">↑ 8% vs mês anterior</p>
                </div>
                <Users className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Taxa de Ocupação</p>
                  <p className="text-2xl font-bold text-gray-900">87%</p>
                  <p className="text-xs text-green-600 mt-1">↑ 5% vs mês anterior</p>
                </div>
                <TrendingUp className="w-12 h-12 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Receita Total</p>
                  <p className="text-2xl font-bold text-gray-900">R$ 84.600</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% vs mês anterior</p>
                </div>
                <BarChart3 className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Consultas por Mês */}
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle>Evolução de Consultas</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {dadosConsultas.map((dado, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{dado.mes}</p>
                      <p className="text-sm font-bold text-blue-600">{dado.consultas}</p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(dado.consultas / 312) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pacientes Novos vs Retorno */}
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle>Pacientes: Novos vs Retorno</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {pacientesNovos.map((dado, idx) => (
                  <div key={idx}>
                    <p className="font-semibold text-gray-900 mb-2">{dado.mes}</p>
                    <div className="flex gap-2 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Novos</span>
                          <span className="text-xs font-bold text-green-600">{dado.novos}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(dado.novos / 52) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Retorno</span>
                          <span className="text-xs font-bold text-blue-600">{dado.retorno}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(dado.retorno / 126) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabelas Detalhadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Consultas por Especialidade */}
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle>Consultas por Especialidade</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {consultasPorEspecialidade.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.especialidade}</p>
                      <p className="text-sm text-gray-600">{item.consultas} consultas</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">{item.percentual}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Profissionais Mais Ativos */}
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
              <CardTitle>Profissionais Mais Ativos</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {profissionaisMaisAtivos.map((prof, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{prof.nome}</p>
                      <p className="text-sm text-gray-600">{prof.consultas} consultas</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${prof.taxa}%` }}
                          ></div>
                        </div>
                        <p className="text-sm font-bold text-gray-900 w-8">{prof.taxa}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ações */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            Visualizar Detalhes
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Exportar Relatório Completo
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
