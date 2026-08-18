import React, { useState } from 'react';
import { mockGamesData, type Game } from '../services/mockGames';
import { GameCard } from '../components/games/GameCard';
import { GameModal } from '../components/games/GameModal';
import { Trophy, Award, Flame } from 'lucide-react';

export const TopRated: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Ordenar por Metacritic descrescente
  const topGames = [...mockGamesData.results].sort((a, b) => b.metacritic - a.metacritic);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Trophy className="w-3.5 h-3.5" />
            Hall da Fama dos Games
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Top Melhores Avaliados</h1>
          <p className="text-slate-400 text-sm">Jogos consagrados pela crítica com pontuação mais alta no Metacritic.</p>
        </div>
      </div>

      {/* Destaque TOP 3 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topGames.slice(0, 3).map((game, index) => (
          <div
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className="relative cursor-pointer p-6 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-500/30 hover:border-amber-500/70 transition-all duration-300 group overflow-hidden shadow-xl"
          >
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black">
              <Award className="w-4 h-4" /> #{index + 1}
            </div>

            <img src={game.background_image} alt={game.name} className="w-full aspect-video object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform" />
            <h3 className="text-lg font-extrabold text-white group-hover:text-amber-400 transition-colors">{game.name}</h3>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-slate-400 flex items-center gap-1">
                <Flame className="w-4 h-4 text-rose-400" /> {game.genres[0]?.name}
              </span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                Score {game.metacritic}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Grid Completo */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Ranking Completo da Crítica</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {topGames.map((game) => (
            <GameCard key={game.id} game={game} onSelectGame={(g) => setSelectedGame(g)} />
          ))}
        </div>
      </div>

      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
};

export default TopRated;