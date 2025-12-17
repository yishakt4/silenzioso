"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Share2, Home } from "lucide-react"
import { useRouter } from "next/navigation"

interface Participant {
  id: string
  name: string
  avatar: string
}

interface SessionCompleteProps {
  roomName: string
  participants: Participant[]
}

export default function SessionComplete({ roomName, participants }: SessionCompleteProps) {
  const router = useRouter()
  const [highlight, setHighlight] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    // In production, save to backend
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      {/* Glassmorphic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 1 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Completion Card */}
        <div className="p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-center">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-6"
          >
            <Sparkles className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Session Complete!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/60 mb-8"
          >
            Great work on {roomName}
          </motion.p>

          {/* Participants */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-2 mb-8"
          >
            <div className="flex -space-x-3">
              {participants.slice(0, 4).map((participant, index) => (
                <Avatar
                  key={participant.id}
                  className="w-12 h-12 border-2 border-slate-900 bg-white/10"
                  style={{ zIndex: participants.length - index }}
                >
                  <AvatarFallback className="text-xl">{participant.avatar}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <span className="text-white/60 ml-2">
              {participants.length} {participants.length === 1 ? "person" : "people"} focused together
            </span>
          </motion.div>

          {/* Highlight Input */}
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-4 mb-8"
            >
              <p className="text-white text-sm">Share what you accomplished:</p>
              <Textarea
                placeholder="Completed API documentation, fixed 3 bugs..."
                value={highlight}
                onChange={(e) => setHighlight(e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none"
                rows={3}
              />
              <Button
                onClick={handleSubmit}
                disabled={!highlight.trim()}
                className="w-full bg-white text-slate-900 hover:bg-white/90"
                size="lg"
              >
                Share Highlight
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-white/5 border border-white/20 mb-8"
            >
              <p className="text-white/80 text-sm italic">"{highlight}"</p>
              <p className="text-white/60 text-xs mt-2">- You</p>
            </motion.div>
          )}

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              variant="outline"
              className="flex-1 bg-white/5 border-white/20 text-white hover:bg-white/10"
              size="lg"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Results
            </Button>
            <Button
              onClick={() => router.push("/")}
              className="flex-1 bg-white text-slate-900 hover:bg-white/90"
              size="lg"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
