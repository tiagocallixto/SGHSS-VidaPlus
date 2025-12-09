import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, User, Plus, Search, Filter, Download, Eye, Edit, Trash2 } from "lucide-react";

interface Consulta {
  id: number;
  data: string;
  hora: string;
  profissional: string;
  especialidade: string;
  local: string;
  tipo: "presencial" | "telemedicina";
  status: "agendada" | "realizada" | "cancelada";
  motivo: string;
  observacoes?: string;
}

export default function PacienteConsultas() {
  const [consultas] = useState<Consulta[]>([
    {
      id: 1,
      data: "2025-02-20",
      hora: "14:30",
      profissional: "Dr. João Silva",
      especialidade: "Cardiologia",
      local: "Sala 301",
      tipo: "presencial",
      status: "agendada",
      motivo: "Consulta de rotina",
      observacoes: "Trazer exames anteriores",
    },
    {
      id: 2,
      data: "2025-01-15",
      hora: "10:00",
      profissional: "Dra. Maria Santos",
      especialidade: "Clínica Geral",
      local: "Telemedicina",
      tipo: "telemedicina",
      status: "realizada",
      motivo: "Consulta de acompanhamento",
    },
    {
      id: 3,
      data: "2024-12-10",
      hora: "09:30",
      profissional: "Dr. Carlos Oliveira",
      especialidade: "Dermatologia",
      local: "Sala 105",
      tipo: "presencial",
      status: "cancelada",
      motivo: "Avaliação de lesão",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todas");
  const [filterType, setFilterType] = useState<string>("todas");

  const filteredConsultas = consultas.filter((consulta) => {
    const matchSearch =
      consulta.profissional.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.especialidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.motivo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filterStatus === "todas" || consulta.status === filterStatus;
    const matchType = filterType === "todas" || consulta.tipo === filterType;

    return matchSearch && matchStatus && matchType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "agendada":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "realizada":
        return <Eye className="w-5 h-5 text-green-600" />;
      case "cancelada":
        return <Trash2 className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      agendada: { bg: "bg-blue-100", text: "text-blue-800", label: "Agendada" },
      realizada: { bg: "bg-green-100", text: "text-green-800", label: "Realizada" },
      cancelada: { bg: "bg-red-100", text: "text-red-800", label: "Cancelada" },
    };
    const config = statusMap[status] || statusMap.agendada;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          type === "presencial"
            ? "bg-purple-100 text-purple-800"
            : "bg-cyan-100 text-cyan-800"
        }`}
      >
        {type === "presencial" ? "Presencial" : "Telemedicina"}
      </span>
    );
  };

  return (
    <DashboardLayout title="Minhas Consultas">
      <div className="space-y-6">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Consultas</p>
                  <p className="text-2xl font-bold text-gray-900">{consultas.length}</p>
                </div>
                <Calendar className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Agendadas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {consultas.filter((c) => c.status === "agendada").length}
                  </p>
                </div>
                <Clock className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Realizadas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {consultas.filter((c) => c.status === "realizada").length}
                  </p>
                </div>
                <Eye className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Canceladas</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {consultas.filter((c) => c.status === "cancelada").length}
                  </p>
                </div>
                <Trash2 className="w-12 h-12 text-red-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por profissional, especialidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filtro de Status */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todas">Todos os Status</option>
                <option value="agendada">Agendadas</option>
                <option value="realizada">Realizadas</option>
                <option value="cancelada">Canceladas</option>
              </select>

              {/* Filtro de Tipo */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="todas">Todos os Tipos</option>
                <option value="presencial">Presencial</option>
                <option value="telemedicina">Telemedicina</option>
              </select>

              {/* Botão de Ação */}
              <Button className="bg-blue-600 hover:bg-blue-700 w-full">
                <Plus className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Consultas */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Histórico de Consultas</CardTitle>
                <CardDescription>
                  {filteredConsultas.length} consulta{filteredConsultas.length !== 1 ? "s" : ""} encontrada{filteredConsultas.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {filteredConsultas.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhuma consulta encontrada</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredConsultas.map((consulta) => (
                  <div
                    key={consulta.id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                      {/* Data e Hora */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Data e Hora</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-semibold text-gray-900">{consulta.data}</p>
                            <p className="text-sm text-gray-600">{consulta.hora}</p>
                          </div>
                        </div>
                      </div>

                      {/* Profissional */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Profissional</p>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="font-semibold text-gray-900">{consulta.profissional}</p>
                            <p className="text-sm text-gray-600">{consulta.especialidade}</p>
                          </div>
                        </div>
                      </div>

                      {/* Local */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Local</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-red-600" />
                          <p className="font-semibold text-gray-900">{consulta.local}</p>
                        </div>
                      </div>

                      {/* Tipo e Status */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Tipo</p>
                          {getTypeBadge(consulta.tipo)}
                        </div>
                      </div>

                      {/* Status */}
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Status</p>
                          {getStatusBadge(consulta.status)}
                        </div>
                      </div>
                    </div>

                    {/* Motivo */}
                    <div className="mb-4 pb-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Motivo</p>
                      <p className="text-gray-700">{consulta.motivo}</p>
                      {consulta.observacoes && (
                        <p className="text-sm text-gray-600 mt-2 italic">
                          <strong>Observações:</strong> {consulta.observacoes}
                        </p>
                      )}
                    </div>

                    {/* Ações */}
                    {consulta.status === "agendada" && (
                      <div className="flex gap-2 pt-2 border-t border-gray-100">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-2" />
                          Remarcar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
