import Head from 'next/head';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import styles from './admin.module.css';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiLogOut, FiEye, FiSettings, FiImage, FiUser } from 'react-icons/fi';
import Link from 'next/link';

const CATEGORIES = ['Photo', 'Vidéo', 'Community Management', 'Infographie'];
const EMPTY_FORM = { titre: '', description: '', image_url: '', video_url: '', category: 'Photo', date: '', featured: false };
const EMPTY_SETTINGS = {
  hero_title: '',
  hero_subtitle: '',
  hero_badge: '',
  accueil_image1: '',
  accueil_image2: '',
  accueil_image3: '',
  apropos_photo: '',
  apropos_nom: '',
  apropos_bio: '',
  apropos_disponible: 'true',
};

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState('');
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('Tous');
  const [activeTab, setActiveTab] = useState('projets');
  const [settings, setSettings] = useState(EMPTY_SETTINGS);
  const [savingSettings, setSavingSettings] = useState(false);

  const ADMIN_PWD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin2024';

  useEffect(() => {
    if (authed) {
      fetchProjects();
      fetchSettings();
    }
  }, [authed]);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(Array.isArray(data) ? data : []);
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      setSettings(prev => ({ ...prev, ...data }));
    } catch {}
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

  const saveSetting = async (key, value) => {
    setSavingSettings(true);
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    });
    if (res.ok) {
      toast.success('Paramètre sauvegardé !');
    } else {
      toast.error('Erreur lors de la sauvegarde.');
    }
    setSavingSettings(false);
  };

  const saveAllSettings = async () => {
    setSavingSettings(true);
    for (const [key, value] of Object.entries(settings)) {
      if (value) {
        await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value }),
        });
      }
    }
    toast.success('Tous les paramètres sauvegardés !');
    setSavingSettings(false);
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

  // LOGIN
  if (!authed) {
    return (
      <>
        <Head><title>Admin — Young Art Studio</title></Head>
        <div className={styles.loginPage}>
          <div className={styles.loginCard}>
            <div className={styles.loginLogo}>Young_Art_Studio</div>
            <h1>Interface Admin</h1>
            <p>Connectez-vous pour gérer votre site.</p>
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
      <Head><title>Admin — Young Art Studio</title></Head>
      <div className={styles.adminPage}>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarLogo}>Young_Art_Studio</div>
          <nav className={styles.sideNav}>
            <button
              className={`${styles.navBtn} ${activeTab === 'projets' ? styles.navActive : ''}`}
              onClick={() => setActiveTab('projets')}
            >
              <FiImage /> Projets ({projects.length})
            </button>
            <button
              className={`${styles.navBtn} ${activeTab === 'accueil' ? styles.navActive : ''}`}
              onClick={() => setActiveTab('accueil')}
            >
              <FiSettings /> Page Accueil
            </button>
            <button
              className={`${styles.navBtn} ${activeTab === 'apropos' ? styles.navActive : ''}`}
              onClick={() => setActiveTab('apropos')}
            >
              <FiUser /> Page À propos
            </button>
          </nav>
          <div className={styles.sideActions}>
            <Link href="/" className={styles.sideLink} target="_blank"><FiEye /> Voir le site</Link>
            <button onClick={() => setAuthed(false)} className={styles.logoutBtn}><FiLogOut /> Déconnexion</button>
          </div>
        </aside>

        {/* MAIN */}
        <main className={styles.main}>

          {/* ===== ONGLET PROJETS ===== */}
          {activeTab === 'projets' && (
            <>
              <div className={styles.topBar}>
                <div>
                  <h1>Gestion des projets</h1>
                  <p>{projects.length} projet{projects.length !== 1 ? 's' : ''} au total</p>
                </div>
                <button className={styles.addBtn} onClick={openAdd}>
                  <FiPlus /> Ajouter un projet
                </button>
              </div>

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
                            {p.date ? new Date(p.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short' }) : '—'}
                          </td>
                          <td>
                            <div className={styles.actions}>
                              <button onClick={() => openEdit(p)} className={styles.editBtn} title="Modifier"><FiEdit2 /></button>
                              <button onClick={() => handleDelete(p.id)} className={styles.deleteBtn} title="Supprimer"><FiTrash2 /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </>
          )}

          {/* ===== ONGLET ACCUEIL ===== */}
          {activeTab === 'accueil' && (
            <>
              <div className={styles.topBar}>
                <div>
                  <h1>Page Accueil</h1>
                  <p>Modifiez les textes et images de la page d'accueil</p>
                </div>
              </div>

              <div className={styles.settingsGrid}>
                {/* TEXTES HERO */}
                <div className={styles.settingsCard}>
                  <h3>✏️ Textes principaux</h3>
                  <div className={styles.field}>
                    <label>Badge (ex: "Disponible pour des projets")</label>
                    <input
                      type="text"
                      value={settings.hero_badge}
                      onChange={e => setSettings({...settings, hero_badge: e.target.value})}
                      placeholder="Disponible pour des projets"
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Sous-titre</label>
                    <textarea
                      value={settings.hero_subtitle}
                      onChange={e => setSettings({...settings, hero_subtitle: e.target.value})}
                      placeholder="Étudiant en communication visuelle..."
                      rows={3}
                    />
                  </div>
                </div>

                {/* IMAGES ACCUEIL */}
                <div className={styles.settingsCard}>
                  <h3>🖼️ Images des catégories</h3>
                  <p className={styles.hint}>Colle le lien direct de tes images (Imgur, imgbb...)</p>

                  {['Photographie', 'Vidéo', 'Community Management', 'Infographie'].map((cat, i) => (
                    <div className={styles.field} key={cat}>
                      <label>Image — {cat}</label>
                      <div className={styles.imageInputRow}>
                        <input
                          type="url"
                          value={settings[`cat_image_${i}`] || ''}
                          onChange={e => setSettings({...settings, [`cat_image_${i}`]: e.target.value})}
                          placeholder="https://i.imgur.com/..."
                        />
                        {settings[`cat_image_${i}`] && (
                          <img src={settings[`cat_image_${i}`]} alt={cat} className={styles.miniPreview} onError={e => e.target.style.display='none'} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button className={styles.saveBtn} onClick={saveAllSettings} disabled={savingSettings}>
                  {savingSettings ? 'Sauvegarde...' : '💾 Sauvegarder les modifications'}
                </button>
              </div>
            </>
          )}

          {/* ===== ONGLET A PROPOS ===== */}
          {activeTab === 'apropos' && (
            <>
              <div className={styles.topBar}>
                <div>
                  <h1>Page À propos</h1>
                  <p>Modifiez votre photo et vos informations personnelles</p>
                </div>
              </div>

              <div className={styles.settingsGrid}>
                <div className={styles.settingsCard}>
                  <h3>📷 Photo de profil</h3>
                  <div className={styles.field}>
                    <label>URL de votre photo</label>
                    <input
                      type="url"
                      value={settings.apropos_photo}
                      onChange={e => setSettings({...settings, apropos_photo: e.target.value})}
                      placeholder="https://i.imgur.com/..."
                    />
                  </div>
                  {settings.apropos_photo && (
                    <div className={styles.photoPreview}>
                      <img src={settings.apropos_photo} alt="Photo profil" onError={e => e.target.style.display='none'} />
                    </div>
                  )}
                </div>

                <div className={styles.settingsCard}>
                  <h3>👤 Informations personnelles</h3>
                  <div className={styles.field}>
                    <label>Nom complet</label>
                    <input
                      type="text"
                      value={settings.apropos_nom}
                      onChange={e => setSettings({...settings, apropos_nom: e.target.value})}
                      placeholder="Said Dupont"
                    />
                  </div>
                  <div className={styles.field}>
                    <label>Biographie</label>
                    <textarea
                      value={settings.apropos_bio}
                      onChange={e => setSettings({...settings, apropos_bio: e.target.value})}
                      placeholder="Étudiant passionné en communication visuelle..."
                      rows={5}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.checkLabel}>
                      <input
                        type="checkbox"
                        checked={settings.apropos_disponible === 'true'}
                        onChange={e => setSettings({...settings, apropos_disponible: e.target.checked ? 'true' : 'false'})}
                      />
                      Disponible pour des projets
                    </label>
                  </div>
                </div>

                <button className={styles.saveBtn} onClick={saveAllSettings} disabled={savingSettings}>
                  {savingSettings ? 'Sauvegarde...' : '💾 Sauvegarder les modifications'}
                </button>
              </div>
            </>
          )}
        </main>

        {/* MODAL PROJET */}
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
                    placeholder="Décrivez le projet..."
                    rows={3}
                  />
                </div>
                <div className={styles.field}>
                  <label>URL de l'image</label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={e => setForm({...form, image_url: e.target.value})}
                    placeholder="https://i.imgur.com/..."
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
