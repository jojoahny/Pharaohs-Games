import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import GenreSidebar from "@/components/GenreSidebar";
import GenreRow from "@/components/GenreRow";
import GameCard from "@/components/GameCard";
import Footer from "@/components/Footer";
import { useGames, getAllGenres } from "@/hooks/useGames";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { data: games, isLoading } = useGames();
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<string | null>(null);

  const genres = useMemo(() => (games ? getAllGenres(games) : []), [games]);

  const gamesByGenre = useMemo(() => {
    if (!games) return new Map<string, typeof games>();
    const map = new Map<string, typeof games>();
    for (const g of genres) {
      map.set(g, games.filter((game) => game.genres.includes(g)));
    }
    return map;
  }, [games, genres]);

  const searchResults = useMemo(() => {
    if (!games || !search) return null;
    const q = search.toLowerCase();
    return games.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.genres.some((gen) => gen.toLowerCase().includes(q))
    );
  }, [games, search]);

  // Build ItemList schema for top games
  const itemListJsonLd = useMemo(() => {
    if (!games) return null;
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Trending Free Browser Games",
      "numberOfItems": Math.min(games.length, 20),
      "itemListElement": games.slice(0, 20).map((game, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "url": `https://pharaohs-games-hub.lovable.app/game/${game.slug}`,
        "name": game.title,
      })),
    };
  }, [games]);

  // FAQ schema
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the games on Pharaohs Games really free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all 1,000+ games on Pharaohs Games are completely free to play. No downloads, no installs, and no sign-ups required."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to download anything to play?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. All games run directly in your web browser. You can play on desktop, tablet, or mobile without downloading anything."
        }
      },
      {
        "@type": "Question",
        "name": "What types of games are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pharaohs Games offers action, puzzle, racing, sports, shooting, strategy, arcade, multiplayer, simulation, and many more genres."
        }
      },
      {
        "@type": "Question",
        "name": "Can I play on my phone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Most games on Pharaohs Games are mobile-friendly and work on smartphones and tablets."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pharaohs Games — Play 1000+ Free Online Games | No Download</title>
        <meta name="description" content="Play 1000+ free online games instantly on Pharaohs Games. Action, puzzle, racing, multiplayer & more — no downloads, no installs. Play now on any device!" />
        <link rel="canonical" href="https://pharaohs-games-hub.lovable.app/" />
        <meta property="og:title" content="Pharaohs Games — Play 1000+ Free Online Games" />
        <meta property="og:description" content="Play 1000+ free online games instantly. Action, puzzle, racing, multiplayer & more — no downloads required." />
        <meta property="og:url" content="https://pharaohs-games-hub.lovable.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pharaohs Games — Play 1000+ Free Online Games" />
        <meta name="twitter:description" content="Play 1000+ free online games instantly. No downloads, no installs." />
        {itemListJsonLd && (
          <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
        )}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <Header onSearch={setSearch} />

      <div className="flex">
        <GenreSidebar genres={genres} selected={genre} onSelect={setGenre} />

        <main className="flex-1 overflow-hidden p-4 md:p-6" role="main">
          {/* SEO H1 - visually styled but crawlable */}
          <h1 className="sr-only">Play Free Online Games on Pharaohs Games</h1>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : search && searchResults ? (
            <section>
              <h2 className="mb-3 font-display text-base font-bold text-foreground">
                Search results for "{search}" ({searchResults.length})
              </h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {searchResults.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          ) : genre ? (
            <section>
              <h2 className="mb-3 font-display text-base font-bold text-foreground">
                Free {genre} Games — Play Online
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                Browse and play the best free {genre.toLowerCase()} games online. No download required.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                {(gamesByGenre.get(genre) || []).map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </section>
          ) : (
            <>
              {games && games.length > 0 && (
                <GenreRow
                  genre="Trending Now"
                  games={games.slice(0, 20)}
                  variant="featured"
                />
              )}

              {genres.map((g) => {
                const genreGames = gamesByGenre.get(g);
                if (!genreGames?.length) return null;
                return <GenreRow key={g} genre={g} games={genreGames} />;
              })}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
