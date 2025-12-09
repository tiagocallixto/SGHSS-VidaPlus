import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, FileText, Clock, CheckCircle, Plus } from "lucide-react";

interface AgendaItem {
  id: number;
  paciente: string;
  horario: string;
  tipo: "presencial" | "telemedicina";
  status: "agendada" | "realizada" | "cancelada";
  motivo: string;
}

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  ultimaConsulta: string;
  proxima: string;
}

export default function DashboardProfissional() {
  const [agendaHoje] = useState<AgendaItem[]>([
    {
      id: 1,
      paciente: "Maria Silva",
      horario: "09:00",
      tipo: "presencial",
      status: "agendada",
      motivo: "Consulta de rotina",
    },
    {
      id: 2,
      paciente: "João Santos",
      horario: "10:30",
      tipo: "telemedicina",
      status: "agendada",
      motivo: "Acompanhamento",
    },
    {
      id: 3,
      paciente: "Ana Costa",
      horario: "14:00",
      tipo: "presencial",
      status: "realizada",
      motivo: "Consulta de acompanhamento",
    },
  ]);

  const [pacientes] = useState<Paciente[]>([
    {
      id: 1,
      nome: "Maria Silva",
      cpf: "123.456.789-00",
      ultimaConsulta: "2025-01-15",
      proxima: "2025-02-20",
    },
    {
      id: 2,
      nome: "João Santos",
      cpf: "987.654.321-00",
      ultimaConsulta: "2025-01-10",
      proxima: "2025-02-25",
    },
  ]);

  const getTipoBadge = (tipo: string) => {
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          tipo === "presencial"
            ? "bg-blue-100 text-blue-800"
            : "bg-purple-100 text-purple-800"
        }`}
      >
        {tipo === "presencial" ? "Presencial" : "Telemedicina"}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      agendada: { bg: "bg-blue-100", text: "text-blue-800", label: "Agendada" },
      realizada: { bg: "bg-green-100", text: "text-green-800", label: "Realizada" },
      cancelada: { bg: "bg-red-100", text: "text-red-800", label: "Cancelada" },
    };
    const config = statusMap[status] || statusMap.agendada;
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  return (
    <DashboardLayout title="Minha Agenda">
      <div className="space-y-6">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Consultas Hoje</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <Calendar className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pacientes Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <Users className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Próxima Consulta</p>
                  <p className="text-lg font-bold text-gray-900">09:00</p>
                  <p className="text-xs text-gray-500">Maria Silva</p>
                </div>
                <Clock className="w-12 h-12 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Taxa de Conclusão</p>
                  <p className="text-2xl font-bold text-gray-900">92%</p>
                  <p className="text-xs text-gray-500">Mês atual</p>
                </div>
                <CheckCircle className="w-12 h-12 text-indigo-600 opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agenda do Dia */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-xl">Agenda de Hoje</CardTitle>
            <CardDescription>Consultas agendadas para hoje</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {agendaHoje.map((item) => (
                <div
                  key={item.id}
                  className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{item.paciente}</p>
                      <p className="text-sm text-gray-600">{item.motivo}</p>
                    </div>
                    <div className="flex gap-2">
                      {getTipoBadge(item.tipo)}
                      {getStatusBadge(item.status)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <p className="text-sm font-semibold text-gray-900">{item.horario}</p>
                    {item.status === "agendada" && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Iniciar Consulta
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meus Pacientes */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Meus Pacientes</CardTitle>
                <CardDescription>Pacientes sob sua responsabilidade</CardDescription>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Paciente
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Paciente</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">CPF</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Última Consulta</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Próxima Consulta</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.map((paciente) => (
                    <tr key={paciente.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{paciente.nome}</td>
                      <td className="py-3 px-4 text-gray-600">{paciente.cpf}</td>
                      <td className="py-3 px-4 text-gray-600">{paciente.ultimaConsulta}</td>
                      <td className="py-3 px-4 text-gray-600">{paciente.proxima}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Ver Prontuário
                          </Button>
                          <Button size="sm" variant="outline">
                            Agendar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
