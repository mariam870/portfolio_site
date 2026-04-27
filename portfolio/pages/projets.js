import Head from 'next/head';
import { useState, useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import styles from './projets.module.css';

const CATEGORIES = ['Tous', 'Photo', 'Vidéo', 'Community Management', 'Infographie'];

export default function Projets({ initialProjects }) {
  const [projects, setProjects] = useState(initialProjects);
  const [active, setActive] = useState('Tous');
  const [loading, setLoading] = useState(false);

  const filtered = active === 'Tous' ? projects : projects.filter(p => p.category === active);

  const fetchProjects = async (cat) => {
    setLoading(true);
    const url = cat && cat !== 'Tous' ? `/api/projects?category=${encodeURIComponent(cat)}` : '/api/projects';
    const res = await fetch(url);
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const handleFilter = (cat) => {
    setActive(cat);
    fetchProjects(cat);
  };

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
          {/* Filtres */}
          <div className={styles.filters}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${active === cat ? styles.activeFilter : ''}`}
                onClick={() => handleFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Compteur */}
          <div className={styles.count}>
            <span>{filtered.length} projet{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Grid */}
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

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/projects`);
    const data = await res.json();
    return { props: { initialProjects: Array.isArray(data) ? data : [] } };
  } catch {
    return { props: { initialProjects: [] } };
  }
}
