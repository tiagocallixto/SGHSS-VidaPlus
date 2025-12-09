import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GestaoInternacoes from "./pages/GestaoInternacoes";
import ProntuarioEditor from "./pages/ProntuarioEditor";
import Login from "./pages/Login";
import DashboardPaciente from "./pages/DashboardPaciente";
import DashboardProfissional from "./pages/DashboardProfissional";
import DashboardAdmin from "./pages/DashboardAdmin";
import PacienteConsultas from "./pages/PacienteConsultas";
import PacienteAgendamento from "./pages/PacienteAgendamento";
import PacienteProntuario from "./pages/PacienteProntuario";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import ProfissionalAgenda from "./pages/ProfissionalAgenda";
import ProfissionalPacientes from "./pages/ProfissionalPacientes";
import ProfissionalReceitas from "./pages/ProfissionalReceitas";
import AdminProfissionais from "./pages/AdminProfissionais";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={DashboardPaciente} />
      <Route path="/dashboard-profissional" component={DashboardProfissional} />
      <Route path="/dashboard-admin" component={DashboardAdmin} />
      <Route path="/consultas" component={PacienteConsultas} />
      <Route path="/agendamento" component={PacienteAgendamento} />
      <Route path="/prontuarios" component={PacienteProntuario} />
      <Route path="/agenda" component={ProfissionalAgenda} />
      <Route path="/pacientes" component={ProfissionalPacientes} />
      <Route path="/profissionais" component={AdminProfissionais} />
      <Route path="/receitas" component={ProfissionalReceitas} />
      <Route path="/relatorios" component={Relatorios} />
      <Route path="/configuracoes" component={Configuracoes} />
      <Route path="/internacoes" component={GestaoInternacoes} />
      <Route path="/prontuario" component={ProntuarioEditor} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
