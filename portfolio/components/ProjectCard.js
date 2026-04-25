import Link from 'next/link';
import styles from './ProjectCard.module.css';
import { FiPlay, FiCamera, FiTrendingUp, FiLayout } from 'react-icons/fi';

const CATEGORY_ICONS = {
  Photo: FiCamera,
  Vidéo: FiPlay,
  'Community Management': FiTrendingUp,
  Infographie: FiLayout,
};

const CATEGORY_COLORS = {
  Photo: '#4a9eff',
  Vidéo: '#ff6b6b',
  'Community Management': '#50c878',
  Infographie: '#c8a96e',
};

export default function ProjectCard({ project }) {
  const Icon = CATEGORY_ICONS[project.category] || FiLayout;
  const color = CATEGORY_COLORS[project.category] || 'var(--accent)';

  return (
    <div className={styles.card}>
      <div className={styles.thumb}>
        {project.image_url ? (
          <img src={project.image_url} alt={project.titre} />
        ) : (
          <div className={styles.placeholder}>
            <Icon size={40} style={{ color }} />
          </div>
        )}
        <div className={styles.overlay}>
          <span className={styles.category} style={{ '--cat-color': color }}>
            <Icon size={12} /> {project.category}
          </span>
        </div>
      </div>
      <div className={styles.info}>
        <h3>{project.titre}</h3>
        {project.description && <p>{project.description}</p>}
        {project.date && (
          <span className={styles.date}>
            {new Date(project.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
          </span>
        )}
      </div>
    </div>
  );
}
