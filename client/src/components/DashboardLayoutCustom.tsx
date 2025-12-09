import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Home, Calendar, FileText, Users, BarChart3, Settings } from "lucide-react";
import { APP_TITLE } from "@/const";
import { useLocation } from "wouter";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { user: authUser, logout } = useAuth();
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Fallback para localStorage quando não há sessão do servidor
  const [localUser, setLocalUser] = useState<any>(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);
  
  const user = authUser || localUser;

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      roles: ["user", "admin", "professional"],
    },
    {
      label: "Minhas Consultas",
      icon: Calendar,
      href: "/consultas",
      roles: ["user"],
    },
    {
      label: "Minha Agenda",
      icon: Calendar,
      href: "/agenda",
      roles: ["professional"],
    },
    {
      label: "Prontuários",
      icon: FileText,
      href: "/prontuarios",
      roles: ["user", "professional"],
    },
    {
      label: "Pacientes",
      icon: Users,
      href: "/pacientes",
      roles: ["admin", "professional"],
    },
    {
      label: "Profissionais",
      icon: Users,
      href: "/profissionais",
      roles: ["admin"],
    },
    {
      label: "Relatórios",
      icon: BarChart3,
      href: "/relatorios",
      roles: ["admin"],
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/configuracoes",
      roles: ["user", "admin", "professional"],
    },
  ];

  const visibleMenuItems = menuItems.filter((item) => {
    const userRole = (user?.role as string) || "user";
    return item.roles.includes(userRole);
  });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 flex flex-col shadow-lg`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-blue-700 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-xl font-bold">{APP_TITLE}</h2>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-blue-700 rounded-lg transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {visibleMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location?.startsWith(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-blue-100 hover:bg-blue-700"
                }`}
            onClick={(e) => {
              e.preventDefault();
              navigate(item.href);
            }}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={20} />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">{user?.name || "Usuário"}</p>
                <p className="text-xs text-blue-200 truncate capitalize">{user?.role}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-blue-700 border border-blue-600 text-white hover:bg-blue-600 rounded-lg h-9 flex items-center justify-center transition"
          >
            {sidebarOpen ? (
              <>
                <LogOut size={16} className="mr-2" />
                Sair
              </>
            ) : (
              <LogOut size={16} />
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
