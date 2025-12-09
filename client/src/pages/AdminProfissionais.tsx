import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus, Search, Filter, Edit, Trash2, Eye, Mail, Phone, MapPin, Award } from "lucide-react";

interface Profissional {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  especialidade: string;
  crm: string;
  status: "ativo" | "inativo";
  consultasRealizadas: number;
  pacientesAtivos: number;
  avaliacaoMedia: number;
}

export default function AdminProfissionais() {
  const [profissionais] = useState<Profissional[]>([
    {
      id: 1,
      nome: "Dr. João Silva",
      email: "joao.silva@vidaplus.com",
      telefone: "(11) 98765-4321",
      especialidade: "Cardiologia",
      crm: "CRM/SP 123456",
      status: "ativo",
      consultasRealizadas: 245,
      pacientesAtivos: 32,
      avaliacaoMedia: 4.8,
    },
    {
      id: 2,
      nome: "Dra. Maria Santos",
      email: "maria.santos@vidaplus.com",
      telefone: "(11) 98765-4322",
      especialidade: "Clínica Geral",
      crm: "CRM/SP 123457",
      status: "ativo",
      consultasRealizadas: 189,
      pacientesAtivos: 28,
      avaliacaoMedia: 4.7,
    },
    {
      id: 3,
      nome: "Dr. Carlos Oliveira",
      email: "carlos.oliveira@vidaplus.com",
      telefone: "(11) 98765-4323",
      especialidade: "Dermatologia",
      crm: "CRM/SP 123458",
      status: "ativo",
      consultasRealizadas: 156,
      pacientesAtivos: 24,
      avaliacaoMedia: 4.6,
    },
  ]);

  const [busca, setBusca] = useState("");
  const [expandido, setExpandido] = useState<number | null>(null);

  const profissionaisFiltrados = profissionais.filter(
    (prof) =>
      prof.nome.toLowerCase().includes(busca.toLowerCase()) ||
      prof.especialidade.toLowerCase().includes(busca.toLowerCase()) ||
      prof.crm.toLowerCase().includes(busca.toLowerCase())
  );

  const resumo = {
    totalProfissionais: profissionais.length,
    profissionaisAtivos: profissionais.filter((p) => p.status === "ativo").length,
    consultasTotal: profissionais.reduce((sum, p) => sum + p.consultasRealizadas, 0),
    avaliacaoMedia: (
      profissionais.reduce((sum, p) => sum + p.avaliacaoMedia, 0) / profissionais.length
    ).toFixed(1),
  };

  return (
    <DashboardLayout title="Gestão de Profissionais">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Profissionais</h1>
            <p className="text-gray-600 mt-1">Gerencie os profissionais de saúde do sistema</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Profissional
          </Button>
        </div>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total de Profissionais</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumo.totalProfissionais}</div>
              <p className="text-xs text-green-600 mt-1">✓ {resumo.profissionaisAtivos} ativos</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Consultas Realizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumo.consultasTotal}</div>
              <p className="text-xs text-gray-500 mt-1">Média: {(resumo.consultasTotal / resumo.totalProfissionais).toFixed(0)} por profissional</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avaliação Média</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resumo.avaliacaoMedia}</div>
              <p className="text-xs text-yellow-600 mt-1">★★★★★ (5.0)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Especialidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(profissionais.map((p) => p.especialidade)).size}</div>
              <p className="text-xs text-gray-500 mt-1">Diferentes especialidades</p>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Busca */}
        <Card>
          <CardHeader>
            <CardTitle>Buscar Profissionais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, especialidade ou CRM..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Profissionais */}
        <div className="space-y-3">
          {profissionaisFiltrados.map((prof) => (
            <Card key={prof.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {prof.nome.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{prof.nome}</h3>
                        <p className="text-sm text-gray-600">{prof.especialidade}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          prof.status === "ativo"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {prof.status === "ativo" ? "Ativo" : "Inativo"}
                      </span>
                    </div>

                    {expandido === prof.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-600">Email</p>
                              <p className="text-sm font-medium text-gray-900">{prof.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-600">Telefone</p>
                              <p className="text-sm font-medium text-gray-900">{prof.telefone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-gray-400" />
                            <div>
                              <p className="text-xs text-gray-600">CRM</p>
                              <p className="text-sm font-medium text-gray-900">{prof.crm}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Avaliação</p>
                            <p className="text-sm font-medium text-yellow-600">★ {prof.avaliacaoMedia}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 bg-gray-50 p-3 rounded">
                          <div>
                            <p className="text-xs text-gray-600">Consultas Realizadas</p>
                            <p className="text-lg font-bold text-gray-900">{prof.consultasRealizadas}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Pacientes Ativos</p>
                            <p className="text-lg font-bold text-gray-900">{prof.pacientesAtivos}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-600">Taxa de Ocupação</p>
                            <p className="text-lg font-bold text-gray-900">
                              {((prof.pacientesAtivos / 50) * 100).toFixed(0)}%
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandido(expandido === prof.id ? null : prof.id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
