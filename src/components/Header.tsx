import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onSearch?: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">𓂀</span>
          <span className="font-display text-lg font-bold text-gold-gradient">
            Pharaohs Games
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                placeholder="Search games..."
                className="w-48 rounded-lg border border-border bg-secondary px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary md:w-72"
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setQuery("");
                  onSearch?.("");
                }}
                className="p-1.5 text-muted-foreground hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Search size={16} />
              <span className="hidden md:inline">Search</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
