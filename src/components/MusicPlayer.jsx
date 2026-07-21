import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { musicTrack } from '../data/music'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = musicTrack.volume
    audio.loop = true

    const onEnded = () => setIsPlaying(false)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    setShowHint(false)

    try {
      if (isPlaying) {
        audio.pause()
      } else {
        await audio.play()
        setHasStarted(true)
      }
    } catch {
      setIsPlaying(false)
    }
  }, [isPlaying])
  

  return (
    <>
      <audio ref={audioRef}  src={musicTrack.src} preload="metadata" autoplay loop/>

      <div className="music-player">
        <AnimatePresence>
          {showHint && !hasStarted && (
            <motion.div
              className="music-hint"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              Tap for birthday music 🎵
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          className={`music-btn${isPlaying ? ' music-btn--playing' : ''}`}
          onClick={togglePlay}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          title={`${isPlaying ? 'Pause' : 'Play'} — ${musicTrack.title}`}
        >
          <span className="music-btn-ring" aria-hidden="true" />
          <span className="music-btn-icon" aria-hidden="true">
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l10.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14z" />
              </svg>
            )}
          </span>
        </motion.button>
      </div>
    </>
  )
}
