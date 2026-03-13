import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Game } from "@/types/game";
import { Gamepad2 } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const GameCard = ({ game }: { game: Game }) => {
  const thumbnail = game.images?.[0];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);

  const previewVideoUrl = useMemo(() => {
    const videoEntry = game.videos?.find(
      (v) => v.external_url?.trim() || v.playgama_id?.trim()
    );

    if (!videoEntry) return undefined;

    const external = videoEntry.external_url?.trim();
    if (external) return external;

    const id = videoEntry.playgama_id?.trim();
    return id ? `https://video.playgama.com/${id}/orig_length_h320.mp4` : undefined;
  }, [game.videos]);

  useEffect(() => {
    setVideoErrored(false);
  }, [previewVideoUrl]);

  const canShowVideo = Boolean(previewVideoUrl) && !videoErrored;

  const handleMouseEnter = () => {
    setHovering(true);

    if (!canShowVideo || !videoRef.current) return;

    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {
      // Ignore autoplay rejection and keep thumbnail visible if needed.
    });
  };

  const handleMouseLeave = () => {
    setHovering(false);

    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to={`/game/${game.slug}`}
        className="group block overflow-hidden rounded-lg bg-card transition-all duration-300 hover:ring-1 hover:ring-primary/40"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={game.title}
              loading="lazy"
              className={cn(
                "h-full w-full object-cover transition-all duration-500",
                hovering && canShowVideo ? "opacity-0" : "opacity-100 group-hover:scale-110"
              )}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Gamepad2 className="h-12 w-12 text-muted-foreground" />
            </div>
          )}

          {canShowVideo && (
            <video
              ref={videoRef}
              src={previewVideoUrl}
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoErrored(true)}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-300",
                hovering ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </div>

        <div className="p-2.5">
          <h3 className="truncate text-sm font-medium text-foreground">{game.title}</h3>
        </div>
      </Link>
    </motion.div>
  );
};

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default GameCard;

