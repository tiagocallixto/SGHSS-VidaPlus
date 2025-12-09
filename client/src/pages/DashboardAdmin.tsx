import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, TrendingUp, AlertCircle, Plus, Edit, Trash2, Eye } from "lucide-react";

interface Usuario {
  id: number;
  nome: string;
  email: string;
  role: "user" | "professional" | "admin";
  status: "ativo" | "inativo";
  dataCadastro: string;
}

interface Estatistica {
  label: string;
  valor: number;
  crescimento: number;
  icon: React.ReactNode;
}

export default function DashboardAdmin() {
  const [usuarios] = useState<Usuario[]>([
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria.silva@vidaplus.com",
      role: "user",
      status: "ativo",
      dataCadastro: "2025-01-10",
    },
    {
      id: 2,
      nome: "Dr. João Santos",
      email: "joao.santos@vidaplus.com",
      role: "professional",
      status: "ativo",
      dataCadastro: "2025-01-05",
    },
    {
      id: 3,
      nome: "Admin Sistema",
      email: "admin@vidaplus.com",
      role: "admin",
      status: "ativo",
      dataCadastro: "2024-12-01",
    },
  ]);

  const [estatisticas] = useState<Estatistica[]>([
    {
      label: "Total de Usuários",
      valor: 156,
      crescimento: 12,
      icon: <Users className="w-12 h-12 text-blue-600 opacity-20" />,
    },
    {
      label: "Pacientes",
      valor: 98,
      crescimento: 8,
      icon: <Users className="w-12 h-12 text-green-600 opacity-20" />,
    },
    {
      label: "Profissionais",
      valor: 24,
      crescimento: 2,
      icon: <Users className="w-12 h-12 text-indigo-600 opacity-20" />,
    },
    {
      label: "Consultas Realizadas",
      valor: 342,
      crescimento: 28,
      icon: <TrendingUp className="w-12 h-12 text-yellow-600 opacity-20" />,
    },
  ]);

  const getRoleBadge = (role: string) => {
    const roleMap: Record<string, { bg: string; text: string; label: string }> = {
      user: { bg: "bg-blue-100", text: "text-blue-800", label: "Paciente" },
      professional: { bg: "bg-green-100", text: "text-green-800", label: "Profissional" },
      admin: { bg: "bg-red-100", text: "text-red-800", label: "Administrador" },
    };
    const config = roleMap[role] || roleMap.user;
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    return (
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          status === "ativo"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {status === "ativo" ? "Ativo" : "Inativo"}
      </span>
    );
  };

  return (
    <DashboardLayout title="Painel Administrativo">
      <div className="space-y-6">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {estatisticas.map((stat, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.valor}</p>
                    <p className="text-xs text-green-600 mt-1">
                      ↑ {stat.crescimento}% este mês
                    </p>
                  </div>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alertas */}
        <Card className="border-0 shadow-md border-l-4 border-yellow-500 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-yellow-900 mb-1">Atenção</p>
                <p className="text-sm text-yellow-800">
                  Você tem 3 consultas não confirmadas para hoje. Recomenda-se contatar os pacientes.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Gestão de Usuários */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Gestão de Usuários</CardTitle>
                <CardDescription>Gerenciar usuários do sistema</CardDescription>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Novo Usuário
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nome</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tipo</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Data Cadastro</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario) => (
                    <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-900 font-medium">{usuario.nome}</td>
                      <td className="py-3 px-4 text-gray-600">{usuario.email}</td>
                      <td className="py-3 px-4">{getRoleBadge(usuario.role)}</td>
                      <td className="py-3 px-4">{getStatusBadge(usuario.status)}</td>
                      <td className="py-3 px-4 text-gray-600">{usuario.dataCadastro}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-gray-200 rounded transition">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded transition">
                            <Edit className="w-4 h-4 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-200 rounded transition">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Relatórios Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="text-lg">Consultas por Mês</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Janeiro</p>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">75</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Fevereiro</p>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "92%" }}></div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">92</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Março (até agora)</p>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">45</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Relatório Completo
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="text-lg">Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Novo paciente cadastrado</p>
                    <p className="text-xs text-gray-500">há 2 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Consulta realizada</p>
                    <p className="text-xs text-gray-500">há 4 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Prontuário atualizado</p>
                    <p className="text-xs text-gray-500">há 6 horas</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Ver Todos os Logs
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
