import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Calendar, FileText, Plus, Search, Filter, Edit, Eye, Trash2 } from "lucide-react";

interface Paciente {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  sexo: string;
  ultimaConsulta: string;
  proximaConsulta?: string;
  totalConsultas: number;
  status: "ativo" | "inativo";
}

export default function ProfissionalPacientes() {
  const [pacientes] = useState<Paciente[]>([
    {
      id: 1,
      nome: "João da Silva",
      cpf: "123.456.789-00",
      email: "joao.silva@gmail.com",
      telefone: "(11) 98765-4321",
      dataNascimento: "1985-05-15",
      sexo: "Masculino",
      ultimaConsulta: "2025-01-15",
      proximaConsulta: "2025-02-20",
      totalConsultas: 12,
      status: "ativo",
    },
    {
      id: 2,
      nome: "Maria Santos",
      cpf: "987.654.321-00",
      email: "maria.santos@gmail.com",
      telefone: "(11) 91234-5678",
      dataNascimento: "1990-03-22",
      sexo: "Feminino",
      ultimaConsulta: "2025-01-10",
      proximaConsulta: "2025-02-18",
      totalConsultas: 8,
      status: "ativo",
    },
    {
      id: 3,
      nome: "Carlos Oliveira",
      cpf: "456.789.123-00",
      email: "carlos.oliveira@hotmail.com",
      telefone: "(11) 99876-5432",
      dataNascimento: "1988-07-30",
      sexo: "Masculino",
      ultimaConsulta: "2024-12-20",
      totalConsultas: 5,
      status: "ativo",
    },
    {
      id: 4,
      nome: "Ana Costa",
      cpf: "789.123.456-00",
      email: "ana.costa@outlook.com",
      telefone: "(11) 98765-1234",
      dataNascimento: "1992-11-08",
      sexo: "Feminino",
      ultimaConsulta: "2024-11-15",
      totalConsultas: 3,
      status: "inativo",
    },
    {
      id: 5,
      nome: "Pedro Ferreira",
      cpf: "321.654.987-00",
      email: "pedro.ferreira@yahoo.com",
      telefone: "(11) 91111-2222",
      dataNascimento: "1980-02-14",
      sexo: "Masculino",
      ultimaConsulta: "2025-01-20",
      proximaConsulta: "2025-02-25",
      totalConsultas: 15,
      status: "ativo",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredPacientes = pacientes.filter((paciente) => {
    const matchSearch =
      paciente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      paciente.cpf.includes(searchTerm) ||
      paciente.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = filterStatus === "todos" || paciente.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const totalPacientes = pacientes.length;
  const pacientesAtivos = pacientes.filter((p) => p.status === "ativo").length;
  const pacientesInativos = pacientes.filter((p) => p.status === "inativo").length;
  const consultasTotal = pacientes.reduce((acc, p) => acc + p.totalConsultas, 0);

  return (
    <DashboardLayout title="Meus Pacientes">
      <div className="space-y-6">
        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Pacientes</p>
                  <p className="text-2xl font-bold text-gray-900">{totalPacientes}</p>
                </div>
                <User className="w-12 h-12 text-blue-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pacientes Ativos</p>
                  <p className="text-2xl font-bold text-gray-900">{pacientesAtivos}</p>
                </div>
                <User className="w-12 h-12 text-green-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pacientes Inativos</p>
                  <p className="text-2xl font-bold text-gray-900">{pacientesInativos}</p>
                </div>
                <User className="w-12 h-12 text-gray-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total de Consultas</p>
                  <p className="text-2xl font-bold text-gray-900">{consultasTotal}</p>
                </div>
                <Calendar className="w-12 h-12 text-purple-600 opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="pt-6">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Paciente
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Busca */}
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, CPF ou email..."
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
                <option value="todos">Todos os Status</option>
                <option value="ativo">Ativos</option>
                <option value="inativo">Inativos</option>
              </select>

              {/* Botões */}
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4 mr-2" />
                Filtrar
              </Button>

              <Button variant="outline" className="w-full">
                Exportar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Pacientes */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Lista de Pacientes</CardTitle>
                <CardDescription>
                  {filteredPacientes.length} paciente{filteredPacientes.length !== 1 ? "s" : ""} encontrado{filteredPacientes.length !== 1 ? "s" : ""}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {filteredPacientes.length === 0 ? (
              <div className="text-center py-12">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Nenhum paciente encontrado</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPacientes.map((paciente) => (
                  <div
                    key={paciente.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                  >
                    <button
                      onClick={() =>
                        setExpandedId(expandedId === paciente.id ? null : paciente.id)
                      }
                      className="w-full p-4 hover:bg-gray-50 transition text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{paciente.nome}</p>
                              <p className="text-sm text-gray-600">{paciente.cpf}</p>
                            </div>
                          </div>
                          <div className="flex gap-4 text-sm text-gray-600 ml-13">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {paciente.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {paciente.telefone}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                paciente.status === "ativo"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {paciente.status === "ativo" ? "Ativo" : "Inativo"}
                            </span>
                          </div>
                        </div>
                        <div
                          className={`transform transition ${
                            expandedId === paciente.id ? "rotate-180" : ""
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

                    {expandedId === paciente.id && (
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Data de Nascimento</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Sexo</p>
                            <p className="font-semibold text-gray-900">{paciente.sexo}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Última Consulta</p>
                            <p className="font-semibold text-gray-900">
                              {new Date(paciente.ultimaConsulta).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Total de Consultas</p>
                            <p className="font-semibold text-gray-900">{paciente.totalConsultas}</p>
                          </div>
                        </div>

                        {paciente.proximaConsulta && (
                          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-xs text-blue-600 mb-1">Próxima Consulta</p>
                            <p className="font-semibold text-blue-900">
                              {new Date(paciente.proximaConsulta).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        )}

                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Prontuário
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <FileText className="w-4 h-4 mr-2" />
                            Histórico
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 text-red-600 hover:text-red-700"
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
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
