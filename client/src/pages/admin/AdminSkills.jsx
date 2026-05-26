import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import AdminLayout from '../../layouts/AdminLayout';
import CrudTable from '../../components/admin/CrudTable';
import Modal from '../../components/admin/Modal';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../services/api';

const categories = ['Frontend', 'Backend', 'Database', 'DevOps', 'AI/ML', 'Security', 'Other'];

const emptyForm = { name: '', category: 'Frontend', proficiency: 80, order: 0 };

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetchSkills = () => getSkills().then((res) => setSkills(res.data.data));

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, proficiency: Number(form.proficiency), order: Number(form.order) || 0 };
    try {
      if (editing) await updateSkill(editing._id, payload);
      else await createSkill(payload);
      setModalOpen(false);
      fetchSkills();
    } catch {
      alert('Failed to save skill');
    }
  };

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'category', label: 'Category' },
    { key: 'proficiency', label: 'Proficiency %' },
  ];

  return (
    <AdminLayout title="Manage Skills">
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => {
            setEditing(null);
            setForm(emptyForm);
            setModalOpen(true);
          }}
          className="btn-primary"
        >
          <FiPlus size={18} /> Add Skill
        </button>
      </div>

      <CrudTable
        columns={columns}
        data={skills}
        onEdit={(s) => {
          setEditing(s);
          setForm(s);
          setModalOpen(true);
        }}
        onDelete={async (id) => {
          if (confirm('Delete?')) {
            await deleteSkill(id);
            fetchSkills();
          }
        }}
      />

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Skill' : 'Add Skill'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="admin-input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <select className="admin-input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input className="admin-input" type="number" min="0" max="100" placeholder="Proficiency" value={form.proficiency} onChange={(e) => setForm({ ...form, proficiency: e.target.value })} />
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminSkills;
