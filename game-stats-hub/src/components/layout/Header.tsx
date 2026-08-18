import { Search, Bell } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur border-b border-slate-800 px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input
          type="text"
          placeholder="Buscar jogos, gêneros, plataformas..."
          className="w-full bg-slate-800 text-slate-200 text-sm pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-indigo-500 placeholder:text-slate-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors">
          <Bell size={20} />
        </button>
      </div>
    </header>
  );
}
