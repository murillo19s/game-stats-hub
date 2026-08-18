import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import type { Game, Genre } from '../../services/mockGames';

interface StatsChartsProps {
  games: Game[];
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#10b981', '#f59e0b'];

export default function StatsCharts({ games }: StatsChartsProps) {
  const playtimeData = games.map((game) => ({
    name: game.name.length > 12 ? `${game.name.substring(0, 12)}...` : game.name,
    playtime: game.playtime,
  }));

  const genreCountMap: { [key: string]: number } = {};
  games.forEach((game) => {
    game.genres.forEach((g: Genre) => {
      genreCountMap[g.name] = (genreCountMap[g.name] || 0) + 1;
    });
  });

  const genreData = Object.keys(genreCountMap).map((name) => ({
    name,
    value: genreCountMap[name],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-base font-semibold text-white mb-4">
          Tempo Médio de Jogo (Horas)
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={playtimeData}>
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Bar dataKey="playtime" fill="#6366f1" radius={[4, 4, 0, 0]} name="Horas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <h3 className="text-base font-semibold text-white mb-4">
          Distribuição por Gênero
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genreData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {genreData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}