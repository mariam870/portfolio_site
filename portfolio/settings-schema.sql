-- Créer la table settings dans Supabase
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Lecture publique
CREATE POLICY "Lecture publique settings"
  ON settings FOR SELECT
  USING (true);

-- Écriture via service role
CREATE POLICY "Écriture settings via service role"
  ON settings FOR ALL
  USING (auth.role() = 'service_role');
