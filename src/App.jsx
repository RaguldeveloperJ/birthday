import { useEffect } from 'react'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import PhotoGallery from './components/PhotoGallery'
import Wishes from './components/Wishes'
import MusicPlayer from './components/MusicPlayer'
import Balloons from './components/Balloons'
import FloatingHearts from './components/FloatingHearts'
import ConfettiEffect from './components/ConfettiEffect'
import './App.css'

const BIRTHDAY = new Date('2026-07-29T00:00:00')

function App() {
  useEffect(() => {
    document.title = 'Happy Birthday, Yogashri ✨'
  }, [])

  return (
    <div className="app">
      <FloatingHearts />
      <Balloons />
      <ConfettiEffect />
      <MusicPlayer />

      <main>
        <Hero />
        <Countdown targetDate={BIRTHDAY} />
        <PhotoGallery />
        <Wishes />
      </main>

      <footer className="footer">
        <p>Made with love for Yogashri</p>
        <span className="footer-date">July 29, 2026</span>
      </footer>
    </div>
  )
}

export default App
