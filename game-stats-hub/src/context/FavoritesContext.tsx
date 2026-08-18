import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Game } from '../services/mockGames';

interface FavoritesContextType {
  favorites: Game[];
  toggleFavorite: (game: Game) => void;
  isFavorite: (gameId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Game[]>(() => {
    const saved = localStorage.getItem('game_stats_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('game_stats_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (game: Game) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === game.id);
      if (exists) {
        return prev.filter((item) => item.id !== game.id);
      }
      return [...prev, game];
    });
  };

  const isFavorite = (gameId: number) => {
    return favorites.some((item) => item.id === gameId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites deve ser usado dentro de um FavoritesProvider');
  }
  return context;
};