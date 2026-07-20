import { motion } from 'framer-motion'

const wishes = [
  {
    icon: '🌸',
    title: 'Radiant Soul',
    text: 'May your heart always glow with the same warmth and light you bring into every room you enter.',
  },
  {
    icon: '✨',
    title: 'Dreams Come True',
    text: 'May every wish you whisper to the stars find its way back to you, wrapped in joy and golden moments.',
  },
  {
    icon: '🦋',
    title: 'Beautiful Journey',
    text: 'May this new year of your life unfold like a garden in bloom — soft, vibrant, and endlessly enchanting.',
  },
  {
    icon: '💫',
    title: 'Endless Love',
    text: 'You deserve a love as deep as the ocean and as bright as the sunrise — today and every day after.',
  },
  {
    icon: '🌙',
    title: 'Peace & Serenity',
    text: 'May calm nights and gentle mornings surround you, and may you always find beauty in the quiet moments.',
  },
  {
    icon: '🎀',
    title: 'Pure Magic',
    text: 'The world is more magical because you exist, Yogashri. May your birthday be as extraordinary as you are.',
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Wishes() {
  return (
    <section className="wishes-section" id="wishes">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Heartfelt Wishes for You</h2>
        <p className="section-subtitle">
          Words from the heart, for the most beautiful soul
        </p>
      </motion.div>

      <div className="wishes-grid">
        {wishes.map((wish, i) => (
          <motion.article
            key={wish.title}
            className="wish-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
          >
            <span className="wish-icon">{wish.icon}</span>
            <h3>{wish.title}</h3>
            <p>{wish.text}</p>
          </motion.article>
        ))}
      </div>

      <motion.div
        className="final-message"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="final-quote">
          &ldquo;Happy Birthday, Yogashri — may your day be filled with laughter,
          love, and all the little joys that make life truly beautiful.&rdquo;
        </p>
        <span className="final-signature">With all my love ♥</span>
      </motion.div>
    </section>
  )
}
