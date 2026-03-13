import { cn } from "@/lib/utils";
import {
  Gamepad2, Swords, Puzzle, Car, Brain, Heart, Footprints,
  Target, Palette, Music, Dices, Globe, Bike, Trophy,
  Flame, Sparkles, Zap, Star, Crown, Shield,
  Volleyball, CircleDot, Timer, BookOpen
} from "lucide-react";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const genreIcons: Record<string, React.ElementType> = {
  Action: Swords,
  Adventure: Footprints,
  Arcade: Gamepad2,
  "Board Game": Dices,
  Brain: Brain,
  Card: Dices,
  Casual: Sparkles,
  Clicker: CircleDot,
  "Dress Up": Heart,
  Driving: Car,
  Educational: BookOpen,
  Fighting: Shield,
  Girls: Crown,
  Hypercasual: Zap,
  IO: Globe,
  Kids: Star,
  Match3: Puzzle,
  Multiplayer: Globe,
  Music: Music,
  Puzzle: Puzzle,
  Racing: Bike,
  RPG: Target,
  Shooting: Target,
  Simulation: Palette,
  Sports: Volleyball,
  Strategy: Brain,
  Stunt: Flame,
  Survival: Shield,
  "Time Management": Timer,
  Trivia: Trophy,
};

interface GenreSidebarProps {
  genres: string[];
  selected: string | null;
  onSelect: (genre: string | null) => void;
}

const GenreSidebar = ({ genres, selected, onSelect }: GenreSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "sticky top-16 h-[calc(100vh-4rem)] flex flex-col border-r border-border bg-sidebar transition-all duration-300 overflow-hidden z-40",
        collapsed ? "w-14" : "w-52"
      )}
    >
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 scrollbar-thin">
        <button
          onClick={() => onSelect(null)}
          className={cn(
            "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors",
            !selected
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          <Gamepad2 size={20} className="shrink-0" />
          {!collapsed && <span className="truncate font-medium">All Games</span>}
        </button>

        {genres.map((genre) => {
          const Icon = genreIcons[genre] || Gamepad2;
          return (
            <button
              key={genre}
              onClick={() => onSelect(genre === selected ? null : genre)}
              title={collapsed ? genre : undefined}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                genre === selected
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <Icon size={20} className="shrink-0" />
              {!collapsed && <span className="truncate">{genre}</span>}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center border-t border-border py-3 text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
};

export default GenreSidebar;
