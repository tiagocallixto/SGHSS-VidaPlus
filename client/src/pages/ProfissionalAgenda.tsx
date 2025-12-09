import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Phone, MapPin, CheckCircle, XCircle, AlertCircle, Plus, Search } from "lucide-react";

interface ConsultaAgenda {
  id: number;
  horario: string;
  paciente: string;
  cpf: string;
  telefone: string;
  tipo: "presencial" | "telemedicina";
  local: string;
  motivo: string;
  status: "confirmada" | "pendente" | "cancelada" | "realizada";
  notas?: string;
}

export default function ProfissionalAgenda() {
  const [dataSelecionada, setDataSelecionada] = useState("2025-02-17");
  const [viewType, setViewType] = useState<"dia" | "semana" | "mes">("dia");
  const [searchTerm, setSearchTerm] = useState("");

  const [consultas] = useState<ConsultaAgenda[]>([
    {
      id: 1,
      horario: "08:00",
      paciente: "João da Silva",
      cpf: "123.456.789-00",
      telefone: "(11) 98765-4321",
      tipo: "presencial",
      local: "Sala 301",
      motivo: "Consulta de rotina - Hipertensão",
      status: "confirmada",
      notas: "Paciente já realizou exames",
    },
    {
      id: 2,
      horario: "09:00",
      paciente: "Maria Santos",
      cpf: "987.654.321-00",
      telefone: "(11) 91234-5678",
      tipo: "telemedicina",
      local: "Videochamada",
      motivo: "Acompanhamento - Diabetes",
      status: "confirmada",
    },
    {
      id: 3,
      horario: "10:00",
      paciente: "Carlos Oliveira",
      cpf: "456.789.123-00",
      telefone: "(11) 99876-5432",
      tipo: "presencial",
      local: "Sala 305",
      motivo: "Avaliação inicial",
      status: "pendente",
    },
    {
      id: 4,
      horario: "11:00",
      paciente: "Ana Costa",
      cpf: "789.123.456-00",
      telefone: "(11) 98765-1234",
      tipo: "presencial",
      local: "Sala 301",
      motivo: "Retorno - Colesterol",
      status: "confirmada",
    },
    {
      id: 5,
      horario: "14:00",
      paciente: "Pedro Ferreira",
      cpf: "321.654.987-00",
      telefone: "(11) 91111-2222",
      tipo: "telemedicina",
      local: "Videochamada",
      motivo: "Consulta de acompanhamento",
      status: "confirmada",
    },
    {
      id: 6,
      horario: "15:00",
      paciente: "Lucia Mendes",
      cpf: "654.321.789-00",
      telefone: "(11) 92222-3333",
      tipo: "presencial",
      local: "Sala 305",
      motivo: "Avaliação clínica",
      status: "cancelada",
    },
  ]);

  const filteredConsultas = consultas.filter((consulta) =>
    consulta.paciente.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmada":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pendente":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case "cancelada":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "realizada":
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      confirmada: { bg: "bg-green-100", text: "text-green-800", label: "Confirmada" },
      pendente: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pendente" },
      cancelada: { bg: "bg-red-100", text: "text-red-800", label: "Cancelada" },
      realizada: { bg: "bg-blue-100", text: "text-blue-800", label: "Realizada" },
    };
    const config = statusMap[status] || statusMap.confirmada;
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

  const totalConsultas = consultas.length;
  const consultasConfirmadas = consultas.filter((c) => c.status === "confirmada").length;
  const consultasPendentes = consultas.filter((c) => c.status === "pendente").length;
  const consultasTelemedicina = consultas.filter((c) => c.tipo === "telemedicina").length;

  return (
    <DashboardLayout title="Minha Agenda">
      <div className="space-y-6">
        {/* Resumo do Dia */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Consultas</p>
                  <p className="text-2xl font-bold text-gray-900">{totalConsultas}</p>
                </div>
                <Calendar className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confirmadas</p>
                  <p className="text-2xl font-bold text-gray-900">{consultasConfirmadas}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pendentes</p>
                  <p className="text-2xl font-bold text-gray-900">{consultasPendentes}</p>
                </div>
                <AlertCircle className="w-12 h-12 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Telemedicina</p>
                  <p className="text-2xl font-bold text-gray-900">{consultasTelemedicina}</p>
                </div>
                <Phone className="w-12 h-12 text-cyan-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Nova Consulta
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Visualização */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Data */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                <input
                  type="date"
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Busca */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar Paciente</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Nome do paciente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Visualização */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Visualização</label>
                <select
                  value={viewType}
                  onChange={(e) => setViewType(e.target.value as any)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="dia">Por Dia</option>
                  <option value="semana">Por Semana</option>
                  <option value="mes">Por Mês</option>
                </select>
              </div>

              {/* Ação */}
              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  Filtrar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agenda do Dia */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Agenda - {new Date(dataSelecionada).toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</CardTitle>
                <CardDescription>
                  {filteredConsultas.length} consulta{filteredConsultas.length !== 1 ? "s" : ""} agendada{filteredConsultas.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>
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
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
                      {/* Horário */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Horário</p>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <p className="font-bold text-gray-900">{consulta.horario}</p>
                        </div>
                      </div>

                      {/* Paciente */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Paciente</p>
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-green-600" />
                          <div>
                            <p className="font-semibold text-gray-900">{consulta.paciente}</p>
                            <p className="text-xs text-gray-600">{consulta.cpf}</p>
                          </div>
                        </div>
                      </div>

                      {/* Telefone */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Telefone</p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-red-600" />
                          <p className="font-semibold text-gray-900">{consulta.telefone}</p>
                        </div>
                      </div>

                      {/* Tipo */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tipo</p>
                        {getTypeBadge(consulta.tipo)}
                      </div>

                      {/* Local */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Local</p>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <p className="font-semibold text-gray-900 text-sm">{consulta.local}</p>
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        {getStatusBadge(consulta.status)}
                      </div>
                    </div>

                    {/* Motivo e Notas */}
                    <div className="mb-4 pb-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-1">Motivo</p>
                      <p className="text-gray-700 mb-2">{consulta.motivo}</p>
                      {consulta.notas && (
                        <p className="text-sm text-gray-600 italic">
                          <strong>Notas:</strong> {consulta.notas}
                        </p>
                      )}
                    </div>

                    {/* Ações */}
                    <div className="flex gap-2 pt-2 border-t border-gray-100">
                      {consulta.status === "confirmada" && (
                        <>
                          <Button size="sm" variant="outline" className="flex-1">
                            Iniciar Consulta
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-red-600 hover:text-red-700"
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                      {consulta.status === "pendente" && (
                        <>
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            Confirmar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-red-600 hover:text-red-700"
                          >
                            Cancelar
                          </Button>
                        </>
                      )}
                    </div>
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
