"use client"

import { use, useState } from "react"
import { useSearchParams } from "next/navigation"
import FocusTimer from "@/components/focus-timer"
import ParticipantsList from "@/components/participants-list"
import ProgressBar from "@/components/progress-bar"
import SessionComplete from "@/components/session-complete"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Share2, LogOut } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>
}

export default function RoomPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const searchParams = useSearchParams()
  const [isSessionActive, setIsSessionActive] = useState(false)
  const [isSessionComplete, setIsSessionComplete] = useState(false)
  const [roomCode] = useState(resolvedParams.id)
  const [roomName] = useState(searchParams.get("name") || "Focus Room")
  const [duration] = useState(Number.parseInt(searchParams.get("duration") || "25"))

  // Mock participants for demo
  const [participants] = useState([
    { id: "1", name: "You", avatar: "🧑", isOnline: true },
    { id: "2", name: "Alex", avatar: "👨", isOnline: true },
    { id: "3", name: "Sarah", avatar: "👩", isOnline: true },
    { id: "4", name: "Mike", avatar: "👨‍💼", isOnline: false },
  ])

  const handleSessionComplete = () => {
    setIsSessionActive(false)
    setIsSessionComplete(true)
  }

  const shareRoom = () => {
    navigator.clipboard.writeText(roomCode)
    // In production, show toast notification
  }

  if (isSessionComplete) {
    return <SessionComplete roomName={roomName} participants={participants} />
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Glassmorphic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 border-b border-white/10 bg-slate-900/50 backdrop-blur-lg"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">{roomName}</h1>
            <p className="text-sm text-white/60">Room: {roomCode}</p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={shareRoom}
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
              <LogOut className="w-4 h-4 mr-2" />
              Leave
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8">
          {/* Timer Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <FocusTimer
              duration={duration}
              isActive={isSessionActive}
              onToggle={() => setIsSessionActive(!isSessionActive)}
              onComplete={handleSessionComplete}
            />

            <ProgressBar progress={isSessionActive ? 45 : 0} />
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <ParticipantsList participants={participants} />
          </motion.aside>
        </div>
      </div>
    </div>
  )
}
