import { useEffect, useRef } from 'react'

export default function StarryNight() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let stars = []
    let animationId = null
    const numStars = 220
    let shootingStar = null
    let lastShootingStarTime = 0
    const shootingStarInterval = 16000 // Show shooting star every 16 seconds

    // Set canvas size and initialize
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Generate stars with twinkling properties
      stars = []
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.5 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.01
        })
      }
    }

    // Create a new shooting star
    const createShootingStar = () => {
      const startY = Math.random() * (canvas.height * 0.4) + canvas.height * 0.3 // Middle to lower portion
      const speed = 2 + Math.random() * 2 // Speed between 4-6(slower)
      const length = 80 + Math.random() * 40 // Trail length
      
      shootingStar = {
        x: -50, // Start off-screen left
        y: startY,
        speed: speed,
        length: length,
        opacity: 0.1,
        angle: -(Math.random() * 0.3 + 0.1) // Negative angle for upward path
      }
    }
    
    // Initial setup
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Animation loop for twinkling stars
    let lastFrameTime = performance.now()
    
    const animate = (currentTime) => {
      // Clear canvas with dark background
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw and update stars (twinkling)
      stars.forEach(star => {
        // Twinkle effect
        star.opacity += star.twinkleSpeed
        if (star.opacity > 1 || star.opacity < 0.3) {
          star.twinkleSpeed = -star.twinkleSpeed
        }

        // Draw star
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`
        ctx.fill()
      })

      // Handle shooting star timing
      if (currentTime - lastShootingStarTime > shootingStarInterval) {
        if (!shootingStar) {
          createShootingStar()
          lastShootingStarTime = currentTime
        }
      }

      // Draw and update shooting star
      if (shootingStar) {
        // Update position (straight upward diagonal path)
        shootingStar.x += shootingStar.speed
        shootingStar.y += shootingStar.speed * Math.sin(shootingStar.angle)

        // Draw shooting star with trail
        const gradient = ctx.createLinearGradient(
          shootingStar.x - shootingStar.length * Math.cos(shootingStar.angle),
          shootingStar.y - shootingStar.length * Math.sin(shootingStar.angle),
          shootingStar.x,
          shootingStar.y
        )
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)')
        gradient.addColorStop(1, 'rgba(255, 255, 255, 1)')

        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(
          shootingStar.x - shootingStar.length * Math.cos(shootingStar.angle),
          shootingStar.y - shootingStar.length * Math.sin(shootingStar.angle)
        )
        ctx.lineTo(shootingStar.x, shootingStar.y)
        ctx.stroke()

        // Draw bright head
        ctx.beginPath()
        ctx.arc(shootingStar.x, shootingStar.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 1)'
        ctx.fill()

        // Remove shooting star when it goes off-screen
        if (shootingStar.x > canvas.width + 50 || shootingStar.y < -50) {
          shootingStar = null
        }
      }

      lastFrameTime = currentTime
      animationId = requestAnimationFrame(animate)
    }

    // Start animation
    animate(performance.now())

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        backgroundColor: '#000000',
        display: 'block'
      }}
    />
  )
}
