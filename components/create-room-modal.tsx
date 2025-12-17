"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Clock } from "lucide-react"

interface CreateRoomModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CreateRoomModal({ open, onOpenChange }: CreateRoomModalProps) {
  const router = useRouter()
  const [roomName, setRoomName] = useState("")
  const [duration, setDuration] = useState("25")
  const [description, setDescription] = useState("")

  const handleCreate = () => {
    // Generate a simple room ID for demo
    const roomId = Math.random().toString(36).substring(7)
    // Navigate to room
    router.push(`/room/${roomId}?name=${encodeURIComponent(roomName)}&duration=${duration}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Create Focus Room</DialogTitle>
          <DialogDescription className="text-white/60">Set up a new focus session for your team</DialogDescription>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="room-name" className="text-white">
              Room Name
            </Label>
            <Input
              id="room-name"
              placeholder="Deep Work Session"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-white flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Focus Duration (minutes)
            </Label>
            <Input
              id="duration"
              type="number"
              min="1"
              max="120"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-white">
              Description <span className="text-white/40">(optional)</span>
            </Label>
            <Textarea
              id="description"
              placeholder="What will you focus on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none"
              rows={3}
            />
          </div>

          <Button
            onClick={handleCreate}
            disabled={!roomName || !duration}
            className="w-full bg-white text-slate-900 hover:bg-white/90"
            size="lg"
          >
            Create Room
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
