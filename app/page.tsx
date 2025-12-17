"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Clock, Users, Sparkles } from "lucide-react"
import CreateRoomModal from "@/components/create-room-modal"
import JoinRoomModal from "@/components/join-room-modal"

export default function HomePage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Glassmorphic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Logo and branding */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-sm font-medium text-white/80">Team Focus Rooms</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight text-balance">
            Focus Together,
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Achieve More
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed text-pretty">
            Create distraction-free focus sessions with your team. Work silently together, track progress, and celebrate
            achievements.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Button
            size="lg"
            onClick={() => setShowCreateModal(true)}
            className="text-lg px-8 py-6 bg-white text-slate-900 hover:bg-white/90 shadow-xl shadow-blue-500/25"
          >
            <Clock className="w-5 h-5 mr-2" />
            Create Focus Room
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={() => setShowJoinModal(true)}
            className="text-lg px-8 py-6 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
          >
            <Users className="w-5 h-5 mr-2" />
            Join Existing Room
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
        >
          {[
            {
              icon: Clock,
              title: "Timed Sessions",
              description: "Customizable Pomodoro-style focus periods",
            },
            {
              icon: Users,
              title: "Team Presence",
              description: "See who's focusing with you in real-time",
            },
            {
              icon: Sparkles,
              title: "Shared Highlights",
              description: "Celebrate progress with post-session updates",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
            >
              <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modals */}
      <CreateRoomModal open={showCreateModal} onOpenChange={setShowCreateModal} />
      <JoinRoomModal open={showJoinModal} onOpenChange={setShowJoinModal} />
    </div>
  )
}
