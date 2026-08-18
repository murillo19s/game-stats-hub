import React, { useState } from 'react';
import { GameCard } from '../components/games/GameCard';
import { GameModal } from '../components/games/GameModal';
import StatsCharts from '../components/dashboard/StatsCharts';
import { mockGamesData, type Game } from '../services/mockGames';
import { Trophy, TrendingUp } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  return (
    <div className="space-y-8 pb-10">
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-violet-900/40 via-slate-900 to-slate-900 border border-violet-500/20 overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            Steam Top Charts
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Descubra tendências, notas e estatísticas do mundo dos games
          </h1>
          <p className="mt-2 text-slate-400 text-sm sm:text-base">
            Acompanhe análises, média de horas jogadas e avaliações do Metacritic dos maiores sucessos da Steam.
          </p>
        </div>
      </div>

      <StatsCharts games={mockGamesData.results} />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Jogos em Alta na Steam</h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {mockGamesData.results.length} títulos disponíveis • Clique para ver detalhes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {mockGamesData.results.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onSelectGame={(g) => setSelectedGame(g)}
            />
          ))}
        </div>
      </div>

      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  );
};

export default Dashboard;