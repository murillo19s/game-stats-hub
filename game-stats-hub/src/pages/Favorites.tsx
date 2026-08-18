import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { GameCard } from '../components/games/GameCard';
import { GameModal } from '../components/games/GameModal';
import type { Game } from '../services/mockGames';
import { Heart, Sparkles, Download, Printer } from 'lucide-react';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Função para exportar como CSV
  const handleExportCSV = () => {
    if (favorites.length === 0) return;

    const headers = ['ID', 'Nome', 'Lançamento', 'Metacritic', 'Nota RAWG', 'Horas Estimadas', 'Gêneros'];
    const rows = favorites.map((g) => [
      g.id,
      `"${g.name.replace(/"/g, '""')}"`,
      g.released || 'N/A',
      g.metacritic || 'N/A',
      g.rating || 'N/A',
      g.playtime || 0,
      `"${g.genres.map((gen) => gen.name).join(', ')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(';'), ...rows.map((e) => e.join(';'))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `minha-wishlist-steam-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Função para imprimir ou salvar em PDF
  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold mb-2">
            <Heart className="w-3.5 h-3.5 fill-rose-500" />
            Wishlist & Favoritos
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Meus Jogos Salvos</h1>
          <p className="text-slate-400 text-sm">
            {favorites.length} {favorites.length === 1 ? 'jogo salvo' : 'jogos salvos'} na sua lista local.
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-violet-500 text-xs font-semibold cursor-pointer transition-all shadow-sm"
              title="Baixar planilha CSV"
            >
              <Download className="w-4 h-4 text-violet-400" />
              Exportar CSV
            </button>

            <button
              onClick={handlePrintPDF}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white hover:border-violet-500 text-xs font-semibold cursor-pointer transition-all shadow-sm"
              title="Imprimir ou Salvar PDF"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              Salvar PDF
            </button>
          </div>
        )}
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((game) => (
            <GameCard key={game.id} game={game} onSelectGame={(g) => setSelectedGame(g)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-slate-800/60 p-8 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-200">Sua lista está vazia</h2>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            Clique no ícone de coração nos cards do catálogo ou do ranking para salvar jogos aqui.
          </p>
        </div>
      )}

      <GameModal game={selectedGame} onClose={() => setSelectedGame(null)} />
    </div>
  );
};

export default Favorites;