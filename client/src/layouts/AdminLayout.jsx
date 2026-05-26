import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  FiHome,
  FiFolder,
  FiCpu,
  FiAward,
  FiStar,
  FiUser,
  FiMail,
  FiLogOut,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { useState } from 'react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: FiHome },
  { path: '/admin/projects', label: 'Projects', icon: FiFolder },
  { path: '/admin/skills', label: 'Skills', icon: FiCpu },
  { path: '/admin/certifications', label: 'Certifications', icon: FiAward },
  { path: '/admin/achievements', label: 'Achievements', icon: FiStar },
  { path: '/admin/about', label: 'About & Resume', icon: FiUser },
  { path: '/admin/messages', label: 'Messages', icon: FiMail },
];

const AdminLayout = ({ children, title }) => {
  const { admin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-soft-black text-white transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-6">
          <Link to="/admin" className="text-lg font-bold">
            <span className="bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent">
              RK Admin
            </span>
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <FiX size={20} />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                location.pathname === path
                  ? 'bg-white/10 text-white'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <p className="mb-2 truncate px-4 text-xs text-slate-500">{admin?.email}</p>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <FiMenu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          </div>
          <Link
            to="/"
            target="_blank"
            className="text-sm text-accent-blue hover:underline"
          >
            View Portfolio →
          </Link>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
