import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'

export default function ConfettiEffect() {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const duration = 4000
    const end = Date.now() + duration

    const colors = ['#ff6b9d', '#c084fc', '#fbbf24', '#f472b6', '#ffffff']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    const timeout = setTimeout(frame, 800)
    return () => clearTimeout(timeout)
  }, [])

  return null
}
