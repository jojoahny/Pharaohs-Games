import { motion } from "framer-motion";

const Hero = () => (
  <section className="relative overflow-hidden bg-pharaoh-gradient py-20 md:py-28">
    {/* Decorative elements */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a843' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
    }} />

    <div className="container relative text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="mb-4 inline-block text-5xl">𓃭</span>
        <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          <span className="text-gold-gradient">Pharaohs</span>{" "}
          <span className="text-foreground">Games</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          Discover and play over 1,000 free browser games. No downloads, no installs — just pure fun.
        </p>
      </motion.div>
    </div>
  </section>
);

export default Hero;
