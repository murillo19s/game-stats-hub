export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  rating_top: number;
  metacritic: number | null;
  playtime: number;
  platforms: { platform: Platform }[];
  genres: Genre[];
}

export interface RawgResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface GameFilters {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  genres?: string;
  platforms?: string;
  dates?: string;
}