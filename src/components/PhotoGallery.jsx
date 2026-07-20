import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import photos from '../data/photos'

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.92,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (direction) => ({
    x: direction > 0 ? -320 : 320,
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
}

const captionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.25, duration: 0.5 },
  },
}

export default function PhotoGallery() {
  const [[currentIndex, direction], setSlide] = useState([0, 0])
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback(
    (newIndex) => {
      if (newIndex === currentIndex) return
      const dir = newIndex > currentIndex ? 1 : -1
      setSlide([newIndex, dir])
    },
    [currentIndex]
  )

  const next = useCallback(() => {
    goTo((currentIndex + 1) % photos.length)
  }, [currentIndex, goTo])

  const prev = useCallback(() => {
    goTo((currentIndex - 1 + photos.length) % photos.length)
  }, [currentIndex, goTo])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const currentPhoto = photos[currentIndex]

  return (
    <section className="gallery-section" id="gallery">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2>Memories & Moments</h2>
        <p className="section-subtitle">
          A little gallery of love, just for you, Yogashri
        </p>
      </motion.div>

      <motion.div
        className="gallery-carousel"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <button
          type="button"
          className="gallery-nav gallery-nav--prev"
          onClick={prev}
          aria-label="Previous photo"
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div className="gallery-viewport">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={currentPhoto.id}
              className="gallery-slide"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <div className="gallery-image-wrap">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  className="gallery-image"
                  loading="lazy"
                  draggable={false}
                />
                <div className="gallery-image-overlay" />
              </div>
              <motion.figcaption
                className="gallery-caption"
                variants={captionVariants}
                initial="hidden"
                animate="visible"
                key={`caption-${currentPhoto.id}`}
              >
                {currentPhoto.caption}
              </motion.figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="gallery-nav gallery-nav--next"
          onClick={next}
          aria-label="Next photo"
        >
          <span aria-hidden="true">›</span>
        </button>
      </motion.div>

      <div className="gallery-dots">
        {photos.map((photo, i) => (
          <button
            key={photo.id}
            type="button"
            className={`gallery-dot${i === currentIndex ? ' gallery-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === currentIndex ? 'true' : undefined}
          />
        ))}
      </div>

      <div className="gallery-thumbnails">
        {photos.map((photo, i) => (
          <motion.button
            key={photo.id}
            type="button"
            className={`gallery-thumb${i === currentIndex ? ' gallery-thumb--active' : ''}`}
            onClick={() => goTo(i)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`View ${photo.alt}`}
          >
            <img src={photo.src} alt="" loading="lazy" draggable={false} />
          </motion.button>
        ))}
      </div>
    </section>
  )
}
