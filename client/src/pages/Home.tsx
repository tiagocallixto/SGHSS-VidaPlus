import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl, APP_TITLE } from "@/const";
import { Heart, Users, Shield, Zap, ArrowRight, CheckCircle, Calendar, FileText, BarChart3 } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  const handleDashboardRedirect = () => {
    const role = user?.role as string;
    if (role === "professional") {
      navigate("/dashboard-profissional");
    } else if (role === "admin") {
      navigate("/dashboard-admin");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">{APP_TITLE}</span>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <>
                  <span className="text-sm text-gray-600">
                    Bem-vindo, <strong>{user?.name}</strong>
                  </span>
                  <Button
                    onClick={handleDashboardRedirect}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Ir para Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => navigate("/login")}
                  >
                    Começar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Gestão Hospitalar Inteligente e Segura
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                O VidaPlus é um sistema completo de gestão hospitalar que centraliza informações de pacientes, 
                profissionais de saúde e recursos, garantindo conformidade com LGPD e segurança de dados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Button
                    onClick={handleDashboardRedirect}
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 h-12"
                  >
                    Acessar Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => navigate("/login")}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 h-12"
                    >
                      Fazer Login
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button
                      onClick={() => navigate("/login")}
                      variant="outline"
                      size="lg"
                      className="h-12 border-2"
                    >
                      Saiba Mais
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8 flex items-center justify-center h-96">
              <div className="text-center">
                <Heart className="w-24 h-24 text-blue-600 mx-auto mb-4 opacity-80" />
                <p className="text-gray-600 font-semibold">Sistema Integrado de Saúde</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Funcionalidades Principais</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tudo que você precisa para gerenciar operações hospitalares de forma eficiente
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <Calendar className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Agendamento de Consultas</h3>
              <p className="text-gray-600 mb-4">
                Sistema inteligente de agendamento com suporte a consultas presenciais e telemedicina
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Agenda em tempo real
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Notificações automáticas
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Gerenciamento de cancelamentos
                </li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <FileText className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Prontuário Eletrônico</h3>
              <p className="text-gray-600 mb-4">
                Histórico clínico completo e seguro de cada paciente, acessível para profissionais autorizados
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Histórico clínico detalhado
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Receitas digitais
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Acesso controlado
                </li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <BarChart3 className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Relatórios e Análises</h3>
              <p className="text-gray-600 mb-4">
                Dashboards intuitivos com métricas operacionais e financeiras em tempo real
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Estatísticas de desempenho
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Relatórios customizáveis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Exportação de dados
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Por que escolher VidaPlus?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Benefícios que transformam a gestão hospitalar
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Segurança em Primeiro Lugar</h3>
                <p className="text-gray-600">
                  Conformidade total com LGPD, criptografia de dados sensíveis e controle de acesso baseado em papéis
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Zap className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Desempenho Otimizado</h3>
                <p className="text-gray-600">
                  API REST rápida e escalável, com tempo de resposta inferior a 500ms para operações críticas
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Fácil de Usar</h3>
                <p className="text-gray-600">
                  Interface intuitiva e responsiva, acessível em desktop, tablet e dispositivos móveis
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Heart className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Suporte Dedicado</h3>
                <p className="text-gray-600">
                  Equipe de suporte técnico disponível para auxiliar na implementação e operação do sistema
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Roles Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Para Todos os Perfis</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dashboards personalizados para cada tipo de usuário
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pacientes */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl border border-blue-200">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pacientes</h3>
              <p className="text-gray-700 mb-6">
                Gerencie suas consultas, visualize seu prontuário e acompanhe seu histórico clínico
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Agendar e remarcar consultas</li>
                <li>✓ Visualizar prontuário eletrônico</li>
                <li>✓ Histórico de consultas</li>
                <li>✓ Receitas digitais</li>
              </ul>
            </div>

            {/* Profissionais */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl border border-green-200">
              <Heart className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Profissionais</h3>
              <p className="text-gray-700 mb-6">
                Gerencie sua agenda, atualize prontuários e emita receitas digitais
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Visualizar agenda do dia</li>
                <li>✓ Atualizar prontuários</li>
                <li>✓ Emitir receitas digitais</li>
                <li>✓ Gerenciar pacientes</li>
              </ul>
            </div>

            {/* Administradores */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl border border-purple-200">
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Administradores</h3>
              <p className="text-gray-700 mb-6">
                Gerencie usuários, visualize estatísticas e gere relatórios operacionais
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Gerenciar usuários</li>
                <li>✓ Visualizar estatísticas</li>
                <li>✓ Gerar relatórios</li>
                <li>✓ Logs de auditoria</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Pronto para começar?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Acesse o VidaPlus agora e transforme a gestão hospitalar da sua instituição
          </p>
          {isAuthenticated ? (
            <Button
              onClick={handleDashboardRedirect}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 h-12 font-semibold"
            >
              Ir para Dashboard
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 h-12 font-semibold"
            >
              Fazer Login Agora
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-blue-400" />
                <span className="text-white font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-sm">
                Sistema de Gestão Hospitalar e de Serviços de Saúde
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Segurança</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 VidaPlus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
