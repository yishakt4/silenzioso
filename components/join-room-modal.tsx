"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Hash } from "lucide-react"

interface JoinRoomModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function JoinRoomModal({ open, onOpenChange }: JoinRoomModalProps) {
  const router = useRouter()
  const [roomCode, setRoomCode] = useState("")

  const handleJoin = () => {
    if (roomCode) {
      router.push(`/room/${roomCode}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-900/95 backdrop-blur-xl border-white/10">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">Join Focus Room</DialogTitle>
          <DialogDescription className="text-white/60">
            Enter the room code to join an existing session
          </DialogDescription>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="room-code" className="text-white flex items-center gap-2">
              <Hash className="w-4 h-4" />
              Room Code
            </Label>
            <Input
              id="room-code"
              placeholder="abc123"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder:text-white/40 font-mono text-lg"
            />
          </div>

          <Button
            onClick={handleJoin}
            disabled={!roomCode}
            className="w-full bg-white text-slate-900 hover:bg-white/90"
            size="lg"
          >
            Join Room
          </Button>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
