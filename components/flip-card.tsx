"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Users, Target, Award, Star, Zap } from "lucide-react"

interface Achievement {
  title: string
  description: string
  icon: React.ReactNode
  color: string
}

interface Responsibility {
  title: string
  description: string
  icon: React.ReactNode
}

interface FlipCardProps {
  achievement: Achievement
  responsibility: Responsibility
  index: number
}

export function FlipCard({ achievement, responsibility, index }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className="relative w-full h-80 cursor-pointer perspective-1000"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div
            className="w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group"
            style={{
              background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}10)`,
              border: `1px solid ${achievement.color}30`,
            }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: achievement.color }}
            />
            <div
              className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: achievement.color }}
            />

            <motion.div
              className="text-4xl mb-4"
              style={{ color: achievement.color }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {achievement.icon}
            </motion.div>

            <h3 className="text-xl font-bold text-foreground mb-3">{achievement.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{achievement.description}</p>

            <motion.div
              className="absolute bottom-4 right-4 text-xs text-muted-foreground/60 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>Click to flip</span>
              <motion.div
                animate={{ rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Zap className="w-3 h-3" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center 
              border border-primary/30 relative overflow-hidden group"
          style={{
            background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}10)`,
            border: `1px solid ${achievement.color}30`,
          }}
          >
            <div
              className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: achievement.color }}
            />
            <div
              className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ backgroundColor: achievement.color }}
            />

            <motion.div
              className="text-4xl mb-4 text-primary"
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
              style={{ color: achievement.color }}
            >
              {responsibility.icon}
            </motion.div>

            <h3 className="text-xl font-bold text-foreground mb-3">{responsibility.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{responsibility.description}</p>

            <motion.div
              className="absolute bottom-4 left-4 text-xs text-muted-foreground/60 flex items-center gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>Click to flip back</span>
              <motion.div
                animate={{ rotate: [360, 180, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Zap className="w-3 h-3" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const leadershipData = [
  {
    
    achievement: {
      title: "TSA Chapter President (2x)",
      description:
        "Led 120+ member chapter to 2nd in state, managed $20,000+ budget, and delivered keynote speech to 2,500+ attendees",
      icon: <Users />,
      color: "#ffd700",
    },
    responsibility: {
      title: "National TSA Web Development Champion",
      description:
        "4th and 6th place at TSA Nationals for Web Development (2023 & 2024), plus 1st place in Texas State competition",
      icon: <Trophy />,
      color: "#ffd700",
    }
  },
  {
    achievement: {
      title: "CS Honor Society President & Co-Founder",
      description:
        "Co-founded organization with 200+ chapters nationwide and oversaw countless Seven Lakes High School UIL competitions hosting 800-900 participants and 20 Academic Events",
      icon: <Award />,
      color: "#ff6b35",
    },
    responsibility: {
      title: "Computer Science Club Leader",
      description:
        "Configured and set up PC^2 for a locally hosted Computer Science contest, volunteering 100+ hours. Hosted weekly Computer Science presentations to 60+ students teaching full-stack development and introducing web development",
      icon: <Target />,
      color: "#ff6b35",
    },
  },
  {
    responsibility: {
      title: "Robotics Programmer & Electrical Department Member",
      description:
        "Programmed autonomous commands, movement, and other subsystems/commands qualifying for world competition.",
      icon: <Star />,
      color: "#4ade80",
    },
    achievement: {
      title: "Robotics Community Education Director",
      description:
        "Developed scouting app tracking 500+ matches, raised $5,000+",
      icon: <Zap />,
      color: "#4ade80",
    },
  },
  {
    responsibility: {
      title: "Academic Excellence",
      description:
        "AP Scholar with Distinction, PSAT National Hispanic Recognition, perfect 5s in AP Computer Science A, Calculus BC, Statistics, and many more",
      icon: <Star />,
      color: "#8b5cf6",
    },
    achievement: {
      title: "Multi-Organization Founder",
      description:
        "Founded first two middle school TSA chapters in district with 100+ members, secured district approval and funding",
      icon: <Users />,
      color: "#8b5cf6",
    },
  },
]

export function LeadershipSection() {
  return (
    <section id="leadership" className="min-h-screen bg-muted/10 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent mb-6">
            Leadership & Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover my competitive achievements and leadership responsibilities. Click each card to flip between
            the roles and accomplishments that shaped my journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {leadershipData.map((item, index) => (
            <FlipCard key={index} achievement={item.achievement} responsibility={item.responsibility} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-primary" />
            </motion.div>
            <span>Interactive cards - click to explore both sides</span>
            <motion.div
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-primary" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
