import React, { useEffect, useRef } from 'react'
import StarryNight from './components/StarryNight'
import FireworkAnimation from './components/FireworkAnimation'
import './App.css'

function App() {
  const audioRef = useRef(null)

  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5
        try {
          await audioRef.current.play()
        } catch (err) {
          console.log('Play failed:', err)
        }
      }
    }

    const handleInteraction = () => {
      playAudio()
      // Remove listeners after first interaction
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }

    // Listen for user interactions
    window.addEventListener('click', handleInteraction, { once: true })
    window.addEventListener('touchstart', handleInteraction, { once: true })
    window.addEventListener('keydown', handleInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('keydown', handleInteraction)
    }
  }, [])

  return (
    <div className="app">
      {/* Starry Night Background */}
      <StarryNight />

      {/* Firework Animation */}
      <FireworkAnimation />

      {/* Background Music */}
      <audio ref={audioRef} src="/hbd.mp3" loop playsInline />

      {/* Glowing Candle in Center Bottom */}
      <div className="candle-holder">
        <div className="candle">
          <div className="blinking-glow"></div>
          <div className="thread"></div>
          <div className="glow"></div>
          <div className="flame"></div>
        </div>
      </div>
    </div>
  )
}

export default App
