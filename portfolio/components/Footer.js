import Link from 'next/link';
import styles from './Footer.module.css';
import { FiInstagram, FiLinkedin, FiMail, FiGlobe } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}><span style={{color:'var(--accent)'}}>Y</span>oung_Art_Studio</span>
          <p>Communication visuelle & Design créatif</p>
        </div>
        <div className={styles.center}>
          <Link href="/projets">Projets</Link>
          <Link href="/a-propos">À propos</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className={styles.socials}>
          <a href="#" aria-label="Instagram"><FiInstagram /></a>
          <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href="#" aria-label="Behance"><FiGlobe /></a>
          <a href="mailto:contact@kadio.com" aria-label="Email"><FiMail /></a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} SaidCoulibaly — Tous droits réservés</span>
      </div>
    </footer>
  );
}
