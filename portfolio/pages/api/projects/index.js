import { supabaseAdmin } from '../../../lib/supabase';

export default async function handler(req, res) {
  const db = supabaseAdmin();

  if (req.method === 'GET') {
    const { category } = req.query;
    let query = db.from('projects').select('*').order('date', { ascending: false });
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }
    const { data, error } = await query;
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { titre, description, image_url, video_url, category, date, featured } = req.body;
    if (!titre || !category) {
      return res.status(400).json({ error: 'Titre et catégorie sont requis.' });
    }
    const { data, error } = await db
      .from('projects')
      .insert([{ titre, description, image_url, video_url, category, date: date || new Date().toISOString(), featured: featured || false }])
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
