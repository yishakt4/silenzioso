"use client"

import { motion } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Participant {
  id: string
  name: string
  avatar: string
  isOnline: boolean
}

interface ParticipantsListProps {
  participants: Participant[]
}

export default function ParticipantsList({ participants }: ParticipantsListProps) {
  return (
    <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-between">
        <span>Participants</span>
        <span className="text-sm font-normal text-white/60">
          {participants.filter((p) => p.isOnline).length} online
        </span>
      </h3>

      <div className="space-y-3">
        {participants.map((participant, index) => (
          <motion.div
            key={participant.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
          >
            <div className="relative">
              <Avatar className="w-10 h-10 bg-white/10 border-2 border-white/20">
                <AvatarFallback className="text-2xl">{participant.avatar}</AvatarFallback>
              </Avatar>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-900 ${
                  participant.isOnline ? "bg-green-500" : "bg-gray-500"
                }`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{participant.name}</p>
              <p className="text-xs text-white/60">{participant.isOnline ? "Focusing" : "Away"}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
