import { Link } from "react-router-dom";

const popularGenres = [
  "action", "adventure", "puzzle", "racing", "sports", "shooting",
  "strategy", "arcade", "girls", "boys", "multiplayer", "simulation",
  "cards", "kids", "horror", "clicker", "io", "dress-up"
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Genre links for internal linking / SEO */}
        <nav aria-label="Game categories">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-primary mb-4">
            Browse by Category
          </h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {popularGenres.map((genre) => (
              <Link
                key={genre}
                to={`/?genre=${genre}`}
                className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground capitalize"
              >
                {genre.replace(/-/g, " ")} Games
              </Link>
            ))}
          </div>
        </nav>

        {/* SEO text block */}
        <div className="mb-8 max-w-3xl">
          <h2 className="font-display text-base font-bold text-foreground mb-2">
            Play Free Online Games on Pharaohs Games
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Pharaohs Games is a free online gaming platform with over 1,000 browser games
            you can play instantly — no downloads, no installs, no sign-ups required.
            Whether you love action games, puzzle games, racing games, or multiplayer games,
            we have something for everyone. All games run directly in your browser on desktop,
            tablet, and mobile devices. New games are added regularly so you'll always find
            something fresh to play. Start playing now and discover your next favorite game!
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">𓂀</span>
            <span className="font-display text-sm font-bold text-primary">Pharaohs Games</span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Pharaohs Games. All rights reserved. Play free browser games online.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
