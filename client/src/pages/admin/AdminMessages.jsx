import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getContactMessages, markMessageRead, deleteMessage } from '../../services/api';
import { FiTrash2, FiMail } from 'react-icons/fi';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  const fetch = () => getContactMessages().then((res) => setMessages(res.data.data));
  useEffect(() => { fetch(); }, []);

  const handleRead = async (id) => {
    await markMessageRead(id);
    fetch();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    await deleteMessage(id);
    fetch();
  };

  return (
    <AdminLayout title="Contact Messages">
      {!messages.length ? (
        <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
          No messages yet.
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-xl border bg-white p-6 ${
                msg.read ? 'border-slate-200' : 'border-accent-blue/30 bg-accent-blue/5'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <FiMail className="text-accent-blue" />
                    <span className="font-semibold text-slate-900">{msg.name}</span>
                    {!msg.read && (
                      <span className="rounded-full bg-accent-blue px-2 py-0.5 text-xs text-white">New</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{msg.email}</p>
                  {msg.subject && <p className="mt-2 text-sm font-medium text-slate-700">{msg.subject}</p>}
                  <p className="mt-3 text-slate-600">{msg.message}</p>
                  <p className="mt-3 text-xs text-slate-400">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!msg.read && (
                    <button
                      onClick={() => handleRead(msg._id)}
                      className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium hover:bg-slate-50"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminMessages;
