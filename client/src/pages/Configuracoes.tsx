import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayoutCustom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Lock, Bell, Eye, EyeOff, Save, X, CheckCircle, AlertCircle } from "lucide-react";

export default function Configuracoes() {
  const [activeTab, setActiveTab] = useState<"perfil" | "seguranca" | "notificacoes" | "privacidade">("perfil");
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [perfil, setPerfil] = useState({
    nome: "João da Silva",
    email: "joao.silva@vidaplus.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    dataNascimento: "1985-05-15",
    sexo: "Masculino",
    endereco: "Rua das Flores, 123",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
  });

  const [seguranca, setSeguranca] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
    autenticacaoDois: true,
    ultimoAcesso: "2025-01-15 14:30",
  });

  const [notificacoes, setNotificacoes] = useState({
    emailConsultas: true,
    emailProntuario: true,
    emailRelatorios: false,
    smsLembrete: true,
    notificacoesPush: true,
  });

  const [privacidade, setPrivacidade] = useState({
    perfilPublico: false,
    compartilharDados: false,
    receberNewsletter: true,
    rastreamento: false,
  });

  const handleSalvarPerfil = () => {
    setMensagem({ tipo: "sucesso", texto: "Perfil atualizado com sucesso!" });
    setEditando(false);
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleAlterarSenha = () => {
    if (seguranca.novaSenha !== seguranca.confirmarSenha) {
      setMensagem({ tipo: "erro", texto: "As senhas não coincidem!" });
      return;
    }
    setMensagem({ tipo: "sucesso", texto: "Senha alterada com sucesso!" });
    setSeguranca({ ...seguranca, senhaAtual: "", novaSenha: "", confirmarSenha: "" });
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleSalvarNotificacoes = () => {
    setMensagem({ tipo: "sucesso", texto: "Preferências de notificação atualizadas!" });
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleSalvarPrivacidade = () => {
    setMensagem({ tipo: "sucesso", texto: "Configurações de privacidade atualizadas!" });
    setTimeout(() => setMensagem(null), 3000);
  };

  return (
    <DashboardLayout title="Configurações">
      <div className="space-y-6">
        {/* Mensagem de Feedback */}
        {mensagem && (
          <Card
            className={`border-0 shadow-md ${
              mensagem.tipo === "sucesso"
                ? "bg-green-50 border-l-4 border-green-600"
                : "bg-red-50 border-l-4 border-red-600"
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                {mensagem.tipo === "sucesso" ? (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                )}
                <p
                  className={`font-semibold ${
                    mensagem.tipo === "sucesso"
                      ? "text-green-900"
                      : "text-red-900"
                  }`}
                >
                  {mensagem.texto}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Abas */}
        <Card className="border-0 shadow-md">
          <CardContent className="pt-6">
            <div className="flex gap-2 border-b border-gray-200">
              {[
                { id: "perfil", label: "Perfil", icon: User },
                { id: "seguranca", label: "Segurança", icon: Lock },
                { id: "notificacoes", label: "Notificações", icon: Bell },
                { id: "privacidade", label: "Privacidade", icon: Eye },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600 font-semibold"
                        : "border-transparent text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo das Abas */}

        {/* Aba: Perfil */}
        {activeTab === "perfil" && (
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Meu Perfil</CardTitle>
                  <CardDescription>Informações pessoais e de contato</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setEditando(!editando)}
                >
                  {editando ? "Cancelar" : "Editar"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: "Nome Completo", key: "nome" },
                  { label: "Email", key: "email" },
                  { label: "Telefone", key: "telefone" },
                  { label: "CPF", key: "cpf" },
                  { label: "Data de Nascimento", key: "dataNascimento" },
                  { label: "Sexo", key: "sexo" },
                  { label: "Endereço", key: "endereco" },
                  { label: "Cidade", key: "cidade" },
                  { label: "Estado", key: "estado" },
                  { label: "CEP", key: "cep" },
                ].map((campo) => (
                  <div key={campo.key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {campo.label}
                    </label>
                    <input
                      type="text"
                      value={perfil[campo.key as keyof typeof perfil]}
                      onChange={(e) =>
                        setPerfil({
                          ...perfil,
                          [campo.key]: e.target.value,
                        })
                      }
                      disabled={!editando}
                      className={`w-full px-4 py-2 border border-gray-300 rounded-lg ${
                        editando
                          ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    />
                  </div>
                ))}
              </div>

              {editando && (
                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                  <Button
                    onClick={handleSalvarPerfil}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditando(false)}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancelar
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Aba: Segurança */}
        {activeTab === "seguranca" && (
          <div className="space-y-6">
            {/* Alterar Senha */}
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
                <CardTitle>Alterar Senha</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Senha Atual
                    </label>
                    <div className="relative">
                      <input
                        type={mostrarSenha ? "text" : "password"}
                        value={seguranca.senhaAtual}
                        onChange={(e) =>
                          setSeguranca({
                            ...seguranca,
                            senhaAtual: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      />
                      <button
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        className="absolute right-3 top-2.5 text-gray-600"
                      >
                        {mostrarSenha ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Nova Senha
                    </label>
                    <input
                      type={mostrarSenha ? "text" : "password"}
                      value={seguranca.novaSenha}
                      onChange={(e) =>
                        setSeguranca({
                          ...seguranca,
                          novaSenha: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirmar Nova Senha
                    </label>
                    <input
                      type={mostrarSenha ? "text" : "password"}
                      value={seguranca.confirmarSenha}
                      onChange={(e) =>
                        setSeguranca({
                          ...seguranca,
                          confirmarSenha: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <Button
                    onClick={handleAlterarSenha}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Autenticação de Dois Fatores */}
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                <CardTitle>Autenticação de Dois Fatores</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {seguranca.autenticacaoDois
                        ? "Ativada"
                        : "Desativada"}
                    </p>
                    <p className="text-sm text-gray-600">
                      Adicione uma camada extra de segurança
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setSeguranca({
                        ...seguranca,
                        autenticacaoDois: !seguranca.autenticacaoDois,
                      })
                    }
                  >
                    {seguranca.autenticacaoDois
                      ? "Desativar"
                      : "Ativar"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Último Acesso */}
            <Card className="border-0 shadow-md">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <CardTitle>Último Acesso</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-900">
                  <strong>Data e Hora:</strong> {seguranca.ultimoAcesso}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Aba: Notificações */}
        {activeTab === "notificacoes" && (
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
              <CardTitle>Preferências de Notificação</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    key: "emailConsultas",
                    label: "Email sobre Consultas",
                    desc: "Receba notificações sobre agendamentos e cancelamentos",
                  },
                  {
                    key: "emailProntuario",
                    label: "Email sobre Prontuário",
                    desc: "Notificações quando seu prontuário for atualizado",
                  },
                  {
                    key: "emailRelatorios",
                    label: "Email com Relatórios",
                    desc: "Receba relatórios e resumos periódicos",
                  },
                  {
                    key: "smsLembrete",
                    label: "SMS de Lembrete",
                    desc: "Lembretes via SMS antes das consultas",
                  },
                  {
                    key: "notificacoesPush",
                    label: "Notificações Push",
                    desc: "Notificações em tempo real no aplicativo",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={
                        notificacoes[
                          item.key as keyof typeof notificacoes
                        ] as boolean
                      }
                      onChange={(e) =>
                        setNotificacoes({
                          ...notificacoes,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSalvarNotificacoes}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Preferências
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Aba: Privacidade */}
        {activeTab === "privacidade" && (
          <Card className="border-0 shadow-md">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b">
              <CardTitle>Configurações de Privacidade</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  {
                    key: "perfilPublico",
                    label: "Perfil Público",
                    desc: "Permitir que outros usuários vejam seu perfil",
                  },
                  {
                    key: "compartilharDados",
                    label: "Compartilhar Dados",
                    desc: "Compartilhar dados com pesquisas e análises",
                  },
                  {
                    key: "receberNewsletter",
                    label: "Receber Newsletter",
                    desc: "Receber informações e atualizações por email",
                  },
                  {
                    key: "rastreamento",
                    label: "Rastreamento",
                    desc: "Permitir rastreamento de atividades para melhorias",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={
                        privacidade[
                          item.key as keyof typeof privacidade
                        ] as boolean
                      }
                      onChange={(e) =>
                        setPrivacidade({
                          ...privacidade,
                          [item.key]: e.target.checked,
                        })
                      }
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>

              <Button
                onClick={handleSalvarPrivacidade}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
