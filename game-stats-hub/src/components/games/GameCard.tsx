import React from 'react';
import { Star, Clock, Calendar, Heart } from 'lucide-react';
import type { Game } from '../../services/mockGames';
import { useFavorites } from '../../context/FavoritesContext';

interface GameCardProps {
  game: Game;
  onSelectGame?: (game: Game) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onSelectGame }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorited = isFavorite(game.id);

  return (
    <div
      onClick={() => onSelectGame?.(game)}
      className="group cursor-pointer rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 transform hover:-translate-y-1 flex flex-col relative"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <img
          src={game.background_image}
          alt={game.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(game);
          }}
          className={`absolute top-3 left-3 p-2 rounded-xl backdrop-blur-md transition-all cursor-pointer ${
            favorited
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : 'bg-slate-950/60 text-slate-400 border border-slate-800/60 hover:text-rose-400 hover:bg-slate-900'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {game.metacritic ? (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-md text-emerald-400 text-xs font-bold">
            {game.metacritic}
          </div>
        ) : null}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {game.genres?.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <h3 className="font-bold text-slate-100 text-base group-hover:text-violet-400 transition-colors line-clamp-1">
            {game.name}
          </h3>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1 text-amber-400 font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{game.rating ? game.rating.toFixed(1) : 'N/A'}</span>
          </div>

          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>~{game.playtime || 0}h</span>
          </div>

          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{game.released ? game.released.slice(0, 4) : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;