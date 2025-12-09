import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, Plus, Clock, CheckCircle, XCircle } from "lucide-react";

interface Consulta {
  id: number;
  dataConsulta: string;
  horaConsulta: string;
  profissional: string;
  especialidade: string;
  status: "agendada" | "realizada" | "cancelada";
  motivo: string;
}

interface Prontuario {
  id: number;
  historico: string;
  observacoes: string;
  dataAtualizacao: string;
}

export default function DashboardPaciente() {
  const [consultas] = useState<Consulta[]>([
    {
      id: 1,
      dataConsulta: "2025-02-20",
      horaConsulta: "14:30",
      profissional: "Dr. João Silva",
      especialidade: "Cardiologia",
      status: "agendada",
      motivo: "Consulta de rotina",
    },
    {
      id: 2,
      dataConsulta: "2025-01-15",
      horaConsulta: "10:00",
      profissional: "Dra. Maria Santos",
      especialidade: "Clínica Geral",
      status: "realizada",
      motivo: "Consulta de acompanhamento",
    },
  ]);

  const [prontuario] = useState<Prontuario>({
    id: 1,
    historico: "Paciente com histórico de hipertensão controlada com medicação. Sem alergias conhecidas.",
    observacoes: "Acompanhamento contínuo recomendado. Próxima consulta em 3 meses.",
    dataAtualizacao: "2025-01-15",
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "agendada":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "realizada":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "cancelada":
        return <XCircle className="w-5 h-5 text-red-600" />;
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

  return (
    <DashboardLayout title="Meu Dashboard">
      <div className="space-y-6">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Próxima Consulta</p>
                  <p className="text-2xl font-bold text-gray-900">20/02/2025</p>
                  <p className="text-xs text-gray-500 mt-1">14:30 - Cardiologia</p>
                </div>
                <Calendar className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Consultas Realizadas</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-xs text-gray-500 mt-1">Últimos 12 meses</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Prontuário</p>
                  <p className="text-2xl font-bold text-gray-900">Atualizado</p>
                  <p className="text-xs text-gray-500 mt-1">15/01/2025</p>
                </div>
                <FileText className="w-12 h-12 text-indigo-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Próximas Consultas */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Minhas Consultas</CardTitle>
                <CardDescription>Histórico e agendamentos</CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Agendar Consulta
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {consultas.map((consulta) => (
                <div
                  key={consulta.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(consulta.status)}
                      <div>
                        <p className="font-semibold text-gray-900">{consulta.profissional}</p>
                        <p className="text-sm text-gray-600">{consulta.especialidade}</p>
                      </div>
                    </div>
                    {getStatusBadge(consulta.status)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <p className="text-gray-500">Data</p>
                      <p className="font-semibold text-gray-900">{consulta.dataConsulta}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Horário</p>
                      <p className="font-semibold text-gray-900">{consulta.horaConsulta}</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-gray-500">Motivo</p>
                      <p className="font-semibold text-gray-900">{consulta.motivo}</p>
                    </div>
                  </div>

                  {consulta.status === "agendada" && (
                    <div className="flex gap-2 pt-3 border-t">
                      <Button variant="outline" size="sm" className="flex-1">
                        Remarcar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:text-red-700">
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Prontuário */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b">
            <CardTitle className="text-xl">Meu Prontuário</CardTitle>
            <CardDescription>Histórico clínico eletrônico</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Histórico Clínico</p>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {prontuario.historico}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-700 mb-2">Observações</p>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {prontuario.observacoes}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <p className="text-xs text-gray-500">
                  Última atualização: {prontuario.dataAtualizacao}
                </p>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
