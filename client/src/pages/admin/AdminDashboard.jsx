import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFolder, FiCpu, FiAward, FiStar, FiMail } from 'react-icons/fi';
import AdminLayout from '../../layouts/AdminLayout';
import StatCard from '../../components/admin/StatCard';
import { getDashboardStats } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats()
      .then((res) => setStats(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Projects" value={stats?.projects ?? '—'} icon={FiFolder} color="blue" />
        <StatCard label="Skills" value={stats?.skills ?? '—'} icon={FiCpu} color="purple" />
        <StatCard
          label="Certifications"
          value={stats?.certifications ?? '—'}
          icon={FiAward}
          color="green"
        />
        <StatCard label="Achievements" value={stats?.achievements ?? '—'} icon={FiStar} color="orange" />
        <StatCard
          label="Messages"
          value={stats?.messages ?? '—'}
          icon={FiMail}
          color="blue"
        />
      </div>

      {/* Unread Messages Alert */}
      {stats?.unreadMessages > 0 && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex items-center gap-2">
            <FiMail className="flex-shrink-0" />
            <span>
              You have <strong>{stats.unreadMessages}</strong> unread message(s).{' '}
              <Link to="/admin/messages" className="font-semibold underline hover:text-amber-900 transition-colors">
                View messages
              </Link>
            </span>
          </div>
        </div>
      )}

      {/* Quick Actions Card */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Quick Actions</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: '/admin/projects', label: 'Manage Projects', icon: FiFolder },
            { to: '/admin/skills', label: 'Manage Skills', icon: FiCpu },
            { to: '/admin/about', label: 'Edit About & Resume', icon: FiStar },
            { to: '/admin/messages', label: 'View Messages', icon: FiMail },
          ].map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-400 hover:text-blue-600 hover:shadow-md hover:-translate-y-0.5 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-500 dark:hover:text-blue-400"
            >
              <link.icon className="flex-shrink-0 transition-transform duration-300 group-hover:scale-110" size={18} />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
