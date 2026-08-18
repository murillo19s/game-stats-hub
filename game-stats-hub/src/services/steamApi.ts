export interface SteamAppDetails {
  steam_appid: number;
  name: string;
  short_description: string;
  header_image: string;
  release_date?: {
    date: string;
  };
  metacritic?: {
    score: number;
  };
  genres?: Array<{
    id: string;
    description: string;
  }>;
  price_overview?: {
    final_formatted: string;
    discount_percent: number;
  };
}

// IDs dos jogos mais jogados e populares da Steam
export const POPULAR_STEAM_IDS = [
  730,     // Counter-Strike 2
  570,     // Dota 2
  1172470, // Apex Legends
  578080,  // PUBG: BATTLEGROUNDS
  1086940, // Baldur's Gate 3
  1245620, // ELDEN RING
  1174180, // Red Dead Redemption 2
  271590,  // Grand Theft Auto V
  252490,  // Rust
  292030,  // The Witcher 3
  1091500, // Cyberpunk 2077
  553850,  // HELLDIVERS™ 2
  2357570, // Black Myth: Wukong
  359550,  // Rainbow Six Siege
  413150,  // Stardew Valley
  105600,  // Terraria
  227300,  // Euro Truck Simulator 2
  620,     // Portal 2
];

// Busca detalhes de um jogo diretamente na Steam Storefront API
export async function fetchSteamGameDetails(appId: number): Promise<SteamAppDetails | null> {
  try {
    const response = await fetch(`/api/steam/appdetails?appids=${appId}&cc=br&l=brazilian`);
    if (!response.ok) return null;
    
    const data = await response.json();
    if (data && data[appId] && data[appId].success) {
      return data[appId].data;
    }
    return null;
  } catch (error) {
    console.error(`Erro ao buscar dados do jogo ${appId} na Steam:`, error);
    return null;
  }
}