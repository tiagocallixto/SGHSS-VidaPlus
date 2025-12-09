import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Share2, Lock, Calendar, User, AlertCircle, Pill, Heart, Zap } from "lucide-react";

interface ProntuarioItem {
  id: number;
  data: string;
  profissional: string;
  especialidade: string;
  diagnostico: string;
  tratamento: string;
  observacoes: string;
}

export default function PacienteProntuario() {
  const [prontuario] = useState({
    paciente: "João da Silva",
    cpf: "123.456.789-00",
    dataNascimento: "1985-05-15",
    sexo: "Masculino",
    tipoSanguineo: "O+",
    alergias: ["Penicilina", "Dipirona"],
    medicamentos: ["Losartana 50mg", "Atorvastatina 20mg"],
    historicoMedico: [
      "Hipertensão",
      "Colesterol alto",
      "Diabetes tipo 2",
    ],
  });

  const [registros] = useState<ProntuarioItem[]>([
    {
      id: 1,
      data: "2025-01-15",
      profissional: "Dra. Maria Santos",
      especialidade: "Clínica Geral",
      diagnostico: "Hipertensão controlada",
      tratamento: "Continuar com Losartana 50mg",
      observacoes: "Paciente apresenta boa adesão ao tratamento",
    },
    {
      id: 2,
      data: "2024-12-10",
      profissional: "Dr. João Silva",
      especialidade: "Cardiologia",
      diagnostico: "Pressão arterial elevada",
      tratamento: "Aumentar dose de anti-hipertensivo",
      observacoes: "Recomendado exercício físico regular",
    },
    {
      id: 3,
      data: "2024-11-05",
      profissional: "Dra. Ana Costa",
      especialidade: "Endocrinologia",
      diagnostico: "Diabetes tipo 2 compensada",
      tratamento: "Manter medicação atual",
      observacoes: "Glicemia em níveis aceitáveis",
    },
  ]);

  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <DashboardLayout title="Meu Prontuário">
      <div className="space-y-6">
        {/* Informações Pessoais */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Informações Pessoais</CardTitle>
                <CardDescription>Dados cadastrais e informações médicas</CardDescription>
              </div>
              <Lock className="w-6 h-6 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-xs text-gray-500 mb-1">Nome Completo</p>
                <p className="font-semibold text-gray-900">{prontuario.paciente}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">CPF</p>
                <p className="font-semibold text-gray-900">{prontuario.cpf}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Data de Nascimento</p>
                <p className="font-semibold text-gray-900">
                  {new Date(prontuario.dataNascimento).toLocaleDateString("pt-BR")}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Sexo</p>
                <p className="font-semibold text-gray-900">{prontuario.sexo}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações Médicas Críticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tipo Sanguíneo */}
          <Card className="border-0 shadow-md border-l-4 border-red-500">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tipo Sanguíneo</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {prontuario.tipoSanguineo}
                  </p>
                </div>
                <Heart className="w-12 h-12 text-red-500 opacity-20" />
              </div>
            </CardContent>
          </Card>

          {/* Alergias */}
          <Card className="border-0 shadow-md border-l-4 border-orange-500">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Alergias Conhecidas</p>
                <div className="flex flex-wrap gap-2">
                  {prontuario.alergias.map((alergia, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-semibold"
                    >
                      {alergia}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medicamentos */}
          <Card className="border-0 shadow-md border-l-4 border-green-500">
            <CardContent className="pt-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Medicamentos em Uso</p>
                <div className="space-y-1">
                  {prontuario.medicamentos.map((med, idx) => (
                    <p key={idx} className="text-sm text-gray-900 flex items-center gap-2">
                      <Pill className="w-4 h-4 text-green-600" />
                      {med}
                    </p>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Histórico Médico */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
            <CardTitle className="text-lg">Histórico Médico</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              {prontuario.historicoMedico.map((condicao, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <span className="text-gray-900 font-medium">{condicao}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Registros de Consultas */}
        <Card className="border-0 shadow-md">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Histórico de Consultas</CardTitle>
                <CardDescription>Registros detalhados de todas as consultas</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-3">
              {registros.map((registro) => (
                <div
                  key={registro.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition"
                >
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === registro.id ? null : registro.id)
                    }
                    className="w-full p-4 hover:bg-gray-50 transition text-left"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Calendar className="w-5 h-5 text-blue-600" />
                          <p className="font-semibold text-gray-900">
                            {new Date(registro.data).toLocaleDateString("pt-BR")}
                          </p>
                          <span className="text-sm text-gray-600">
                            {registro.especialidade}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">
                          <User className="w-4 h-4 inline mr-2" />
                          {registro.profissional}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          Diagnóstico: {registro.diagnostico}
                        </p>
                      </div>
                      <div
                        className={`transform transition ${
                          expandedId === registro.id ? "rotate-180" : ""
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

                  {expandedId === registro.id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Tratamento Recomendado</p>
                          <p className="text-gray-900">{registro.tratamento}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Observações</p>
                          <p className="text-gray-900">{registro.observacoes}</p>
                        </div>
                        <div className="flex gap-2 pt-3 border-t border-gray-200">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar Registro
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Share2 className="w-4 h-4 mr-2" />
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Aviso de Segurança */}
        <Card className="border-0 shadow-md bg-blue-50 border-l-4 border-blue-600">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-900 mb-1">Segurança e Privacidade</p>
                <p className="text-sm text-blue-800">
                  Seu prontuário é protegido por criptografia e conformidade com LGPD. Apenas profissionais autorizados podem acessar seus dados. Você pode revogar acesso a qualquer momento.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
