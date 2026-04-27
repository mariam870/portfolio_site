import Head from 'next/head';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './admin.module.css';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiLogOut, FiEye } from 'react-icons/fi';
import Link from 'next/link';

const CATEGORIES = ['Photo', 'Vidéo', 'Community Management', 'Infographie'];
const EMPTY_FORM = { titre: '', description: '', image_url: '', video_url: '', category: 'Photo', date: '', featured: false };

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('Tous');

  const ADMIN_PWD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin2024';

  useEffect(() => {
    if (authed) fetchProjects();
  }, [authed]);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pwd === ADMIN_PWD) {
      setAuthed(true);
      toast.success('Connecté !');
    } else {
      toast.error('Mot de passe incorrect.');
    }
  };

  const openAdd = () => {
    setEditProject(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditProject(p);
    setForm({
      titre: p.titre || '',
      description: p.description || '',
      image_url: p.image_url || '',
      video_url: p.video_url || '',
      category: p.category || 'Photo',
      date: p.date ? p.date.slice(0, 10) : '',
      featured: p.featured || false,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titre || !form.category) {
      toast.error('Titre et catégorie requis.');
      return;
    }
    setLoading(true);
    const method = editProject ? 'PUT' : 'POST';
    const url = editProject ? `/api/projects/${editProject.id}` : '/api/projects';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(data.error || 'Erreur.');
    } else {
      toast.success(editProject ? 'Projet mis à jour !' : 'Projet ajouté !');
      setShowForm(false);
      fetchProjects();
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce projet ?')) return;
    const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Projet supprimé.');
      fetchProjects();
    } else {
      toast.error('Erreur lors de la suppression.');
    }
  };

  const filtered = filter === 'Tous' ? projects : projects.filter(p => p.category === filter);

  // LOGIN SCREEN
  if (!authed) {
    return (
      <>
        <Head><title>Admin — Kadio</title></Head>
        <div className={styles.loginPage}>
          <div className={styles.loginCard}>
            <div className={styles.loginLogo}><span style={{color:'var(--accent)'}}>K</span>ADIO</div>
            <h1>Interface Admin</h1>
            <p>Connectez-vous pour gérer vos projets.</p>
            <form onSubmit={handleLogin} className={styles.loginForm}>
              <input
                type="password"
                placeholder="Mot de passe"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                autoFocus
              />
              <button type="submit">Connexion</button>
            </form>
            <Link href="/" className={styles.backLink}>← Retour au site</Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head><title>Admin — Kadio</title></Head>
      <div className={styles.adminPage}>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLogo}><span style={{color:'var(--accent)'}}>K</span>ADIO</div>
          <nav className={styles.sideNav}>
            <span className={styles.navActive}>Projets ({projects.length})</span>
          </nav>
          <div className={styles.sideActions}>
            <Link href="/" className={styles.sideLink} target="_blank"><FiEye /> Voir le site</Link>
            <button onClick={() => setAuthed(false)} className={styles.logoutBtn}><FiLogOut /> Déconnexion</button>
          </div>
        </aside>

        {/* MAIN */}
        <main className={styles.main}>
          <div className={styles.topBar}>
            <div>
              <h1>Gestion des projets</h1>
              <p>{projects.length} projet{projects.length !== 1 ? 's' : ''} au total</p>
            </div>
            <button className={styles.addBtn} onClick={openAdd}>
              <FiPlus /> Ajouter un projet
            </button>
          </div>

          {/* FILTERS */}
          <div className={styles.filters}>
            {['Tous', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* TABLE */}
          <div className={styles.tableWrap}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>Aucun projet. <button onClick={openAdd} className={styles.linkBtn}>Ajouter votre premier projet →</button></p>
              </div>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Aperçu</th>
                    <th>Titre</th>
                    <th>Catégorie</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div className={styles.thumb}>
                          {p.image_url
                            ? <img src={p.image_url} alt={p.titre} />
                            : <span className={styles.noImg}>—</span>
                          }
                        </div>
                      </td>
                      <td>
                        <strong>{p.titre}</strong>
                        {p.description && <span className={styles.desc}>{p.description.slice(0, 60)}...</span>}
                      </td>
                      <td><span className={styles.catBadge}>{p.category}</span></td>
                      <td className={styles.dateCell}>
                        {p.date ? new Date(p.date).toLocaleDateString('fr-FR', { year:'numeric', month:'short' }) : '—'}
                      </td>
                      <td>
                        <div className={styles.actions}>
                          <button onClick={() => openEdit(p)} className={styles.editBtn} title="Modifier">
                            <FiEdit2 />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn} title="Supprimer">
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* MODAL FORM */}
        {showForm && (
          <div className={styles.overlay} onClick={() => setShowForm(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <h2>{editProject ? 'Modifier le projet' : 'Nouveau projet'}</h2>
                <button onClick={() => setShowForm(false)}><FiX /></button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Titre *</label>
                    <input
                      type="text"
                      value={form.titre}
                      onChange={e => setForm({...form, titre: e.target.value})}
                      placeholder="Nom du projet"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Catégorie *</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className={styles.field}>
                  <label>Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => setForm({...form, description: e.target.value})}
                    placeholder="Décrivez le projet, le contexte, les objectifs..."
                    rows={3}
                  />
                </div>
                <div className={styles.field}>
                  <label>URL de l'image</label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={e => setForm({...form, image_url: e.target.value})}
                    placeholder="https://..."
                  />
                  {form.image_url && (
                    <div className={styles.preview}>
                      <img src={form.image_url} alt="preview" onError={e => e.target.style.display='none'} />
                    </div>
                  )}
                </div>
                <div className={styles.field}>
                  <label>URL de la vidéo (optionnel)</label>
                  <input
                    type="url"
                    value={form.video_url}
                    onChange={e => setForm({...form, video_url: e.target.value})}
                    placeholder="https://youtube.com/..."
                  />
                </div>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label>Date</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setForm({...form, date: e.target.value})}
                    />
                  </div>
                  <div className={`${styles.field} ${styles.checkField}`}>
                    <label className={styles.checkLabel}>
                      <input
                        type="checkbox"
                        checked={form.featured}
                        onChange={e => setForm({...form, featured: e.target.checked})}
                      />
                      Mettre en avant sur l'accueil
                    </label>
                  </div>
                </div>
                <div className={styles.modalActions}>
                  <button type="button" onClick={() => setShowForm(false)} className={styles.cancelBtn}>Annuler</button>
                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Enregistrement...' : (editProject ? 'Mettre à jour' : 'Ajouter le projet')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  return { props: { isAdmin: true } };
}
