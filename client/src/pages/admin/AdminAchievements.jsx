import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import AdminLayout from '../../layouts/AdminLayout';
import CrudTable from '../../components/admin/CrudTable';
import Modal from '../../components/admin/Modal';
import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from '../../services/api';

const emptyForm = { title: '', description: '', date: '', icon: 'trophy', order: 0 };

const AdminAchievements = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetch = () => getAchievements().then((res) => setItems(res.data.data));
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editing) await updateAchievement(editing._id, payload);
      else await createAchievement(payload);
      setModalOpen(false);
      fetch();
    } catch {
      alert('Failed to save');
    }
  };

  return (
    <AdminLayout title="Manage Achievements">
      <div className="mb-6 flex justify-end">
        <button onClick={() => { setEditing(null); setForm(emptyForm); setModalOpen(true); }} className="btn-primary">
          <FiPlus size={18} /> Add Achievement
        </button>
      </div>
      <CrudTable
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'date', label: 'Date' },
        ]}
        data={items}
        onEdit={(i) => { setEditing(i); setForm(i); setModalOpen(true); }}
        onDelete={async (id) => { if (confirm('Delete?')) { await deleteAchievement(id); fetch(); } }}
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit' : 'Add'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <textarea className="admin-input" placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <input className="admin-input" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <select className="admin-input" value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}>
            <option value="trophy">Trophy</option>
            <option value="code">Code</option>
            <option value="github">GitHub</option>
            <option value="star">Star</option>
          </select>
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminAchievements;
