import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import PhotoGallery from './components/PhotoGallery'
import Wishes from './components/Wishes'
import MusicPlayer from './components/MusicPlayer'
import Balloons from './components/Balloons'
import FloatingHearts from './components/FloatingHearts'
import ConfettiEffect from './components/ConfettiEffect'
import LandingPage from './components/LandingPage'
import './App.css'

const BIRTHDAY = new Date('2026-07-29T00:00:00')

function App() {
  const [hasEntered, setHasEntered] = useState(false)

  useEffect(() => {
    document.title = 'Happy Birthday, Yogashri ✨'
  }, [])

  useEffect(() => {
    document.body.style.overflow = hasEntered ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [hasEntered])

  return (
    <>
      <MusicPlayer />


      <AnimatePresence mode="wait">
        {!hasEntered && (
          <LandingPage
            key="landing"
            targetDate={BIRTHDAY}
            onEnter={() => setHasEntered(true)}
          />

        )}
      </AnimatePresence>


      {hasEntered && (
        <motion.div
          className="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <FloatingHearts />
          <Balloons />
          <ConfettiEffect />

          <main>
            <Hero />
            <PhotoGallery />
            <Wishes />
          </main>

          <footer className="footer">
            <p>Made with love for Yogashri</p>
            <span className="footer-date"> 💕..Ragul..💕</span>
          </footer>
        </motion.div>
      )}
    </>
  )
}

export default App
