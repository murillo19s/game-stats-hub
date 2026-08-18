import { useState, useEffect } from 'react';
import { mockGamesData } from '../services/mockGames';
import type { Game, RawgResponse } from '../services/mockGames';

export const useGames = () => {
  const [data, setData] = useState<RawgResponse<Game> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(mockGamesData);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
};