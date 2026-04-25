# 🎨 Portfolio — Communication Visuelle
> Stack : Next.js 14 · Supabase · Vercel

---

## 🚀 DÉPLOIEMENT EN 4 ÉTAPES

---

### ÉTAPE 1 — Configurer Supabase (base de données)

1. Va sur [supabase.com](https://supabase.com) et crée un compte gratuit
2. Clique sur **"New Project"** → donne un nom → choisis une région proche
3. Une fois le projet créé, va dans **SQL Editor** (menu de gauche)
4. Copie tout le contenu du fichier `supabase-schema.sql` et **exécute-le**
5. Note tes clés API (dans **Settings → API**) :
   - `Project URL` → c'est `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → c'est `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` → c'est `SUPABASE_SERVICE_ROLE_KEY` (garde-la secrète !)

---

### ÉTAPE 2 — Préparer le projet localement

```bash
# Installer les dépendances
npm install

# Créer le fichier .env.local
cp .env.example .env.local
```

Puis édite `.env.local` avec tes vraies clés Supabase :
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_PASSWORD=ton_mot_de_passe_admin
```

```bash
# Tester en local
npm run dev
# → Ouvre http://localhost:3000
```

---

### ÉTAPE 3 — Déployer sur Vercel

1. Pousse ton projet sur **GitHub** (crée un repo et fais un push)
2. Va sur [vercel.com](https://vercel.com) → connecte ton compte GitHub
3. Clique **"Add New Project"** → sélectionne ton repo
4. Dans **"Environment Variables"**, ajoute toutes les variables de `.env.example` :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_BASE_URL` → mets l'URL Vercel (ex: `https://mon-portfolio.vercel.app`)
   - `NEXT_PUBLIC_ADMIN_PASSWORD` → ton mot de passe
5. Clique **"Deploy"** → ✅ Ton site est en ligne en 2 minutes !

---

### ÉTAPE 4 — Personnaliser le site

#### 🖼️ Changer les images
- Dans `next.config.js`, ajoute ton domaine Supabase dans `images.domains`
- Pour chaque projet, colle l'URL publique de l'image dans l'admin

#### 👤 Modifier les infos personnelles
- **Nom/logo** : cherche "KADIO" dans tous les fichiers et remplace
- **Page À propos** (`pages/a-propos.js`) : modifie les compétences, parcours, texte
- **Réseaux sociaux** : modifie les liens dans `components/Footer.js`
- **Email** : modifie dans `pages/contact.js`

#### 🎨 Modifier les couleurs
Dans `styles/globals.css` → modifie les variables CSS :
```css
--accent: #c8a96e;     /* Couleur dorée principale */
--black: #0a0a0a;      /* Fond */
--white: #f5f3ef;      /* Texte */
```

---

## 📁 STRUCTURE DU PROJET

```
portfolio/
├── pages/
│   ├── index.js          ← Page d'accueil
│   ├── projets.js        ← Page projets avec filtres
│   ├── a-propos.js       ← Page à propos
│   ├── contact.js        ← Page contact
│   ├── admin.js          ← Interface de gestion (protégée)
│   └── api/
│       └── projects/
│           ├── index.js  ← GET tous / POST nouveau
│           └── [id].js   ← GET un / PUT / DELETE
├── components/
│   ├── Navbar.js         ← Navigation
│   ├── Footer.js         ← Pied de page
│   └── ProjectCard.js    ← Carte projet
├── lib/
│   └── supabase.js       ← Client Supabase
├── styles/
│   └── globals.css       ← Styles globaux + variables
├── .env.example          ← Variables d'environnement (template)
├── supabase-schema.sql   ← Script SQL à exécuter dans Supabase
└── next.config.js        ← Configuration Next.js
```

---

## 🔧 AJOUTER UN PROJET (Guide rapide)

1. Va sur `ton-site.vercel.app/admin`
2. Entre ton mot de passe admin
3. Clique **"Ajouter un projet"**
4. Remplis :
   - **Titre** : nom du projet
   - **Catégorie** : Photo / Vidéo / Community Management / Infographie
   - **Description** : contexte ou résultats
   - **URL de l'image** : colle un lien direct vers ton image
     - _Conseil : héberge tes images sur Supabase Storage ou Cloudinary (gratuit)_
5. Clique **"Ajouter"** → le projet apparaît immédiatement sur le site !

---

## 💡 HÉBERGER SES IMAGES GRATUITEMENT

### Option A — Supabase Storage (recommandé)
1. Dans Supabase → **Storage** → crée un bucket `projects` (public)
2. Upload tes images → copie l'URL publique → colle dans l'admin

### Option B — Cloudinary (très facile)
1. Crée un compte gratuit sur [cloudinary.com](https://cloudinary.com)
2. Upload l'image → copie l'URL → colle dans l'admin

---

## 🔒 SÉCURITÉ

- L'interface admin est protégée par mot de passe (variable `NEXT_PUBLIC_ADMIN_PASSWORD`)
- Les API utilisent la `service_role` Supabase (côté serveur uniquement)
- RLS activé sur Supabase : lecture publique, écriture via service role uniquement
- **Ne committe jamais** `.env.local` sur GitHub (il est dans `.gitignore`)

---

## 🛠️ COMMANDES UTILES

```bash
npm run dev      # Développement local
npm run build    # Build de production
npm run start    # Lancer la version production localement
```

---

Bonne chance pour ton portfolio ! 🚀
