import React, { useState } from 'react';
import { mockGamesData } from '../services/mockGames';
import { Scale, Trophy, Clock, Star, Calendar } from 'lucide-react';

export const Compare: React.FC = () => {
  const [game1Id, setGame1Id] = useState<number>(mockGamesData.results[0].id);
  const [game2Id, setGame2Id] = useState<number>(mockGamesData.results[1].id);

  const game1 = mockGamesData.results.find((g) => g.id === game1Id) || mockGamesData.results[0];
  const game2 = mockGamesData.results.find((g) => g.id === game2Id) || mockGamesData.results[1];

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-2">
          <Scale className="w-3.5 h-3.5" />
          Comparador Estatístico
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Comparar Jogos Lado a Lado</h1>
        <p className="text-slate-400 text-sm">Compare métricas de notas, tempo médio e recepção crítica.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Seletor Jogo 1 */}
        <div className="space-y-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Escolha o 1º Jogo</label>
          <select
            value={game1Id}
            onChange={(e) => setGame1Id(Number(e.target.value))}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-violet-500"
          >
            {mockGamesData.results.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          <img src={game1.background_image} alt={game1.name} className="w-full aspect-video object-cover rounded-2xl border border-slate-800" />
          <h2 className="text-xl font-bold text-white">{game1.name}</h2>
          <p className="text-sm text-slate-400 line-clamp-3">{game1.description}</p>
        </div>

        {/* Seletor Jogo 2 */}
        <div className="space-y-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Escolha o 2º Jogo</label>
          <select
            value={game2Id}
            onChange={(e) => setGame2Id(Number(e.target.value))}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white font-medium focus:outline-none focus:border-violet-500"
          >
            {mockGamesData.results.map((g) => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
          <img src={game2.background_image} alt={game2.name} className="w-full aspect-video object-cover rounded-2xl border border-slate-800" />
          <h2 className="text-xl font-bold text-white">{game2.name}</h2>
          <p className="text-sm text-slate-400 line-clamp-3">{game2.description}</p>
        </div>
      </div>

      {/* Tabela Comparativa */}
      <div className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <h3 className="font-bold text-white text-lg">Resumo das Métricas</h3>
        </div>

        <div className="divide-y divide-slate-800">
          {/* Metacritic */}
          <div className="grid grid-cols-3 p-4 items-center text-center">
            <span className={`text-lg font-black ${game1.metacritic >= game2.metacritic ? 'text-emerald-400' : 'text-slate-400'}`}>
              {game1.metacritic}
            </span>
            <div className="flex items-center justify-center gap-1.5 text-xs uppercase font-bold text-slate-400">
              <Trophy className="w-4 h-4 text-emerald-400" /> Metacritic
            </div>
            <span className={`text-lg font-black ${game2.metacritic >= game1.metacritic ? 'text-emerald-400' : 'text-slate-400'}`}>
              {game2.metacritic}
            </span>
          </div>

          {/* Avaliação Usuários */}
          <div className="grid grid-cols-3 p-4 items-center text-center">
            <span className={`text-lg font-black ${game1.rating >= game2.rating ? 'text-amber-400' : 'text-slate-400'}`}>
              ★ {game1.rating.toFixed(1)}
            </span>
            <div className="flex items-center justify-center gap-1.5 text-xs uppercase font-bold text-slate-400">
              <Star className="w-4 h-4 text-amber-400" /> Avaliação
            </div>
            <span className={`text-lg font-black ${game2.rating >= game1.rating ? 'text-amber-400' : 'text-slate-400'}`}>
              ★ {game2.rating.toFixed(1)}
            </span>
          </div>

          {/* Horas Jogadas */}
          <div className="grid grid-cols-3 p-4 items-center text-center">
            <span className={`text-lg font-black ${game1.playtime >= game2.playtime ? 'text-violet-400' : 'text-slate-400'}`}>
              {game1.playtime}h
            </span>
            <div className="flex items-center justify-center gap-1.5 text-xs uppercase font-bold text-slate-400">
              <Clock className="w-4 h-4 text-violet-400" /> Média de Jogo
            </div>
            <span className={`text-lg font-black ${game2.playtime >= game1.playtime ? 'text-violet-400' : 'text-slate-400'}`}>
              {game2.playtime}h
            </span>
          </div>

          {/* Lançamento */}
          <div className="grid grid-cols-3 p-4 items-center text-center">
            <span className="text-sm font-semibold text-slate-300">{game1.released}</span>
            <div className="flex items-center justify-center gap-1.5 text-xs uppercase font-bold text-slate-400">
              <Calendar className="w-4 h-4 text-slate-400" /> Ano
            </div>
            <span className="text-sm font-semibold text-slate-300">{game2.released}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;