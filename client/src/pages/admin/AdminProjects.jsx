import { useState, useEffect } from 'react';
import { FiPlus, FiGithub, FiExternalLink } from 'react-icons/fi';
import AdminLayout from '../../layouts/AdminLayout';
import CrudTable from '../../components/admin/CrudTable';
import Modal from '../../components/admin/Modal';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from '../../services/api';

const emptyForm = {
  title: '',
  description: '',
  techStack: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  featured: false,
  order: 0,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchProjects = () => {
    getProjects().then((res) => setProjects(res.data.data));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEdit = (project) => {
    setEditing(project);
    setForm({
      ...project,
      techStack: project.techStack?.join(', ') || '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      techStack: form.techStack.split(',').map((t) => t.trim()).filter(Boolean),
      order: Number(form.order) || 0,
    };

    try {
      if (editing) {
        await updateProject(editing._id, payload);
      } else {
        await createProject(payload);
      }
      setModalOpen(false);
      fetchProjects();
    } catch {
      alert('Failed to save project');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    await deleteProject(id);
    fetchProjects();
  };

  const columns = [
    { key: 'title', label: 'Title' },
    {
      key: 'githubUrl',
      label: 'GitHub',
      render: (row) =>
        row.githubUrl ? (
          <a href={row.githubUrl} target="_blank" rel="noreferrer" className="text-accent-blue hover:underline">
            View Code
          </a>
        ) : (
          <span className="text-slate-400">—</span>
        ),
    },
    {
      key: 'liveUrl',
      label: 'Live',
      render: (row) =>
        row.liveUrl ? (
          <a href={row.liveUrl} target="_blank" rel="noreferrer" className="text-accent-purple hover:underline">
            Live link
          </a>
        ) : (
          <span className="text-slate-400">—</span>
        ),
    },
    { key: 'order', label: 'Order' },
  ];

  return (
    <AdminLayout title="Manage Projects">
      <div className="mb-6 rounded-xl border border-accent-blue/20 bg-accent-blue/5 p-4 text-sm text-slate-700">
        <p className="font-semibold text-slate-900">Add your real project details here</p>
        <p className="mt-1">
          Click <strong>Add Project</strong> or edit (pencil) on a row. Paste your{' '}
          <strong>GitHub URL</strong> (shows as <em>View Code</em> on site) and{' '}
          <strong>Live Demo URL</strong> on the portfolio. Also update title, description, tech stack, and image URL.
        </p>
        <p className="mt-2 text-slate-500">
          Resume & social links: <strong>About & Resume</strong> in the sidebar.
        </p>
      </div>

      <div className="mb-6 flex justify-end">
        <button onClick={openCreate} className="btn-primary">
          <FiPlus size={18} />
          Add Project
        </button>
      </div>

      <CrudTable
        columns={columns}
        data={projects}
        onEdit={openEdit}
        onDelete={handleDelete}
        emptyMessage="No projects yet. Add your first project!"
      />

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Project' : 'Add Project'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Project title *</label>
            <input
              className="admin-input"
              placeholder="e.g. Quantum RNG Laboratory"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Description *</label>
            <textarea
              className="admin-input"
              placeholder="What the project does..."
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Tech stack</label>
            <input
              className="admin-input"
              placeholder="React, Node.js, Python (comma separated)"
              value={form.techStack}
              onChange={(e) => setForm({ ...form, techStack: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-600">
              <FiGithub /> GitHub link → shows as &quot;View Code&quot;
            </label>
            <input
              className="admin-input"
              type="url"
              placeholder="https://github.com/yourusername/repo"
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-600">
              <FiExternalLink /> Live demo link
            </label>
            <input
              className="admin-input"
              type="url"
              placeholder="https://your-app.vercel.app"
              value={form.liveUrl}
              onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600">Project image URL</label>
            <input
              className="admin-input"
              type="url"
              placeholder="https://... (screenshot or cover image)"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured on homepage
            </label>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-600">Display order</label>
              <input
                className="admin-input w-24"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full">
            {editing ? 'Save changes' : 'Add project'}
          </button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminProjects;
