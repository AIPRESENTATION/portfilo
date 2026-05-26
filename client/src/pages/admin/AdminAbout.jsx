import { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { getAbout, getSocialLinks, updateAbout, updateSocialLinks } from '../../services/api';

const AdminAbout = () => {
  const [about, setAbout] = useState({});
  const [social, setSocial] = useState({});
  const [heroTitles, setHeroTitles] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Promise.all([getAbout(), getSocialLinks()]).then(([aboutRes, socialRes]) => {
      const aboutData = aboutRes.data.data;
      setAbout(aboutData);
      setHeroTitles(aboutData.heroTitles?.join('\n') || '');
      setSocial(socialRes.data.data);
    });
  }, []);

  const handleSaveAbout = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateAbout({
        ...about,
        heroTitles: heroTitles.split('\n').map((t) => t.trim()).filter(Boolean),
      });
      setMessage('About section saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveSocial = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSocialLinks(social);
      setMessage('Social links saved!');
      setTimeout(() => setMessage(''), 3000);
    } catch {
      alert('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout title="About & Resume">
      {message && (
        <div className="mb-6 rounded-lg bg-emerald-50 p-4 text-emerald-700">{message}</div>
      )}

      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSaveAbout} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-semibold">About Content</h2>
          <input className="admin-input" placeholder="Hero Name" value={about.heroName || ''} onChange={(e) => setAbout({ ...about, heroName: e.target.value })} />
          <textarea className="admin-input" placeholder="Hero titles (one per line)" rows={4} value={heroTitles} onChange={(e) => setHeroTitles(e.target.value)} />
          <textarea className="admin-input" placeholder="Hero Bio" rows={3} value={about.heroBio || ''} onChange={(e) => setAbout({ ...about, heroBio: e.target.value })} />
          <input className="admin-input" placeholder="About Title" value={about.aboutTitle || ''} onChange={(e) => setAbout({ ...about, aboutTitle: e.target.value })} />
          <textarea className="admin-input" placeholder="About Description" rows={5} value={about.aboutDescription || ''} onChange={(e) => setAbout({ ...about, aboutDescription: e.target.value })} />
          <input className="admin-input" placeholder="Profile Image URL" value={about.profileImageUrl || ''} onChange={(e) => setAbout({ ...about, profileImageUrl: e.target.value })} />
          <input className="admin-input" placeholder="Location" value={about.location || ''} onChange={(e) => setAbout({ ...about, location: e.target.value })} />
          <input className="admin-input" placeholder="Email" value={about.email || ''} onChange={(e) => setAbout({ ...about, email: e.target.value })} />
          <input className="admin-input" placeholder="Resume URL (PDF link)" value={about.resumeUrl || ''} onChange={(e) => setAbout({ ...about, resumeUrl: e.target.value })} />
          <button type="submit" disabled={saving} className="btn-primary w-full">Save About</button>
        </form>

        <form onSubmit={handleSaveSocial} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <h2 className="text-lg font-semibold">Social Links</h2>
          <input className="admin-input" placeholder="GitHub" value={social.github || ''} onChange={(e) => setSocial({ ...social, github: e.target.value })} />
          <input className="admin-input" placeholder="LinkedIn" value={social.linkedin || ''} onChange={(e) => setSocial({ ...social, linkedin: e.target.value })} />
          <input className="admin-input" placeholder="LeetCode" value={social.leetcode || ''} onChange={(e) => setSocial({ ...social, leetcode: e.target.value })} />
          <input className="admin-input" placeholder="CodeChef" value={social.codechef || ''} onChange={(e) => setSocial({ ...social, codechef: e.target.value })} />
          <input className="admin-input" placeholder="Twitter" value={social.twitter || ''} onChange={(e) => setSocial({ ...social, twitter: e.target.value })} />
          <input className="admin-input" placeholder="Email" value={social.email || ''} onChange={(e) => setSocial({ ...social, email: e.target.value })} />
          <button type="submit" disabled={saving} className="btn-primary w-full">Save Social Links</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminAbout;
