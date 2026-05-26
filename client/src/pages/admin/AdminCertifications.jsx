import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import AdminLayout from '../../layouts/AdminLayout';
import CrudTable from '../../components/admin/CrudTable';
import Modal from '../../components/admin/Modal';
import {
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from '../../services/api';

const emptyForm = { title: '', issuer: '', date: '', credentialUrl: '', order: 0 };

const AdminCertifications = () => {
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const fetch = () => getCertifications().then((res) => setItems(res.data.data));
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, order: Number(form.order) || 0 };
    try {
      if (editing) await updateCertification(editing._id, payload);
      else await createCertification(payload);
      setModalOpen(false);
      fetch();
    } catch {
      alert('Failed to save');
    }
  };

  return (
    <AdminLayout title="Manage Certifications">
      <div className="mb-6 flex justify-end">
        <button onClick={() => { setEditing(null); setForm(emptyForm); setModalOpen(true); }} className="btn-primary">
          <FiPlus size={18} /> Add Certification
        </button>
      </div>
      <CrudTable
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'issuer', label: 'Issuer' },
          { key: 'date', label: 'Date' },
        ]}
        data={items}
        onEdit={(i) => { setEditing(i); setForm(i); setModalOpen(true); }}
        onDelete={async (id) => { if (confirm('Delete?')) { await deleteCertification(id); fetch(); } }}
      />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit' : 'Add'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="admin-input" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <input className="admin-input" placeholder="Issuer" value={form.issuer} onChange={(e) => setForm({ ...form, issuer: e.target.value })} required />
          <input className="admin-input" placeholder="Date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <input className="admin-input" placeholder="Credential URL" value={form.credentialUrl} onChange={(e) => setForm({ ...form, credentialUrl: e.target.value })} />
          <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'}</button>
        </form>
      </Modal>
    </AdminLayout>
  );
};

export default AdminCertifications;
