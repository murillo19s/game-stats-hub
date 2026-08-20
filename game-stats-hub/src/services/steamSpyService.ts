export interface SteamSpyGame {
  appid: number;
  name: string;
  developer: string;
  publisher: string;
  positive: number;
  negative: number;
  owners: string;
  average_forever: number;
  median_2weeks: number;
  price: string;
}

// Usamos um proxy gratuito para contornar o bloqueio de CORS do navegador
const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const STEAM_SPY_URL = "https://steamspy.com/api.php?request=top100in2weeks";

export async function fetchTopSteamGames(): Promise<SteamSpyGame[]> {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(STEAM_SPY_URL)}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar dados da SteamSpy");
    }
    const data = await response.json();
    
    // A API retorna um objeto com chaves numéricas; convertemos para array
    const gamesArray: SteamSpyGame[] = Object.values(data);
    return gamesArray.slice(0, 20); // Retorna os top 20 jogos mais jogados
  } catch (error) {
    console.error("Falha na requisição SteamSpy:", error);
    return [];
  }
}