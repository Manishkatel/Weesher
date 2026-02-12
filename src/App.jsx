import React, { useEffect, useRef } from 'react'
import { Analytics } from "@vercel/analytics/next"
import StarryNight from './components/StarryNight'
import FireworkAnimation from './components/FireworkAnimation'
import './App.css'

function App() {
  const audioRef = useRef(null)

  useEffect(() => {
    let hasPlayed = false

    const playAudio = () => {
      if (audioRef.current && !hasPlayed) {
        hasPlayed = true

        // Solved audio loading issue
        
        // Ensure audio is loaded
        if (audioRef.current.readyState >= 2) {
          audioRef.current.volume = 1.0
          const playPromise = audioRef.current.play()
          
          if (playPromise !== undefined) {                      
            playPromise
              .then(() => {
                // Audio started playing
              })
              .catch((err) => {
                console.log('Play failed:', err)
                hasPlayed = false
              })
          }
        } else {
          // Wait for audio to load
          audioRef.current.addEventListener('canplaythrough', () => {
            if (audioRef.current && !hasPlayed) {
              audioRef.current.volume = 1.0
              audioRef.current.play().catch((err) => {
                console.log('Play failed after load:', err)
                hasPlayed = false
              })
            }
          }, { once: true })
          audioRef.current.load()
        }
      }
    }

    // Handle click (works on both desktop and mobile)
    const handleClick = (e) => {
      playAudio()
    }

    // Handle touch (mobile specific)
    const handleTouch = (e) => {
      playAudio()
    }

    // Add listeners to the entire app container
    const appElement = document.querySelector('.app')
    
    if (appElement) {
      appElement.addEventListener('click', handleClick, { once: true })
      appElement.addEventListener('touchend', handleTouch, { once: true })
    }

    // Also listen on window as fallback
    window.addEventListener('click', handleClick, { once: true })
    window.addEventListener('touchend', handleTouch, { once: true })

    return () => {
      if (appElement) {
        appElement.removeEventListener('click', handleClick)
        appElement.removeEventListener('touchend', handleTouch)
      }
      window.removeEventListener('click', handleClick)
      window.removeEventListener('touchend', handleTouch)
    }
  }, [])

  return (
    <div className="app">
     
      {/* Starry Night Background */}
      <StarryNight />

      {/* Firework Animation */}
      <FireworkAnimation />

     <Analytics />

      {/* Background Music */}
      <audio 
        ref={audioRef} 
        src="/hbd.mp3" 
        loop 
        playsInline 
        preload="auto"
        crossOrigin="anonymous"
      />

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
