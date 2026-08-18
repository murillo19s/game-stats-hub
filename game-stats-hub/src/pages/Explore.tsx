import React, { useState, useEffect } from 'react';
import { GameCard } from '../components/games/GameCard';
import { GameModal } from '../components/games/GameModal';
import type { Game } from '../services/mockGames';
import { fetchSteamGames } from '../services/api';
import { Search, Compass, Loader2, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

const GENRES_LIST = [
  'Todos',
  'Action',
  'Adventure',
  'RPG',
  'Shooter',
  'Strategy',
  'Simulation',
  'Racing',
  'Sports',
  'Indie',
  'Massively Multiplayer',
];

export const Explore: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const delayDebounce = setTimeout(async () => {
      const data = await fetchSteamGames(searchTerm, selectedGenre, page);
      if (isMounted) {
        setGames(data.results);
        setTotalPages(data.totalPages);
        setTotalCount(data.count);
        setLoading(false);
      }
    }, 400);

    return () => {
      isMounted = false;
      clearTimeout(delayDebounce);
    };
  }, [searchTerm, selectedGenre, page]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    setPage(1);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            Catálogo Global Steam
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Explorar Todos os Jogos</h1>
          <p className="text-slate-400 text-sm">
            {totalCount > 0
              ? `${totalCount.toLocaleString('pt-BR')} jogos encontrados na Steam Store`
              : 'Pesquise pelo título de qualquer jogo existente na Steam'}
          </p>
        </div>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Digite o nome de qualquer jogo da Steam..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Lista de Gêneros */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
          {GENRES_LIST.map((genre) => (
            <button
              key={genre}
              onClick={() => handleGenreChange(genre)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedGenre === genre
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Exibição de Conteúdo / Carregando */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <Loader2 className="w-10 h-10 text-violet-500 animate-spin" />
          <p className="text-slate-400 text-sm font-medium">Buscando catálogo da Steam...</p>
        </div>
      ) : games.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onSelectGame={(g) => setSelectedGame(g)}
              />
            ))}
          </div>

          {/* Paginação */}
          <div className="pt-8 flex items-center justify-center gap-3">
            <button
              disabled={page <= 1}
              onClick={() => {
                setPage((p) => Math.max(1, p - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-slate-400 px-3">
              Página <strong className="text-white">{page}</strong> de <strong className="text-white">{totalPages}</strong>
            </span>

            <button
              disabled={page >= totalPages}
              onClick={() => {
                setPage((p) => p + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/60">
          <p className="text-slate-400 text-sm font-medium">Nenhum jogo encontrado na Steam para esses critérios.</p>
        </div>
      )}

      {/* Modal de Detalhes */}
      <GameModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />
    </div>
  );
};

export default Explore;