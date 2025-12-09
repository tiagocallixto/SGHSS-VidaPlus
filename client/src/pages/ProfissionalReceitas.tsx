import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Download, Send, Eye, Trash2, Search, Filter, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Receita {
  id: number;
  paciente: string;
  cpf: string;
  data: string;
  medicamentos: string[];
  status: "rascunho" | "assinada" | "enviada" | "utilizada";
  validade: string;
  profissional: string;
  crm: string;
}

export default function ProfissionalReceitas() {
  const [receitas] = useState<Receita[]>([
    {
      id: 1,
      paciente: "João da Silva",
      cpf: "123.456.789-00",
      data: "2025-02-15",
      medicamentos: ["Losartana 50mg - 30 comprimidos", "Atorvastatina 20mg - 30 comprimidos"],
      status: "assinada",
      validade: "2025-05-15",
      profissional: "Dr. João Silva",
      crm: "123456/SP",
    },
    {
      id: 2,
      paciente: "Maria Santos",
      cpf: "987.654.321-00",
      data: "2025-02-10",
      medicamentos: ["Metformina 500mg - 60 comprimidos"],
      status: "enviada",
      validade: "2025-05-10",
      profissional: "Dr. João Silva",
      crm: "123456/SP",
    },
    {
      id: 3,
      paciente: "Carlos Oliveira",
      cpf: "456.789.123-00",
      data: "2025-02-18",
      medicamentos: ["Amoxicilina 500mg - 21 comprimidos", "Dipirona 500mg - 20 comprimidos"],
      status: "rascunho",
      validade: "2025-05-18",
      profissional: "Dr. João Silva",
      crm: "123456/SP",
    },
    {
      id: 4,
      paciente: "Ana Costa",
      cpf: "789.123.456-00",
      data: "2025-01-20",
      medicamentos: ["Omeprazol 20mg - 30 comprimidos"],
      status: "utilizada",
      validade: "2025-04-20",
      profissional: "Dr. João Silva",
      crm: "123456/SP",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todas");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showNovaReceita, setShowNovaReceita] = useState(false);
  const [novaReceita, setNovaReceita] = useState({
    paciente: "",
    cpf: "",
    medicamentos: [""],
  });

  const filteredReceitas = receitas.filter((receita) => {
    const matchSearch =
      receita.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      receita.cpf.includes(searchTerm);

    const matchStatus = filterStatus === "todas" || receita.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "assinada":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "enviada":
        return <Send className="w-5 h-5 text-blue-600" />;
      case "rascunho":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "utilizada":
        return <CheckCircle className="w-5 h-5 text-purple-600" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; label: string }> = {
      rascunho: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Rascunho" },
      assinada: { bg: "bg-green-100", text: "text-green-800", label: "Assinada" },
      enviada: { bg: "bg-blue-100", text: "text-blue-800", label: "Enviada" },
      utilizada: { bg: "bg-purple-100", text: "text-purple-800", label: "Utilizada" },
    };
    const config = statusMap[status] || statusMap.rascunho;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const totalReceitas = receitas.length;
  const receitasAssinadas = receitas.filter((r) => r.status === "assinada").length;
  const receitasEnviadas = receitas.filter((r) => r.status === "enviada").length;
  const receitasRascunho = receitas.filter((r) => r.status === "rascunho").length;

  return (
    <DashboardLayout title="Minhas Receitas">
      <div className="space-y-6">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Receitas</p>
                  <p className="text-2xl font-bold text-gray-900">{totalReceitas}</p>
                </div>
                <AlertCircle className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Assinadas</p>
                  <p className="text-2xl font-bold text-gray-900">{receitasAssinadas}</p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Enviadas</p>
                  <p className="text-2xl font-bold text-gray-900">{receitasEnviadas}</p>
                </div>
                <Send className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rascunhos</p>
                  <p className="text-2xl font-bold text-gray-900">{receitasRascunho}</p>
                </div>
                <Clock className="w-12 h-12 text-yellow-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <Button
                onClick={() => setShowNovaReceita(!showNovaReceita)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova Receita
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Formulário Nova Receita */}
        {showNovaReceita && (
          <Card className="border-0 shadow-md border-l-4 border-blue-600">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <CardTitle>Emitir Nova Receita</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Paciente
                  </label>
                  <input
                    type="text"
                    placeholder="Nome do paciente"
                    value={novaReceita.paciente}
                    onChange={(e) =>
                      setNovaReceita({ ...novaReceita, paciente: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    placeholder="000.000.000-00"
                    value={novaReceita.cpf}
                    onChange={(e) =>
                      setNovaReceita({ ...novaReceita, cpf: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Medicamentos
                </label>
                <div className="space-y-2">
                  {novaReceita.medicamentos.map((med, idx) => (
                    <div key={idx} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Nome do medicamento - Dosagem - Quantidade"
                        value={med}
                        onChange={(e) => {
                          const newMeds = [...novaReceita.medicamentos];
                          newMeds[idx] = e.target.value;
                          setNovaReceita({ ...novaReceita, medicamentos: newMeds });
                        }}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {idx > 0 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newMeds = novaReceita.medicamentos.filter((_, i) => i !== idx);
                            setNovaReceita({ ...novaReceita, medicamentos: newMeds });
                          }}
                        >
                          Remover
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setNovaReceita({
                      ...novaReceita,
                      medicamentos: [...novaReceita.medicamentos, ""],
                    })
                  }
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Medicamento
                </Button>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => setShowNovaReceita(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Salvar Rascunho
                </Button>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Send className="w-4 h-4 mr-2" />
                  Assinar e Enviar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filtros */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por paciente ou CPF..."
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
                <option value="rascunho">Rascunhos</option>
                <option value="assinada">Assinadas</option>
                <option value="enviada">Enviadas</option>
                <option value="utilizada">Utilizadas</option>
              </select>

              {/* Botões */}
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>

              <Button variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Receitas */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Minhas Receitas</CardTitle>
                <CardDescription>
                  {filteredReceitas.length} receita{filteredReceitas.length !== 1 ? "s" : ""} encontrada{filteredReceitas.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {filteredReceitas.map((receita) => (
                <div
                  key={receita.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === receita.id ? null : receita.id)
                    }
                    className="w-full p-4 hover:bg-gray-50 transition text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getStatusIcon(receita.status)}
                          <div>
                            <p className="font-semibold text-gray-900">{receita.paciente}</p>
                            <p className="text-sm text-gray-600">{receita.cpf}</p>
                          </div>
                        </div>
                        <div className="flex gap-4 text-sm text-gray-600 ml-8">
                          <span>Emitida em: {new Date(receita.data).toLocaleDateString("pt-BR")}</span>
                          <span>Válida até: {new Date(receita.validade).toLocaleDateString("pt-BR")}</span>
                          {getStatusBadge(receita.status)}
                        </div>
                      </div>
                      <div
                        className={`transform transition ${
                          expandedId === receita.id ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {expandedId === receita.id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Medicamentos:</p>
                        <ul className="space-y-1">
                          {receita.medicamentos.map((med, idx) => (
                            <li key={idx} className="text-sm text-gray-700">
                              • {med}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
                        <p className="text-blue-900">
                          <strong>Profissional:</strong> {receita.profissional} - CRM {receita.crm}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-2" />
                          Visualizar
                        </Button>
                        {receita.status === "rascunho" && (
                          <>
                            <Button size="sm" variant="outline" className="flex-1">
                              Editar
                            </Button>
                            <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                              <Send className="w-4 h-4 mr-2" />
                              Assinar
                            </Button>
                          </>
                        )}
                        {receita.status === "assinada" && (
                          <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Send className="w-4 h-4 mr-2" />
                            Enviar
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Deletar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
