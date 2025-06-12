"use client"

import { useEffect, useState } from "react"
import { Award, Heart, Clock } from "lucide-react"
import { motion } from "framer-motion"

const stats = [
  { icon: <Award className="h-8 w-8" />, number: 15, suffix: "+", label: "Years Experience", color: "pink" },
  { icon: <Heart className="h-8 w-8" />, number: 5000, suffix: "+", label: "Successful Deliveries", color: "rose" },
  { icon: <Clock className="h-8 w-8" />, number: 24, suffix: "/7", label: "Emergency Care", color: "fuchsia" },
]

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="stats-section" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-rose-50"></div>
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-6 py-3 bg-white/70 backdrop-blur-md text-pink-500 rounded-full text-sm mb-4 animate-pulse font-medium shadow-md border border-pink-100">
            Our Impact
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-poppins">Trusted by Thousands</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Our commitment to excellence has made us a trusted healthcare partner for women across the region
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`text-center group transform transition-all duration-500 hover:scale-105`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/70 backdrop-blur-md text-${stat.color}-500 mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 border border-${stat.color}-100`}
              >
                {stat.icon}
              </motion.div>
              <div className={`text-4xl font-bold text-gray-800 mb-2 font-poppins`}>
                {isVisible ? <CountUp end={stat.number} /> : 0}
                {stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
