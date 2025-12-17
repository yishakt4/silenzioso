"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

interface FocusTimerProps {
  duration: number // in minutes
  isActive: boolean
  onToggle: () => void
  onComplete: () => void
}

export default function FocusTimer({ duration, isActive, onToggle, onComplete }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60) // convert to seconds
  const [isPaused, setIsPaused] = useState(true)

  useEffect(() => {
    setTimeLeft(duration * 60)
  }, [duration])

  useEffect(() => {
    if (!isActive || isPaused) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onComplete()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, isPaused, onComplete])

  const handleToggle = () => {
    setIsPaused(!isPaused)
    if (!isActive) {
      onToggle()
    }
  }

  const handleReset = () => {
    setTimeLeft(duration * 60)
    setIsPaused(true)
  }

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const progress = ((duration * 60 - timeLeft) / (duration * 60)) * 100

  return (
    <div className="relative">
      {/* Timer Card */}
      <motion.div
        className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        {/* Progress Ring */}
        <div className="relative mx-auto w-72 h-72 md:w-96 md:h-96 mb-8">
          <svg className="w-full h-full -rotate-90">
            <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 0.45 * 100}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 0.45 * 100 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 0.45 * 100 * (1 - progress / 100) }}
              transition={{ duration: 0.5 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>

          {/* Time Display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${minutes}-${seconds}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-7xl md:text-8xl font-bold text-white tracking-tight font-mono"
                >
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </motion.div>
              </AnimatePresence>
              <p className="text-white/60 text-lg mt-2">{isPaused ? "Ready to focus" : "Focusing now"}</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={handleReset}
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            size="lg"
            onClick={handleToggle}
            className="px-12 py-6 text-lg bg-white text-slate-900 hover:bg-white/90 shadow-xl shadow-blue-500/25"
          >
            {isPaused ? (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start Focus
              </>
            ) : (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
