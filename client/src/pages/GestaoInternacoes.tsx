import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Bed, AlertCircle, CheckCircle } from "lucide-react";
import DashboardLayoutCustom from "@/components/DashboardLayoutCustom";

interface Internacao {
  id: number;
  pacienteId: number;
  paciente: { name: string; cpf: string };
  dataAdmissao: string;
  motivo: string;
  diagnostico: string;
  status: "internado" | "alta" | "transferido" | "obito";
  leito: { numero: string; tipo: string; unidade: string };
}

const mockInternacoes: Internacao[] = [
  {
    id: 1,
    pacienteId: 1,
    paciente: { name: "João Silva", cpf: "123.456.789-00" },
    dataAdmissao: "2025-11-10",
    motivo: "Cirurgia de emergência",
    diagnostico: "Apendicite aguda",
    status: "internado",
    leito: { numero: "101", tipo: "enfermaria", unidade: "Clínica Geral" },
  },
  {
    id: 2,
    pacienteId: 2,
    paciente: { name: "Maria Santos", cpf: "987.654.321-00" },
    dataAdmissao: "2025-11-08",
    motivo: "Internação para tratamento",
    diagnostico: "Pneumonia bilateral",
    status: "internado",
    leito: { numero: "205", tipo: "uti", unidade: "UTI" },
  },
  {
    id: 3,
    pacienteId: 3,
    paciente: { name: "Pedro Oliveira", cpf: "456.789.123-00" },
    dataAdmissao: "2025-11-05",
    motivo: "Recuperação pós-operatória",
    diagnostico: "Fratura de fêmur",
    status: "alta",
    leito: { numero: "102", tipo: "enfermaria", unidade: "Clínica Geral" },
  },
];

const mockLeitos = [
  { id: 1, numero: "101", tipo: "enfermaria", unidade: "Clínica Geral", status: "ocupado" },
  { id: 2, numero: "102", tipo: "enfermaria", unidade: "Clínica Geral", status: "disponivel" },
  { id: 3, numero: "103", tipo: "enfermaria", unidade: "Clínica Geral", status: "disponivel" },
  { id: 4, numero: "201", tipo: "uti", unidade: "UTI", status: "ocupado" },
  { id: 5, numero: "202", tipo: "uti", unidade: "UTI", status: "disponivel" },
  { id: 6, numero: "301", tipo: "isolamento", unidade: "Infectologia", status: "disponivel" },
];

export default function GestaoInternacoes() {
  const [internacoes, setInternacoes] = useState<Internacao[]>(mockInternacoes);
  const [leitos, setLeitos] = useState(mockLeitos);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);

  const internacoesFiltradas = internacoes.filter((i) => {
    const matchesSearch =
      i.paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.paciente.cpf.includes(searchTerm);
    const matchesStatus = !filtroStatus || i.status === filtroStatus;
    return matchesSearch && matchesStatus;
  });

  const leitosDisponiveis = leitos.filter((l) => l.status === "disponivel");
  const leitosOcupados = leitos.filter((l) => l.status === "ocupado");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "internado":
        return "bg-yellow-100 text-yellow-800";
      case "alta":
        return "bg-green-100 text-green-800";
      case "transferido":
        return "bg-blue-100 text-blue-800";
      case "obito":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayoutCustom title="Gestão de Internações">
      <div className="space-y-6">
        {/* Resumo de Leitos */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total de Leitos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{leitos.length}</p>
              <p className="text-xs text-gray-600 mt-1">Leitos disponíveis</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Leitos Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600">{leitosDisponiveis.length}</p>
              <p className="text-xs text-gray-600 mt-1">Prontos para uso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Leitos Ocupados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-yellow-600">{leitosOcupados.length}</p>
              <p className="text-xs text-gray-600 mt-1">Em uso</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Internações Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-blue-600">
                {internacoes.filter((i) => i.status === "internado").length}
              </p>
              <p className="text-xs text-gray-600 mt-1">Pacientes internados</p>
            </CardContent>
          </Card>
        </div>

        {/* Mapa de Leitos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed className="w-5 h-5" />
              Mapa de Leitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
              {leitos.map((leito) => (
                <div
                  key={leito.id}
                  className={`p-3 rounded-lg text-center text-sm font-medium cursor-pointer transition ${
                    leito.status === "disponivel"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : leito.status === "ocupado"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <p className="font-bold">{leito.numero}</p>
                  <p className="text-xs">{leito.tipo}</p>
                  <p className="text-xs">{leito.status === "disponivel" ? "✓" : "✗"}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filtros e Busca */}
        <Card>
          <CardHeader>
            <CardTitle>Internações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por paciente ou CPF..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Internação
              </Button>
            </div>

            {/* Filtros de Status */}
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant={filtroStatus === null ? "default" : "outline"}
                onClick={() => setFiltroStatus(null)}
              >
                Todos ({internacoes.length})
              </Button>
              <Button
                size="sm"
                variant={filtroStatus === "internado" ? "default" : "outline"}
                onClick={() => setFiltroStatus("internado")}
              >
                Internados ({internacoes.filter((i) => i.status === "internado").length})
              </Button>
              <Button
                size="sm"
                variant={filtroStatus === "alta" ? "default" : "outline"}
                onClick={() => setFiltroStatus("alta")}
              >
                Altas ({internacoes.filter((i) => i.status === "alta").length})
              </Button>
            </div>

            {/* Lista de Internações */}
            <div className="space-y-3 mt-4">
              {internacoesFiltradas.length > 0 ? (
                internacoesFiltradas.map((internacao) => (
                  <div
                    key={internacao.id}
                    className="border rounded-lg p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{internacao.paciente.name}</p>
                          <Badge className={getStatusColor(internacao.status)}>
                            {internacao.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">CPF: {internacao.paciente.cpf}</p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Motivo:</strong> {internacao.motivo}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Diagnóstico:</strong> {internacao.diagnostico}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Leito:</strong> {internacao.leito.numero} ({internacao.leito.tipo}) - {internacao.leito.unidade}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Admissão: {new Date(internacao.dataAdmissao).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        {internacao.status === "internado" && (
                          <Button size="sm" variant="default">
                            Registrar Alta
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Nenhuma internação encontrada</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayoutCustom>
  );
}
