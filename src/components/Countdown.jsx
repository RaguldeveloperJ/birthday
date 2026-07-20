import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function getTimeRemaining(targetDate) {
  const total = targetDate.getTime() - Date.now()

  if (total <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / 1000 / 60) % 60),
    seconds: Math.floor((total / 1000) % 60),
    isPast: false,
  }
}

function TimeBlock({ value, label }) {
  return (
    <motion.div
      className="time-block"
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <span className="time-value">{String(value).padStart(2, '0')}</span>
      <span className="time-label">{label}</span>
    </motion.div>
  )
}

export default function Countdown({ targetDate }) {
  const [time, setTime] = useState(() => getTimeRemaining(targetDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTimeRemaining(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section className="countdown-section" id="countdown">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Counting Down to Your Day</h2>
        <p className="section-subtitle">
          {time.isPast
            ? 'Your special day has arrived! 🎉'
            : 'Every second brings us closer to celebrating you'}
        </p>
      </motion.div>

      <motion.div
        className="countdown-grid"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <TimeBlock value={time.days} label="Days" />
        <span className="countdown-separator">:</span>
        <TimeBlock value={time.hours} label="Hours" />
        <span className="countdown-separator">:</span>
        <TimeBlock value={time.minutes} label="Minutes" />
        <span className="countdown-separator">:</span>
        <TimeBlock value={time.seconds} label="Seconds" />
      </motion.div>

      <motion.p
        className="countdown-date"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        July 29, 2026 — A day written in the stars
      </motion.p>
    </section>
  )
}
