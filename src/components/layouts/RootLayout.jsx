import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { getUserSession, clearUserSession } from "@/utils/auth";
import {
  LayoutDashboard,
  Package,
  FileText,
  Bell,
  User,
  Menu,
  X,
  Users,
  Settings,
  ClipboardList,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { useState } from "react";
import { currentUser } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const user = getUserSession();
  const navigate = useNavigate();

  if (!user) return <Navigate to="/login" />;

  const handleLogout = () => {
    clearUserSession();
    navigate("/login");
  };
  const allNavItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard, roles: ["student", "instructor", "lab-assistant", "admin"], section: "Student Portal" },
    { path: "/equipment", label: "Browse Equipment", icon: Package, roles: ["student", "instructor", "lab-assistant", "admin"], section: "Student Portal" },
    { path: "/borrow", label: "Borrow/Return", icon: ClipboardList, roles: ["student", "instructor", "lab-assistant", "admin"], section: "Student Portal" },
    { path: "/history", label: "Transaction History", icon: FileText, roles: ["student", "instructor", "lab-assistant", "admin"], section: "Student Portal" },

    { path: "/instructor", label: "Instructor Portal", icon: UserCheck, roles: ["instructor", "admin"], section: "Other Portals" },
    { path: "/lab-assistant", label: "Lab Assistant Portal", icon: Settings, roles: ["lab-assistant", "admin"], section: "Other Portals" },
    { path: "/admin", label: "Admin Portal", icon: ShieldCheck, roles: ["admin"], section: "Other Portals" },
  ];

  const visibleItems = allNavItems.filter(item => item.roles.includes(currentUser.role));

  const studentSection = visibleItems.filter(item => item.section === "Student Portal");
  const portalSection = visibleItems.filter(item => item.section === "Other Portals");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#e9333f] rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">LG</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LabGuard</h1>
                <p className="text-xs text-gray-500">Al Hussein Technical University</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#e9333f] text-white text-xs">3</Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {/* ... Notification items ... */}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-2 transition-colors">
                  <img src={currentUser.imageUrl} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
                  <div className="text-left hidden md:block">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{currentUser.role}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">

                <DropdownMenuItem
                  className="text-red-600 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#2c3e50] transform transition-transform duration-300 ease-in-out mt-[73px] lg:mt-0
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <nav className="p-4 space-y-2 h-[calc(100vh-73px)] overflow-y-auto">
            {/* Render Student Section */}
            <div className="mb-6">
              <p className="text-xs uppercase text-gray-400 mb-2 px-3">Student Portal</p>
              {studentSection.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${active ? "bg-[#e9333f] text-white shadow-lg" : "text-gray-300 hover:bg-[#34495e] hover:text-white"
                      }`}
                  >
                    <Icon size={20} />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Render Portal Section (Only if user has access to at least one) */}
            {portalSection.length > 0 && (
              <div className="pt-4 border-t border-gray-600">
                <p className="text-xs uppercase text-gray-400 mb-2 px-3">Other Portals</p>
                {portalSection.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${active ? "bg-[#e9333f] text-white shadow-lg" : "text-gray-300 hover:bg-[#34495e] hover:text-white"
                        }`}
                    >
                      <Icon size={20} />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>
        </aside>

        {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

        <main className="flex-1 min-h-[calc(100vh-73px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}