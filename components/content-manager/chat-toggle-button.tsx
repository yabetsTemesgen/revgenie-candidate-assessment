"use client"

import { MessageSquare, ChevronRight, ChevronLeft } from "lucide-react"
import { useContentManagerChat } from "./chat-provider"
import { Button } from "@/components/ui/button"

export function ChatToggleButton() {
  const { toggleChat, isChatOpen } = useContentManagerChat()

  return (
    <Button
      onClick={toggleChat}
      variant="outline"
      size="icon"
      className={`fixed top-24 z-30 h-10 w-10 shadow-md bg-white transition-all duration-300 ease-in-out ${
        isChatOpen 
          ? "right-0 rounded-l-lg rounded-r-none border-r-0" 
          : "right-0 rounded-l-lg rounded-r-none border-l-0"
      }`}
      aria-label={isChatOpen ? "Chat schließen" : "Chat öffnen"}
    >
      {isChatOpen ? <ChevronRight className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
    </Button>
  )
}
