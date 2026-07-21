import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import Countdown from './Countdown'
// import MusicPlayer from './MusicPlayer'
const BIRTHDAY_NAME = 'Yogashri'
const PROFILE_INITIAL = BIRTHDAY_NAME.charAt(0)

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const floatingEmojis = ['🎂', '🎈', '🎉', '✨', '🎁', '💫', '🌸', '🥳']

const emojiFloats = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  emoji: floatingEmojis[i % floatingEmojis.length],
  left: `${4 + (i * 6.2) % 92}%`,
  size: 1.2 + (i % 4) * 0.35,
  delay: i * 0.4,
  duration: 6 + (i % 5),
}))

function burstConfetti() {
  const colors = ['#ff6b9d', '#c084fc', '#fbbf24', '#f472b6', '#ffffff']
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.65 },
    colors,
  })
}

function ProfileAvatar() {
  return (
    <div className="landing-avatar" role="img" aria-label={`${BIRTHDAY_NAME}'s profile`}>
      <svg className="landing-avatar-art" viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="avatar-sky" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d1b4e" />
            <stop offset="45%" stopColor="#4a1942" />
            <stop offset="100%" stopColor="#1a0a2e" />
          </linearGradient>
          <linearGradient id="avatar-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="50%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
          <radialGradient id="avatar-shine" cx="35%" cy="28%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
        <circle cx="60" cy="60" r="58" fill="url(#avatar-sky)" />
        <circle cx="60" cy="60" r="58" fill="url(#avatar-shine)" />
        <circle cx="24" cy="22" r="2.5" fill="#fde68a" opacity="0.9" />
        <circle cx="92" cy="34" r="1.8" fill="#fbbf24" opacity="0.75" />
        <circle cx="78" cy="16" r="1.4" fill="#fff" opacity="0.65" />
        <circle cx="38" cy="88" r="1.6" fill="#c084fc" opacity="0.8" />
        <path
          d="M60 18 L63 26 L71 26 L64.5 31 L67 39 L60 34 L53 39 L55.5 31 L49 26 L57 26 Z"
          fill="url(#avatar-glow)"
          opacity="0.95"
        />
        <circle cx="60" cy="62" r="34" fill="rgba(255,255,255,0.08)" stroke="rgba(253,230,138,0.35)" strokeWidth="1.5" />
      </svg>
      <span className="landing-avatar-initial" aria-hidden="true">
        {PROFILE_INITIAL}
      </span>
    </div>
  )
}

export default function LandingPage({ onEnter, targetDate }) {
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // const handleEnter = () => {
  //   if (exiting) return
  //   burstConfetti()
  //   setExiting(true)
  // }
  const handleEnter = async () => {
  if (exiting) return

  const audio = document.querySelector('audio')

  if (audio) {
    try {
      await audio.play()
    } catch (err) {
      console.log(err)
    }
  }

  burstConfetti()
  setExiting(true)
}

  return (
    <motion.div
      className="landing"
      variants={container}
      initial="hidden"
      animate={exiting ? 'exit' : 'visible'}
      onAnimationComplete={(definition) => {
        if (definition === 'exit') onEnter()
      }}
    >
      <div className="landing-glow" aria-hidden="true" />

      <div className="landing-floats" aria-hidden="true">
        {emojiFloats.map((float) => (
          <motion.span
            key={float.id}
            className="landing-float"
            style={{
              left: float.left,
              fontSize: `${float.size}rem`,
            }}
            initial={{ y: '110vh', opacity: 0, rotate: 0 }}
            animate={{
              y: '-15vh',
              opacity: [0, 0.85, 0.85, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: float.duration,
              repeat: Infinity,
              delay: float.delay,
              ease: 'linear',
            }}
          >
            {float.emoji}
          </motion.span>
        ))}
      </div>

      <motion.div className="landing-sparkles" aria-hidden="true">
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            className="landing-sparkle"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + (i % 3) * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            ✦
          </motion.span>
        ))}
      </motion.div>

      <motion.div className="landing-content">
        <motion.div className="landing-avatar-wrap" variants={item}>
          <div className="landing-avatar-ring" aria-hidden="true" />
          <ProfileAvatar />
        </motion.div>

        <motion.p className="landing-greeting" variants={item}>
          Happy Birthday
        </motion.p>

        <motion.p className="landing-pre" variants={item}>
          ✦ Today is all about you ✦
        </motion.p>

        <motion.h1 className="landing-name" variants={item}>
          {BIRTHDAY_NAME}
        </motion.h1>

        <motion.div className="landing-divider" variants={item} aria-hidden="true">
          <span className="divider-line" />
          <span className="divider-icon">♥</span>
          <span className="divider-line" />
        </motion.div>

        <motion.p className="landing-wish" variants={item}>
          Wishing you a day filled with laughter, love, and all the little
          joys that make your heart smile. 🎂✨
        </motion.p>

        <motion.div className="landing-emojis" variants={item} aria-hidden="true">
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            🎈
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: 0.3 }}
          >
            🎂
          </motion.span>
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
          >
            🎁
          </motion.span>
          <motion.span
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: 0.9 }}
          >
            ✨
          </motion.span>
        </motion.div>

        <motion.div variants={item}>
          <Countdown targetDate={targetDate} variant="landing" />
        </motion.div>

        <motion.button
          type="button"
          className="landing-btn"
          variants={item}
          onClick={handleEnter}
          disabled={exiting}
          whileHover={exiting ? undefined : { scale: 1.06 }}
          whileTap={exiting ? undefined : { scale: 0.96 }}
        >
          <span className="landing-btn-glow" aria-hidden="true" />
          Open the surprise
          <span className="landing-btn-icon">🎉</span>
        </motion.button>

        <motion.p className="landing-hint" variants={item}>
          Tap to unwrap your birthday celebration
        </motion.p>
      </motion.div>
      {/* <MusicPlayer /> */}
    </motion.div>
    
  )
}
