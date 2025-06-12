"use client"

import { useEffect, useRef } from "react"

export default function BackgroundEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Bubble properties
    const bubbles: Bubble[] = []
    const bubbleCount = window.innerWidth < 768 ? 8 : 15 // Fewer bubbles on mobile

    interface Bubble {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
      hue: number
      drift: number
    }

    // Create bubbles
    for (let i = 0; i < bubbleCount; i++) {
      bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (window.innerWidth < 768 ? 60 : 100) + 30, // Smaller on mobile
        speed: Math.random() * 0.15 + 0.05, // Slower movement
        opacity: Math.random() * 0.06 + 0.01, // More subtle
        hue: Math.random() * 20 + 340, // Pink hues
        drift: Math.random() * 0.5 - 0.25, // Horizontal drift
      })
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw bubbles
      bubbles.forEach((bubble) => {
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(bubble.x, bubble.y, 0, bubble.x, bubble.y, bubble.radius)
        gradient.addColorStop(0, `hsla(${bubble.hue}, 100%, 80%, ${bubble.opacity})`)
        gradient.addColorStop(1, `hsla(${bubble.hue}, 100%, 80%, 0)`)
        ctx.fillStyle = gradient
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fill()

        // Move bubbles
        bubble.y -= bubble.speed
        bubble.x += bubble.drift

        // Reset bubbles when they go off screen
        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius
          bubble.x = Math.random() * canvas.width
        }
        if (bubble.x < -bubble.radius || bubble.x > canvas.width + bubble.radius) {
          bubble.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  )
}
