import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-glow" aria-hidden="true" />

      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-pre" variants={item}>
          ✦ A special celebration for ✦
        </motion.p>

        <motion.h1 className="hero-name" variants={item}>
          Yogashri
        </motion.h1>

        <motion.div className="hero-divider" variants={item} aria-hidden="true">
          <span className="divider-line" />
          <span className="divider-icon">♥</span>
          <span className="divider-line" />
        </motion.div>

        <motion.p className="hero-message" variants={item}>
          On this magical day, the world becomes a little brighter —
          because you were born to fill it with grace, warmth, and endless beauty.
        </motion.p>

        <motion.div className="hero-badge" variants={item}>
          <span className="badge-icon">🎂</span>
          <span>July 29, 2026</span>
        </motion.div>

     
      </motion.div>
    </section>
  )
}
