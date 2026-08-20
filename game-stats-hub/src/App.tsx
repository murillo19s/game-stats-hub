import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { FavoritesProvider } from './context/FavoritesContext';
import { Sidebar } from './components/layout/Sidebar';
import Header from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { Explore } from './pages/Explore';
import { TopRated } from './pages/TopRated';
import { Compare } from './pages/Compare';
import { Favorites } from './pages/Favorites';
import { SteamLive } from './pages/SteamLive';
export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <FavoritesProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-950 text-slate-100 flex">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
            <Header />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/top-rated" element={<TopRated />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/steam-live" element={<SteamLive />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;