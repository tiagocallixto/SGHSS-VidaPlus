import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, MapPin, FileText, CheckCircle, AlertCircle } from "lucide-react";

interface Profissional {
  id: number;
  nome: string;
  especialidade: string;
  crm: string;
  disponibilidade: string;
}

interface HorarioDisponivel {
  data: string;
  horarios: string[];
}

export default function PacienteAgendamento() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    profissional: "",
    especialidade: "",
    data: "",
    hora: "",
    tipo: "presencial" as "presencial" | "telemedicina",
    motivo: "",
  });

  const [sucesso, setSucesso] = useState(false);

  const profissionais: Profissional[] = [
    {
      id: 1,
      nome: "Dr. João Silva",
      especialidade: "Cardiologia",
      crm: "123456/SP",
      disponibilidade: "Seg-Sex, 08:00-18:00",
    },
    {
      id: 2,
      nome: "Dra. Maria Santos",
      especialidade: "Clínica Geral",
      crm: "789012/SP",
      disponibilidade: "Seg-Sex, 09:00-17:00",
    },
    {
      id: 3,
      nome: "Dr. Carlos Oliveira",
      especialidade: "Dermatologia",
      crm: "345678/SP",
      disponibilidade: "Ter-Sex, 10:00-16:00",
    },
  ];

  const horariosDisponiveis: HorarioDisponivel[] = [
    { data: "2025-02-17", horarios: ["09:00", "10:00", "14:00", "15:00"] },
    { data: "2025-02-18", horarios: ["09:30", "11:00", "14:30", "16:00"] },
    { data: "2025-02-19", horarios: ["10:00", "11:30", "15:00", "16:30"] },
    { data: "2025-02-20", horarios: ["09:00", "10:30", "14:00", "15:30"] },
  ];

  const handleProfissionalSelect = (id: number) => {
    const prof = profissionais.find((p) => p.id === id);
    if (prof) {
      setFormData({
        ...formData,
        profissional: prof.nome,
        especialidade: prof.especialidade,
      });
      setStep(2);
    }
  };

  const handleDataSelect = (data: string) => {
    setFormData({ ...formData, data });
  };

  const handleHoraSelect = (hora: string) => {
    setFormData({ ...formData, hora });
    setStep(3);
  };

  const handleConfirmar = () => {
    setSucesso(true);
    setTimeout(() => {
      setStep(1);
      setFormData({
        profissional: "",
        especialidade: "",
        data: "",
        hora: "",
        tipo: "presencial",
        motivo: "",
      });
      setSucesso(false);
    }, 3000);
  };

  return (
    <DashboardLayout title="Agendar Consulta">
      <div className="space-y-6">
        {/* Mensagem de Sucesso */}
        {sucesso && (
          <Card className="border-0 shadow-md bg-green-50 border-l-4 border-green-600">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900">Consulta agendada com sucesso!</p>
                  <p className="text-sm text-green-800">
                    Você receberá uma confirmação por email. Redirecionando...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Indicador de Progresso */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  s <= step
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Selecionar Profissional */}
        {step === 1 && (
          <div className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle>Passo 1: Selecione o Profissional</CardTitle>
                <CardDescription>Escolha o profissional desejado</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {profissionais.map((prof) => (
                    <button
                      key={prof.id}
                      onClick={() => handleProfissionalSelect(prof.id)}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition text-left"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{prof.nome}</p>
                          <p className="text-sm text-gray-600 mb-2">{prof.especialidade}</p>
                          <div className="flex gap-4 text-xs text-gray-500">
                            <span>CRM: {prof.crm}</span>
                            <span>{prof.disponibilidade}</span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Selecionar Data e Hora */}
        {step === 2 && (
          <div className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle>Passo 2: Selecione a Data e Hora</CardTitle>
                <CardDescription>
                  Profissional: {formData.profissional} ({formData.especialidade})
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {horariosDisponiveis.map((item) => (
                    <div key={item.data}>
                      <p className="font-semibold text-gray-900 mb-3">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        {new Date(item.data).toLocaleDateString("pt-BR", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {item.horarios.map((hora) => (
                          <button
                            key={hora}
                            onClick={() => {
                              handleDataSelect(item.data);
                              handleHoraSelect(hora);
                            }}
                            className="p-3 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition font-semibold text-gray-900"
                          >
                            {hora}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Button
              variant="outline"
              onClick={() => setStep(1)}
              className="w-full"
            >
              Voltar
            </Button>
          </div>
        )}

        {/* Step 3: Tipo e Motivo */}
        {step === 3 && (
          <div className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle>Passo 3: Tipo e Motivo da Consulta</CardTitle>
                <CardDescription>
                  {formData.profissional} - {formData.data} às {formData.hora}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Tipo de Consulta */}
                  <div>
                    <p className="font-semibold text-gray-900 mb-3">Tipo de Consulta</p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() =>
                          setFormData({ ...formData, tipo: "presencial" })
                        }
                        className={`p-4 border-2 rounded-lg transition ${
                          formData.tipo === "presencial"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <MapPin className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                        <p className="font-semibold text-gray-900">Presencial</p>
                        <p className="text-xs text-gray-600">No consultório</p>
                      </button>
                      <button
                        onClick={() =>
                          setFormData({ ...formData, tipo: "telemedicina" })
                        }
                        className={`p-4 border-2 rounded-lg transition ${
                          formData.tipo === "telemedicina"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Clock className="w-6 h-6 mx-auto mb-2 text-cyan-600" />
                        <p className="font-semibold text-gray-900">Telemedicina</p>
                        <p className="text-xs text-gray-600">Por videochamada</p>
                      </button>
                    </div>
                  </div>

                  {/* Motivo da Consulta */}
                  <div>
                    <label className="block font-semibold text-gray-900 mb-2">
                      Motivo da Consulta
                    </label>
                    <textarea
                      value={formData.motivo}
                      onChange={(e) =>
                        setFormData({ ...formData, motivo: e.target.value })
                      }
                      placeholder="Descreva o motivo da sua consulta..."
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button
                onClick={() => setStep(4)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                disabled={!formData.motivo}
              >
                Continuar
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmação */}
        {step === 4 && (
          <div className="space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                <CardTitle>Passo 4: Confirmação</CardTitle>
                <CardDescription>Revise os dados antes de confirmar</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Profissional</p>
                      <p className="font-semibold text-gray-900">
                        {formData.profissional}
                      </p>
                      <p className="text-sm text-gray-600">
                        {formData.especialidade}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Data e Hora</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(formData.data).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-sm text-gray-600">{formData.hora}</p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Tipo</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {formData.tipo}
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">Motivo</p>
                      <p className="font-semibold text-gray-900 truncate">
                        {formData.motivo.substring(0, 20)}...
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-blue-900 mb-1">
                          Informações Importantes
                        </p>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Você receberá uma confirmação por email</li>
                          <li>• Chegue 10 minutos antes da consulta</li>
                          <li>• Para cancelar, acesse "Minhas Consultas"</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(3)}
                className="flex-1"
              >
                Voltar
              </Button>
              <Button
                onClick={handleConfirmar}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Confirmar Agendamento
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
