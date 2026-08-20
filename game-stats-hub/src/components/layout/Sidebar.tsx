import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Compass, Heart, Scale, Trophy, Gamepad2, Flame } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { favorites } = useFavorites();

  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/explore', label: 'Explorar Catálogo', icon: Compass },
    { to: '/top-rated', label: 'Top Avaliados', icon: Trophy },
    { to: '/compare', label: 'Comparar Jogos', icon: Scale },
    { to: '/favorites', label: 'Favoritos', icon: Heart, badge: favorites.length },
    { to: '/steam-live', label: 'Steam Ao Vivo', icon: Flame },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 rounded-xl bg-violet-600/20 text-violet-400 border border-violet-500/30">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-white tracking-wider text-base">GAME STATS</h1>
            <p className="text-[10px] text-violet-400 font-bold uppercase tracking-widest">Hub & Dashboard</p>
          </div>
        </div>

        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;