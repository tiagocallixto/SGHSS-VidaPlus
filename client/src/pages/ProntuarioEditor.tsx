import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, FileText, Clock, Lock, Download } from "lucide-react";
import DashboardLayoutCustom from "@/components/DashboardLayoutCustom";

interface Prontuario {
  id: number;
  paciente: { name: string; cpf: string; dataNascimento: string };
  profissional: { name: string; crm: string; especialidade: string };
  conteudo: string;
  versao: number;
  assinado: boolean;
  dataAssinatura?: string;
  dataAtualizacao: string;
}

const mockProntuario: Prontuario = {
  id: 1,
  paciente: {
    name: "João Silva",
    cpf: "123.456.789-00",
    dataNascimento: "1985-05-15",
  },
  profissional: {
    name: "Dr. Carlos Santos",
    crm: "123456/SP",
    especialidade: "Cardiologia",
  },
  conteudo: `PRONTUÁRIO ELETRÔNICO DO PACIENTE

Paciente: João Silva
Data de Nascimento: 15/05/1985
CPF: 123.456.789-00

QUEIXA PRINCIPAL:
Dor no peito há 3 dias

HISTÓRIA DA DOENÇA ATUAL:
Paciente relata dor torácica de início súbito, irradiada para o braço esquerdo, acompanhada de dispneia.

ANTECEDENTES PESSOAIS:
- Hipertensão arterial
- Diabetes mellitus tipo 2
- Tabagismo (ex-fumante)

ANTECEDENTES FAMILIARES:
- Pai com infarto do miocárdio aos 60 anos

EXAME FÍSICO:
- PA: 150/90 mmHg
- FC: 88 bpm
- FR: 18 rpm
- Ausculta cardíaca: ritmo regular

DIAGNÓSTICO PROVISÓRIO:
Síndrome coronariana aguda

CONDUTA:
- Internação para monitoramento
- Realização de eletrocardiograma
- Dosagem de troponina
- Ecocardiograma transtorácico
- Medicação: AAS 500mg, Metoprolol 50mg`,
  versao: 2,
  assinado: false,
  dataAtualizacao: "2025-11-13T14:30:00",
};

export default function ProntuarioEditor() {
  const [prontuario, setProntuario] = useState<Prontuario>(mockProntuario);
  const [conteudo, setConteudo] = useState(prontuario.conteudo);
  const [isSaving, setIsSaving] = useState(false);
  const [showSignModal, setShowSignModal] = useState(false);
  const [senha, setSenha] = useState("");

  const handleSave = async () => {
    setIsSaving(true);
    // Simular salvamento
    setTimeout(() => {
      setProntuario({
        ...prontuario,
        conteudo,
        versao: prontuario.versao + 1,
        dataAtualizacao: new Date().toISOString(),
      });
      setIsSaving(false);
      alert("Prontuário salvo com sucesso!");
    }, 1000);
  };

  const handleSign = async () => {
    if (!senha) {
      alert("Por favor, digite sua senha");
      return;
    }
    // Simular assinatura
    setTimeout(() => {
      setProntuario({
        ...prontuario,
        assinado: true,
        dataAssinatura: new Date().toISOString(),
      });
      setShowSignModal(false);
      setSenha("");
      alert("Prontuário assinado com sucesso!");
    }, 1000);
  };

  const handleExportPDF = () => {
    alert("Exportação para PDF será implementada em breve");
  };

  return (
    <DashboardLayoutCustom title="Editor de Prontuários">
      <div className="space-y-6">
        {/* Informações do Paciente */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Paciente</p>
                <p className="font-semibold">{prontuario.paciente.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CPF</p>
                <p className="font-semibold">{prontuario.paciente.cpf}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data de Nascimento</p>
                <p className="font-semibold">
                  {new Date(prontuario.paciente.dataNascimento).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações do Profissional */}
        <Card>
          <CardHeader>
            <CardTitle>Profissional Responsável</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-semibold">{prontuario.profissional.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">CRM</p>
                <p className="font-semibold">{prontuario.profissional.crm}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Especialidade</p>
                <p className="font-semibold">{prontuario.profissional.especialidade}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status do Prontuário */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Status do Prontuário</span>
              <div className="flex gap-2">
                <Badge variant="outline">Versão {prontuario.versao}</Badge>
                {prontuario.assinado ? (
                  <Badge className="bg-green-100 text-green-800">
                    <Lock className="w-3 h-3 mr-1" />
                    Assinado
                  </Badge>
                ) : (
                  <Badge className="bg-yellow-100 text-yellow-800">Rascunho</Badge>
                )}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Última Atualização</p>
                <p className="font-semibold">
                  {new Date(prontuario.dataAtualizacao).toLocaleString("pt-BR")}
                </p>
              </div>
              {prontuario.assinado && prontuario.dataAssinatura && (
                <div>
                  <p className="text-sm text-gray-600">Data da Assinatura</p>
                  <p className="font-semibold">
                    {new Date(prontuario.dataAssinatura).toLocaleString("pt-BR")}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Editor de Conteúdo */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Conteúdo do Prontuário
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              placeholder="Digite o conteúdo do prontuário aqui..."
              className="min-h-96 font-mono text-sm"
              disabled={prontuario.assinado}
            />

            {prontuario.assinado && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center gap-2 text-blue-800 text-sm">
                <Lock className="w-4 h-4" />
                <p>Este prontuário está assinado e não pode ser editado. Crie uma nova versão se necessário.</p>
              </div>
            )}

            {/* Controles */}
            <div className="flex gap-2 flex-wrap">
              <Button
                onClick={handleSave}
                disabled={isSaving || prontuario.assinado}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </Button>

              <Button
                onClick={() => setShowSignModal(true)}
                variant="default"
                disabled={prontuario.assinado}
                className="gap-2"
              >
                <Lock className="w-4 h-4" />
                Assinar Digitalmente
              </Button>

              <Button
                onClick={handleExportPDF}
                variant="outline"
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Exportar PDF
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Histórico de Versões */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Histórico de Versões
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-semibold">Versão {prontuario.versao}</p>
                <p className="text-sm text-gray-600">
                  {new Date(prontuario.dataAtualizacao).toLocaleString("pt-BR")}
                </p>
                <p className="text-sm text-gray-600">Editado por: {prontuario.profissional.name}</p>
              </div>
              <div className="border-l-4 border-gray-300 pl-4 py-2">
                <p className="font-semibold">Versão 1</p>
                <p className="text-sm text-gray-600">13/11/2025 às 10:00</p>
                <p className="text-sm text-gray-600">Criado por: {prontuario.profissional.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Modal de Assinatura */}
        {showSignModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Assinar Prontuário Digitalmente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Senha de Confirmação</label>
                  <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full mt-2 px-3 py-2 border rounded-lg"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Ao assinar, você confirma que revisou e aprova o conteúdo deste prontuário.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={handleSign}
                    className="flex-1"
                  >
                    Assinar
                  </Button>
                  <Button
                    onClick={() => {
                      setShowSignModal(false);
                      setSenha("");
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayoutCustom>
  );
}
