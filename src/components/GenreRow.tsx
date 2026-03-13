import { useRef } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import type { Game } from "@/types/game";
import GameCard from "./GameCard";

interface GenreRowProps {
  genre: string;
  games: Game[];
  variant?: "default" | "featured";
}

const GenreRow = ({ genre, games, variant = "default" }: GenreRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isFeatured = variant === "featured";

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className={isFeatured ? "mb-8" : "mb-6"}>
      <div className="mb-2 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          {isFeatured && <Flame size={20} className="text-primary" />}
          <h2
            className={
              isFeatured
                ? "font-display text-xl font-bold text-primary"
                : "font-display text-base font-bold text-foreground"
            }
          >
            {genre}
          </h2>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => scroll("left")}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin"
      >
        {games.map((game) => (
          <div
            key={game.id}
            className={
              isFeatured
                ? "w-52 shrink-0 sm:w-56 md:w-64 lg:w-72"
                : "w-36 shrink-0 sm:w-40 md:w-44 lg:w-48"
            }
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GenreRow;
