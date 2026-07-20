import { motion } from 'framer-motion'

const colors = ['#ff6b9d', '#c084fc', '#fbbf24', '#f472b6', '#a78bfa', '#fcd34d']
const positions = [8, 18, 32, 52, 68, 82, 92]

export default function Balloons() {
  return (
    <div className="balloons" aria-hidden="true">
      {positions.map((left, i) => (
        <motion.div
          key={i}
          className="balloon"
          style={{
            left: `${left}%`,
            '--balloon-color': colors[i % colors.length],
            '--sway-delay': `${i * 0.7}s`,
            '--float-duration': `${6 + (i % 3)}s`,
          }}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ y: '-20vh', opacity: 0.85 }}
          transition={{
            duration: 8 + i,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
            delay: i * 1.2,
          }}
        >
          <div className="balloon-body" />
          <div className="balloon-string" />
        </motion.div>
      ))}
    </div>
  )
}
