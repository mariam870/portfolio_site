import Head from 'next/head';
import { useState } from 'react';
import styles from './contact.module.css';
import { FiMail, FiInstagram, FiLinkedin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Contact() {
  const [form, setForm] = useState({ nom: '', email: '', sujet: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nom || !form.email || !form.message) {
      toast.error('Veuillez remplir tous les champs.');
      return;
    }
    setSending(true);
    // Ici tu peux connecter un service email (EmailJS, Resend, etc.)
    await new Promise(r => setTimeout(r, 1200));
    toast.success('Message envoyé ! Je vous réponds sous 48h.');
    setForm({ nom: '', email: '', sujet: '', message: '' });
    setSending(false);
  };

  return (
    <>
      <Head>
        <title>Contact — Young_Art_Studio</title>
      </Head>

      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <span className={styles.label}>Contact</span>
            <h1>Parlons de<br /><span className={styles.accent}>votre projet.</span></h1>
            <p>Une idée, un projet, une collaboration ? Écrivez-moi.</p>
          </div>

          <div className={styles.grid}>
            {/* FORM */}
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label>Nom complet</label>
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label>Sujet</label>
                <input
                  type="text"
                  name="sujet"
                  value={form.sujet}
                  onChange={handleChange}
                  placeholder="Collaboration, devis, question..."
                />
              </div>
              <div className={styles.field}>
                <label>Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet ou votre demande..."
                  rows={6}
                  required
                />
              </div>
              <button type="submit" className={styles.submit} disabled={sending}>
                {sending ? 'Envoi...' : (<><FiSend /> Envoyer le message</>)}
              </button>
            </form>

            {/* INFOS */}
            <div className={styles.infos}>
              <div className={styles.infoCard}>
                <FiMail className={styles.infoIcon} />
                <div>
                  <h4>Email</h4>
                  <a href="mailto:contact@kadio.com">saidcoulibaly@gmail.com</a>
                </div>
              </div>
              <div className={styles.infoCard}>
                <FiInstagram className={styles.infoIcon} />
                <div>
                  <h4>Instagram</h4>
                  <a href="https://instagram.com/kadio" target="_blank" rel="noreferrer">youn_art_studio</a>
                </div>
              </div>
              <div className={styles.infoCard}>
                <FiLinkedin className={styles.infoIcon} />
                <div>
                  <h4>LinkedIn</h4>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer">young_art_studio Design</a>
                </div>
              </div>

              <div className={styles.availCard}>
                <div className={styles.availDot}></div>
                <div>
                  <h4>Disponibilité</h4>
                  <p>Disponible pour des missions freelance. Réponse sous 48h.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
