import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import styles from './index.module.css';

export default function Home({ featuredProjects }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /*const categories = [
    { label: 'Photographie', icon: '📷', desc: 'Portraits, produits, événements' },
    { label: 'Vidéo', icon: '🎬', desc: 'Clips, motion design, reels' },
    { label: 'Community Management', icon: '📱', desc: 'Stratégie, contenu, engagement' },
    { label: 'Infographie', icon: '✏️', desc: 'Affiches, flyers, identité visuelle' },
  ];*/
  const categories = [
  { 
    label: 'Photographie', 
    image: 'c:\\Users\\USER\\Downloads\\Photographie.jpg',
    desc: 'Portraits, produits, événements' 
  },
  { 
    label: 'Vidéo', 
    image: URL('c:\\Users\\USER\\Downloads\\Eburny.mp4'),
    desc: 'Clips, motion design, reels' 
  },
  { 
    label: 'Community Management', 
    image: URL('c:\\Users\\USER\\Downloads\\Community Management.jpg'),
    desc: 'Stratégie, contenu, engagement' 
  },
  { 
    label: 'Infographie', 
    image: URL('c:\\Users\\USER\\Downloads\\Affiche Promotion young art studio.jpg'),
    desc: 'Affiches, flyers, identité visuelle' 
  },
];

  return (
    <>
      <Head>
        <title>Young_Art_Studio — Communication Visuelle & Design</title>
        <meta name="description" content="Portfolio professionnel en communication visuelle — photographie, vidéo, infographie, community management." />
      </Head>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOrb1}></div>
          <div className={styles.heroOrb2}></div>
          <div className={styles.heroGrid}></div>
        </div>
        <div className={styles.heroContent}>
          <div className={`${styles.badge} ${mounted ? styles.visible : ''}`}>
            <span className={styles.dot}></span>
            Disponible pour des projets
          </div>
          <h1 className={`${styles.heroTitle} ${mounted ? styles.visible : ''}`}>
            Je crée des<br />
            <span className={styles.highlight}>expériences<br />visuelles</span><br />
            mémorables.
          </h1>
          <p className={`${styles.heroSub} ${mounted ? styles.visible : ''}`}>
            Étudiant en communication visuelle — photographie, vidéo,<br />
            infographie & community management.
          </p>
          <div className={`${styles.heroCta} ${mounted ? styles.visible : ''}`}>
            <Link href="/projets" className={styles.btnPrimary}>Voir mes projets</Link>
            <Link href="/contact" className={styles.btnSecondary}>Me contacter</Link>
          </div>
        </div>
        <div className={styles.heroScroll}>
          <span>Scroll</span>
          <div className={styles.scrollLine}></div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Disciplines</span>
            <h2>Ce que je crée</h2>
          </div>
          <div className={styles.catGrid}>
            {categories.map((cat, i) => (
             /* <div key={cat.label} className={styles.catCard} style={{ animationDelay: `${i * 0.1}s` }}>
                <span className={styles.catIcon}>{cat.icon}</span>
                <h3>{cat.label}</h3>
                <p>{cat.desc}</p>
              </div>*/
              <div key={cat.label} className={styles.catCard}>
              <div className={styles.catImageWrap}>
               <img src={cat.image} alt={cat.label} className={styles.catImage} />
             </div>
             <h3>{cat.label}</h3>
              <p>{cat.desc}</p>
             </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.label}>Portfolio</span>
            <h2>Projets récents</h2>
            <Link href="/projets" className={styles.seeAll}>Voir tout →</Link>
          </div>
          {featuredProjects.length > 0 ? (
            <div className={styles.projectGrid}>
              {featuredProjects.map(p => <ProjectCard key={p.id} project={p} />)}
            </div>
          ) : (
            <div className={styles.empty}>
              <p>Les projets apparaîtront ici une fois ajoutés depuis l'<Link href="/admin">interface admin</Link>.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA BAND */}
      <section className={styles.ctaBand}>
        <div className={styles.container}>
          <h2>Travaillons ensemble.</h2>
          <p>Un projet en tête ? Parlons-en.</p>
          <Link href="/contact" className={styles.btnPrimary}>Prendre contact</Link>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/projects`);
    const all = await res.json();
    const featured = Array.isArray(all) ? all.slice(0, 6) : [];
    return { props: { featuredProjects: featured } };
  } catch {
    return { props: { featuredProjects: [] } };
  }
}
