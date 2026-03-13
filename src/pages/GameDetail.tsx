import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useGame, useGames } from "@/hooks/useGames";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";
import { ArrowLeft, Maximize, Minimize, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useCallback, useMemo } from "react";

const GameDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: game, isLoading } = useGame(slug || "");
  const { data: allGames } = useGames();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    if (!gameContainerRef.current) return;
    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Related games by shared genres
  const relatedGames = useMemo(() => {
    if (!game || !allGames) return [];
    return allGames
      .filter((g) => g.id !== game.id && g.genres.some((genre) => game.genres.includes(genre)))
      .slice(0, 12);
  }, [game, allGames]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <p className="text-lg text-muted-foreground">Game not found</p>
        <Link to="/" className="mt-4 text-primary hover:underline">Back to games</Link>
      </div>
    );
  }

  const pageTitle = `Play ${game.title} Online for Free | Pharaohs Games`;
  const pageDesc = `Play ${game.title} for free on Pharaohs Games. ${game.description.slice(0, 120)}${game.description.length > 120 ? "…" : ""} No download required.`;
  const pageUrl = `https://pharaohs-games-hub.lovable.app/game/${game.slug}`;
  const pageImage = game.images?.[0] || "";

  const gameJsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": pageDesc,
    "url": pageUrl,
    "image": pageImage,
    "genre": game.genres,
    "gamePlatform": "Web Browser",
    "applicationCategory": "Game",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "availability": "https://schema.org/InStock" },
    "author": { "@type": "Organization", "name": "Pharaohs Games" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pharaohs-games-hub.lovable.app/" },
      { "@type": "ListItem", "position": 2, "name": game.genres[0] || "Games", "item": `https://pharaohs-games-hub.lovable.app/?genre=${game.genres[0]}` },
      { "@type": "ListItem", "position": 3, "name": game.title, "item": pageUrl },
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={pageImage} />
        <script type="application/ld+json">{JSON.stringify(gameJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <Header />
      <div className="px-4 py-4 lg:px-8">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to={`/?genre=${game.genres[0]}`} className="hover:text-primary transition-colors capitalize">
            {game.genres[0]?.replace(/-/g, " ") || "Games"}
          </Link>
          <span>/</span>
          <span className="text-foreground">{game.title}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 lg:grid-cols-[1fr_340px]"
        >
          {/* Game embed */}
          <div>
            <div
              ref={gameContainerRef}
              className="relative overflow-hidden rounded-lg bg-card"
            >
              <div className="relative aspect-video w-full">
                <iframe
                  src={game.gameURL}
                  title={`Play ${game.title} - Free Online Game`}
                  className="absolute inset-0 h-full w-full"
                  allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <button
                onClick={toggleFullscreen}
                className="absolute bottom-3 right-3 z-10 rounded-lg bg-background/80 p-2 text-foreground backdrop-blur transition-colors hover:bg-background"
                title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              >
                {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>

            <article className="mt-4 rounded-lg bg-card p-5">
              <h2 className="font-display text-base font-semibold text-foreground">
                How to Play {game.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                {game.howToPlayText}
              </p>
            </article>
          </div>

          {/* Info panel */}
          <aside className="space-y-4">
            <div className="rounded-lg bg-card p-5">
              <h1 className="font-display text-xl font-bold text-gold-gradient">
                {game.title} — Play Free Online
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {game.description.slice(0, 250)}
                {game.description.length > 250 && "…"}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {game.genres.map((g) => (
                  <Link
                    key={g}
                    to={`/?genre=${g}`}
                    className="rounded bg-secondary px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-card p-5">
              <h3 className="text-sm font-semibold text-foreground">Platforms</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {game.mobileReady.map((p) => (
                  <span key={p} className="rounded bg-secondary px-2.5 py-1 text-[11px] text-muted-foreground">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </motion.div>

        {/* Related games */}
        {relatedGames.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-4 font-display text-base font-bold text-foreground">
              Similar Games You Might Like
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {relatedGames.map((g) => (
                <GameCard key={g.id} game={g} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default GameDetail;
