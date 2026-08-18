import React from 'react';
import { X, Star, Clock, Calendar, Flame } from 'lucide-react';
import type { Game } from '../../services/mockGames';

interface GameModalProps {
  game: Game | null;
  onClose: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-violet-950/50 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
          <img
            src={game.background_image}
            alt={game.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/80 border border-white/10 text-slate-200 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            {game.metacritic && (
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md text-emerald-400 font-bold text-sm">
                Metacritic: {game.metacritic}
              </span>
            )}
            <span className="px-3 py-1 rounded-xl bg-violet-500/20 border border-violet-500/50 backdrop-blur-md text-violet-300 font-semibold text-sm flex items-center gap-1">
              <Flame className="w-4 h-4 text-violet-400" />
              Popular na Steam
            </span>
          </div>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{game.name}</h2>
            <div className="flex flex-wrap gap-2 mt-3">
              {game.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80">
            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Nota Média
              </span>
              <span className="text-lg font-bold text-slate-100">{game.rating} / 5.0</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center border-x border-slate-800">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Clock className="w-3.5 h-3.5 text-violet-400" /> Média de Horas
              </span>
              <span className="text-lg font-bold text-slate-100">{game.playtime} horas</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center">
              <span className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5 text-sky-400" /> Lançamento
              </span>
              <span className="text-lg font-bold text-slate-100">{game.released}</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">Sobre o Jogo</h4>
            <p className="text-slate-300 leading-relaxed text-sm">
              {game.description}
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm transition-all cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};