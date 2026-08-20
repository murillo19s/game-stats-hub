import React, { useEffect, useState } from 'react';
import { fetchTopSteamGames, type SteamSpyGame } from '../services/steamSpyService';

export const SteamLive: React.FC = () => {
  const [games, setGames] = useState<SteamSpyGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTopSteamGames().then((data) => {
      setGames(data);
      setLoading(false);
    });
  }, []);

  const filteredGames = games.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="p-6 bg-slate-900 text-white rounded-xl shadow-lg border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500/30 mb-2">
            ● Dados Reais da Steam (SteamSpy API)
          </span>
          <h2 className="text-2xl font-bold">Top Jogos Mais Ativos no Mundo</h2>
          <p className="text-slate-400 text-sm">Estatísticas ao vivo de popularidade e tempo de jogo.</p>
        </div>

        <input
          type="text"
          placeholder="Filtrar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 max-w-xs"
        />
      </div>

      {loading ? (
        <p className="text-slate-400 text-center py-8">Carregando métricas ao vivo da Steam...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGames.map((game) => {
            const totalVotes = game.positive + game.negative;
            const rating = totalVotes > 0 ? Math.round((game.positive / totalVotes) * 100) : 0;

            return (
              <div key={game.appid} className="bg-slate-800/80 rounded-lg overflow-hidden border border-slate-700 hover:border-slate-500 transition-all flex flex-col justify-between">
                <img
                  src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`}
                  alt={game.name}
                  className="w-full h-36 object-cover bg-slate-950"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-base line-clamp-1 mb-2">{game.name}</h3>
                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Aprovação:</span>
                      <span className="font-medium text-emerald-400">{rating}% Positiva</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tempo Médio:</span>
                      <span className="font-medium text-blue-400">{Math.round(game.average_forever / 60)}h jogadas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Estimativa de Donos:</span>
                      <span className="font-medium text-purple-400">{game.owners}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};