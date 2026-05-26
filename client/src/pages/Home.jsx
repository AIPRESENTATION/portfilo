import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Achievements from '../components/Achievements';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import ScrollProgress from '../components/ui/ScrollProgress';
import PageLoader from '../components/ui/PageLoader';
import useScrollProgress from '../hooks/useScrollProgress';
import {
  getAbout,
  getSocialLinks,
  getProjects,
  getSkills,
  getCertifications,
  getAchievements,
} from '../services/api';
import { defaultPortfolio } from '../data/defaultPortfolio';

const Home = () => {
  const [data, setData] = useState(defaultPortfolio);
  const [apiConnected, setApiConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const { progress } = useScrollProgress();

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const [aboutRes, socialRes, projectsRes, skillsRes, certsRes, achievementsRes] =
          await Promise.all([
            getAbout(),
            getSocialLinks(),
            getProjects(),
            getSkills(),
            getCertifications(),
            getAchievements(),
          ]);

        if (cancelled) return;

        setData({
          about: aboutRes.data.data || defaultPortfolio.about,
          social: socialRes.data.data || defaultPortfolio.social,
          projects: projectsRes.data.data?.length ? projectsRes.data.data : defaultPortfolio.projects,
          skills: skillsRes.data.data?.length ? skillsRes.data.data : defaultPortfolio.skills,
          certifications: certsRes.data.data?.length
            ? certsRes.data.data
            : defaultPortfolio.certifications,
          achievements: achievementsRes.data.data?.length
            ? achievementsRes.data.data
            : defaultPortfolio.achievements,
        });
        setApiConnected(true);
      } catch (err) {
        console.warn('API unavailable — showing default portfolio content.', err);
        if (!cancelled) setApiConnected(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, []);

  // Safety: always dismiss loader after 2s max
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PageLoader visible={loading} />
      <ScrollProgress progress={progress} />

      {!apiConnected && !loading && (
        <div
          className="fixed bottom-4 left-1/2 z-[100] -translate-x-1/2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-xs text-amber-800 shadow-md"
          role="status"
        >
          Offline mode — start backend on port 5000 for live CMS data
        </div>
      )}

      <div className="relative">
        <Navbar />
        <Hero about={data.about} social={data.social} />
        <About about={data.about} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Achievements achievements={data.achievements} />
        <Certifications certifications={data.certifications} />
        <Contact />
        <Footer social={data.social} />
      </div>
    </>
  );
};

export default Home;
