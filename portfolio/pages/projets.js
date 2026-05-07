import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import styles from './projets.module.css';

const CATEGORIES = ['Tous', 'Photo', 'Vidéo', 'Community Management', 'Infographie'];

export default function Projets() {
  const [projects, setProjects] = useState([]);
  const [active, setActive] = useState('Tous');
  const [loading, setLoading] = useState(true);

  const filtered = active === 'Tous' ? projects : projects.filter(p => p.category === active);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects', { cache: 'no-store' });
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
    const interval = setInterval(fetchProjects, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Projets — Young_Art_Studio</title>
        <meta name="description" content="Tous mes projets en communication visuelle." />
      </Head>

      <div className={styles.page}>
        <div className={styles.header}>
          <div className={styles.container}>
            <span className={styles.label}>Portfolio</span>
            <h1>Mes Projets</h1>
            <p>Découvrez l'ensemble de mes réalisations en communication visuelle.</p>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.filters}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${active === cat ? styles.activeFilter : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.count}>
            <span>{filtered.length} projet{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className={styles.loading}>
              {[...Array(6)].map((_, i) => <div key={i} className={styles.skeleton}></div>)}
            </div>
          ) : filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>Aucun projet dans cette catégorie pour le moment.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
