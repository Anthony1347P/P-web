import { supabase } from '../supabase/supabase';

export const fetchPublicaciones = async ({ categoryId = null, searchTerm = '' } = {}) => {
  console.log(' Consultando publicaciones con filtros:', { categoryId, searchTerm });

  let query = supabase
    .from('publicaciones')
    .select(`
      *,
      categoria:categoria_id (id, nombre)
    `)
    .order('created_at', { ascending: false });

  if (categoryId) {
    query = query.eq('categoria_id', categoryId);
  }

  if (searchTerm.trim()) {
    query = query.ilike('titulo', `%${searchTerm.trim()}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error(' Error en supabase:', error);
    return [];
  }

  console.log('Publicaciones obtenidas:', data);
  return data || [];
};