"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { ThreeScene } from "./three-scene"



export function ThreeSceneLoader() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isReady, setIsReady] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const mountedRef = useRef(false)

  useEffect(() => {
    if (mountedRef.current) return
    mountedRef.current = true

    intervalRef.current = setInterval(() => {
      setLoadingProgress((prev) => {
        const increment = Math.random() * 12 + 3 
        const next = Math.min(prev + increment, 100)
        
        if (next >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
         
          setTimeout(() => setIsReady(true), 300)
        }
        return next
      })
    }, 180)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  const LoadingFallback = useCallback(() => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-muted/20 border border-border/50 rounded-2xl">
      <motion.div
        className="flex flex-col items-center space-y-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-primary" />
        </motion.div>

        <div className="text-center space-y-3">
          <h3 className="text-xl font-semibold text-foreground">Loading Interactive Universe</h3>
          <p className="text-sm text-muted-foreground">Preparing your 3D project experience...</p>
        </div>

        <div className="w-64 bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-orange-400"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="text-xs text-muted-foreground">{Math.round(loadingProgress)}% loaded</div>
      </motion.div>
    </div>
  ), [loadingProgress])

  if (!isReady) {
    return <LoadingFallback />
  }

  return (
    <motion.div 
      className="w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ThreeScene />
    </motion.div>
  )
}