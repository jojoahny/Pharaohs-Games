export interface Game {
  id: string;
  slug: string;
  title: string;
  description: string;
  howToPlayText: string;
  gameURL: string;
  playgamaGameUrl: string;
  genres: string[];
  tags: string[];
  images: string[];
  videos: { playgama_id: string; external_url: string; type: string }[];
  mobileReady: string[];
  gender: string[];
  inGamePurchases: string;
  supportedLanguages: string[];
  screenOrientation: { horizontal: boolean; vertical: boolean };
  embed: string;
}

export interface GameSegment {
  title: string;
  count: number;
  hits: Game[];
}

export interface GamesData {
  input: Record<string, unknown>;
  sort: { type: string };
  segments: GameSegment[];
}
