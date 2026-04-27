import { supabaseAdmin } from '../../../lib/supabase';

export default async function handler(req, res) {
  const db = supabaseAdmin();
  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await db.from('projects').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: 'Projet non trouvé.' });
    return res.status(200).json(data);
  }

  if (req.method === 'PUT') {
    const { titre, description, image_url, video_url, category, date, featured } = req.body;
    const { data, error } = await db
      .from('projects')
      .update({ titre, description, image_url, video_url, category, date, featured })
      .eq('id', id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { error } = await db.from('projects').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: 'Projet supprimé avec succès.' });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
