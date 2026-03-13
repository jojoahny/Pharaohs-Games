import { useQuery } from "@tanstack/react-query";
import type { Game, GamesData } from "@/types/game";

async function fetchGames(): Promise<Game[]> {
  const res = await fetch("./data/games.json");
  const data: GamesData = await res.json();
  // Flatten all segments into one list, deduplicate by id
  const map = new Map<string, Game>();
  for (const seg of data.segments) {
    for (const game of seg.hits) {
      if (!map.has(game.id)) map.set(game.id, game);
    }
  }
  return Array.from(map.values());
}

export function useGames() {
  return useQuery({ queryKey: ["games"], queryFn: fetchGames, staleTime: Infinity });
}

export function useGame(slug: string) {
  const { data: games, ...rest } = useGames();
  const game = games?.find((g) => g.slug === slug);
  return { data: game, ...rest };
}

export function getAllGenres(games: Game[]): string[] {
  const set = new Set<string>();
  games.forEach((g) => g.genres.forEach((genre) => set.add(genre)));
  return Array.from(set).sort();
}
