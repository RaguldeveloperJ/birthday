import { motion } from 'framer-motion'

const hearts = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 8) % 90}%`,
  size: 10 + (i % 4) * 4,
  delay: i * 0.5,
  duration: 8 + (i % 5),
}))

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.span
          key={heart.id}
          className="floating-heart"
          style={{
            left: heart.left,
            fontSize: heart.size,
          }}
          initial={{ y: '100vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: 'linear',
          }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  )
}
