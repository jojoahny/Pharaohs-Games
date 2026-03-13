import { cn } from "@/lib/utils";

interface GenreFilterProps {
  genres: string[];
  selected: string | null;
  onSelect: (genre: string | null) => void;
}

const GenreFilter = ({ genres, selected, onSelect }: GenreFilterProps) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => onSelect(null)}
      className={cn(
        "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
        !selected
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-muted-foreground hover:text-foreground"
      )}
    >
      All
    </button>
    {genres.slice(0, 20).map((genre) => (
      <button
        key={genre}
        onClick={() => onSelect(genre === selected ? null : genre)}
        className={cn(
          "rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
          genre === selected
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-muted-foreground hover:text-foreground"
        )}
      >
        {genre}
      </button>
    ))}
  </div>
);

export default GenreFilter;
