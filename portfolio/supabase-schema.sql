-- ============================================
-- SCHEMA SUPABASE — Portfolio Communication Visuelle
-- À exécuter dans l'éditeur SQL de Supabase
-- ============================================

-- 1. Créer la table projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  video_url TEXT,
  category TEXT NOT NULL CHECK (category IN ('Photo', 'Vidéo', 'Community Management', 'Infographie')),
  date TIMESTAMPTZ DEFAULT NOW(),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index pour accélérer les filtres par catégorie
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_date ON projects(date DESC);

-- 3. Activer RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 4. Politique : lecture publique (tout le monde peut voir les projets)
CREATE POLICY "Lecture publique des projets"
  ON projects FOR SELECT
  USING (true);

-- 5. Politique : écriture via service role uniquement (depuis l'API Next.js)
CREATE POLICY "Écriture via service role"
  ON projects FOR ALL
  USING (auth.role() = 'service_role');

-- 6. (Optionnel) Insérer quelques projets de démonstration
INSERT INTO projects (titre, description, category, date, featured) VALUES
  ('Campagne Instagram — Marque Mode', 'Création de contenu visuel pour une marque de mode locale. Augmentation de l''engagement de 45%.', 'Community Management', NOW() - INTERVAL '10 days', TRUE),
  ('Shooting Portrait Studio', 'Séance photo portrait professionnel avec éclairage studio.', 'Photo', NOW() - INTERVAL '20 days', TRUE),
  ('Affiche Concert Jazz', 'Design d''affiche pour un festival de jazz, typographie et illustration.', 'Infographie', NOW() - INTERVAL '30 days', TRUE),
  ('Clip Promotion — Produit Local', 'Réalisation d''un clip promotionnel de 60 secondes pour un produit artisanal.', 'Vidéo', NOW() - INTERVAL '45 days', FALSE);
