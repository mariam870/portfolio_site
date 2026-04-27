import Head from 'next/head';
import Link from 'next/link';
import styles from './a-propos.module.css';

const skills = [
  { cat: 'Design & Identité', items: ['Adobe Photoshop', 'Illustrator', 'InDesign', 'Canva Pro'] },
  { cat: 'Vidéo & Motion', items: ['Premiere Pro', 'After Effects', 'CapCut', 'DaVinci Resolve'] },
  { cat: 'Photo', items: ['Lightroom', 'Capture One', 'Photoshop', 'Studio Lighting'] },
  { cat: 'Web & Social', items: ['Meta Business Suite', 'Later', 'Hootsuite', 'Analytics'] },
];

export default function APropos() {
  return (
    <>
      <Head>
        <title>À propos — Young_Art_Studio</title>
      </Head>

      <div className={styles.page}>
        {/* INTRO */}
        <section className={styles.intro}>
          <div className={styles.container}>
            <div className={styles.introGrid}>
              <div className={styles.introText}>
                <span className={styles.label}>À propos</span>
                <h1>Créer, raconter,<br /><span className={styles.accent}>marquer les esprits.</span></h1>
                <p>
                  Étudiant passionné en communication visuelle, je conçois des identités visuelles fortes,
                  des contenus photo et vidéo impactants, et des stratégies de community management efficaces.
                </p>
                <p>
                  Mon approche : allier esthétisme et fonctionnalité pour que chaque création serve un objectif précis.
                </p>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span>20+</span>
                    <small>Projets réalisés</small>
                  </div>
                  <div className={styles.stat}>
                    <span>3</span>
                    <small>Ans d'expérience</small>
                  </div>
                  <div className={styles.stat}>
                    <span>4</span>
                    <small>Disciplines maîtrisées</small>
                  </div>
                </div>
              </div>
              <div className={styles.photoBlock}>
                <div className={styles.photoPlaceholder}>
                  <span>Votre photo ici</span>
                </div>
                <div className={styles.photoTag}>
                  <span className={styles.dot}></span>
                  Disponible pour des projets
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPETENCES */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.label}>Compétences</span>
            <h2>Mes outils créatifs</h2>
            <div className={styles.skillsGrid}>
              {skills.map(s => (
                <div key={s.cat} className={styles.skillCard}>
                  <h3>{s.cat}</h3>
                  <ul>
                    {s.items.map(item => (
                      <li key={item}><span className={styles.skillDot}></span>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARCOURS */}
        <section className={styles.section}>
          <div className={styles.container}>
            <span className={styles.label}>Parcours</span>
            <h2>Formation & expérience</h2>
            <div className={styles.timeline}>
              {[
                { year: '2025 — Présent', title: 'BTS Communication Visuelle', sub: 'Nom de votre école', desc: 'Formation en design, photographie, vidéo et stratégie digitale.' },
                { year: '2026', title: 'Stage — Agence de communication', sub: 'Nom de l\'agence', desc: 'Création de contenus pour les réseaux sociaux, refonte d\'identité visuelle.' },
                { year: '2025', title: 'Projets personnels', sub: 'Freelance', desc: 'Premiers clients : affiches, logos, community management.' },
              ].map((item, i) => (
                <div key={i} className={styles.timelineItem}>
                  <div className={styles.timelineYear}>{item.year}</div>
                  <div className={styles.timelineContent}>
                    <h4>{item.title}</h4>
                    <span>{item.sub}</span>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className={styles.cta}>
          <div className={styles.container}>
            <h2>Travaillons ensemble</h2>
            <Link href="/contact" className={styles.btnPrimary}>Me contacter</Link>
          </div>
        </div>
      </div>
    </>
  );
}
