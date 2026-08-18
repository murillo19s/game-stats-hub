import type { Game } from './mockGames';

const API_KEY = 'c542e67aec3a4340908f9de9e86038af';
const BASE_URL = 'https://api.rawg.io/api';

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export async function fetchSteamGames(
  searchQuery: string = '',
  genre: string = 'Todos',
  page: number = 1
): Promise<{ results: Game[]; count: number; totalPages: number }> {
  try {
    // Filtro stores=1 garante apenas jogos lançados na loja da Steam
    const params = new URLSearchParams({
      key: API_KEY,
      stores: '1', // 1 = Steam Store
      page_size: '20',
      page: page.toString(),
    });

    if (searchQuery.trim()) {
      params.append('search', searchQuery.trim());
    }

    if (genre !== 'Todos') {
      params.append('genres', genre.toLowerCase());
    }

    const response = await fetch(`${BASE_URL}/games?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data: ApiResponse = await response.json();

    const formattedGames: Game[] = data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      released: item.released || 'Não informada',
      background_image:
        item.background_image ||
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      rating: item.rating || 0,
      metacritic: item.metacritic || 0,
      playtime: item.playtime || 0,
      description: item.description_raw || item.name + ' disponível na Steam.',
      genres: item.genres || [],
    }));

    return {
      results: formattedGames,
      count: data.count,
      totalPages: Math.min(Math.ceil(data.count / 20), 500),
    };
  } catch (error) {
    console.error('Erro ao buscar jogos na API:', error);
    return { results: [], count: 0, totalPages: 0 };
  }
}