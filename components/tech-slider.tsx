"use client"

import { motion } from "framer-motion"

const technologies = [
  { name: "React", icon: "⚛️", color: "#61dafb" },
  { name: "Next.js", icon: "▲", color: "#000000" },
  { name: "TypeScript", icon: "TS", color: "#3178c6" },
  { name: "Node.js", icon: "🟢", color: "#339933" },
  { name: "Python", icon: "🐍", color: "#3776ab" },
  { name: "Three.js", icon: "🎮", color: "#000000" },
  { name: "Framer Motion", icon: "🎭", color: "#0055ff" },
  { name: "Tailwind CSS", icon: "🎨", color: "#06b6d4" },
  { name: "MongoDB", icon: "🍃", color: "#47a248" },
  { name: "PostgreSQL", icon: "🐘", color: "#336791" },
  { name: "Docker", icon: "🐳", color: "#2496ed" },
  { name: "AWS", icon: "☁️", color: "#ff9900" },
]

export function TechSlider() {
  return (
    <div className="w-screen overflow-hidden bg-muted/20 py-12 -mx-4 md:-mx-8">
      <div className="px-4 ">
        <motion.h3
          className="text-2xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Favorite Technologies & Tools
        </motion.h3>

        <div className="relative overflow-hidden -mx-8 py-3">
          <motion.div
            className="flex gap-8 items-center"
            animate={{ x: [0, -220 * technologies.length] }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{ width: `${220 * technologies.length * 2}px` }}
          >
            {[...technologies, ...technologies, ...technologies].map((tech, index) => (
              <motion.div
                key={`${tech.name}-${index}`}
                className="flex-shrink-0 w-48 h-24 bg-card border border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
                whileHover={{ scale: 1.05, y: -5 }}
                style={{
                  boxShadow: `0 4px 20px ${tech.color}20`,
                }}
              >
                <div className="text-2xl">{tech.icon}</div>
                <span className="font-medium text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
