import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import styles from './index.module.css';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [featuredProjects, setFeaturedProjects] = useState([]);

  const categories = [
    { label: 'Photographie', icon: '📷', desc: 'Portraits, produits, evenements' },
    { label: 'Video', icon: '🎬', desc: 'Clips, motion design, reels' },
    { label: 'Community Management', icon: '📱', desc: 'Strategie, contenu, engagement' },
    { label: 'Infographie', icon: '✏️', desc: 'Affiches, flyers, identite visuelle' },
  ];

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const all = await res.json();
      setFeaturedProjects(Array.isArray(all) ? all.slice(0, 6) : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchProjects();
    const interval = setInterval(fetchProjects, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Young_Art_Studio</title>
        <meta name="description" content="Portfolio communication visuelle." />
      </Head>

      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1}></div>
          <div className={styles.heroOrb2}></div>
          <div className={styles.heroGrid}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={mounted ? `${styles.badge} ${styles.visible}` : styles.badge}>
            <span className={styles.dot}></span>
            Disponible pour des projets
          </div>
          <h1 className={mounted ? `${styles.heroTitle} ${styles.visible}` : styles.heroTitle}>
            Je cree des
            <span className={styles.highlight}> experiences visuelles </span>
            memorables.
          </h1>
          <p className={mounted ? `${styles.heroSub} ${styles.visible}` : styles.heroSub}>
            Etudiant en communication visuelle
          </p>
          <div className={mounted ? `${styles.heroCta} ${styles.visible}` : styles.heroCta}>
            <Link href="/projets" className={styles.btnPrimary}>Voir mes projets</Link>
            <Link href="/contact" className={styles.btnSecondary}>Me contacter</Link>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Disciplines</span>
            <h2>Ce que je cree</h2>
          </div>
          <div className={styles.catGrid}>
            {categories.map((cat, i) => (
              <div key={cat.label} className={styles.catCard}>
                <span className={styles.catIcon}>{cat.icon}</span>
                <h3>{cat.label}</h3>
                <p>{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Portfolio</span>
            <h2>Projets recents</h2>
            <Link href="/projets" className={styles.seeAll}>Voir tout</Link>
          </div>
          {featuredProjects.length > 0 ? (
            <div className={styles.projectGrid}>
              {featuredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>Les projets apparaitront ici une fois ajoutes.</p>
            </div>
          )}
        </div>
      </section>

      <section className={styles.ctaBand}>
        <div className={styles.container}>
          <h2>Travaillons ensemble.</h2>
          <p>Un projet en tete ? Parlons-en.</p>
          <Link href="/contact" className={styles.btnPrimary}>Prendre contact</Link>
        </div>
      </section>
    </>
  );
}
