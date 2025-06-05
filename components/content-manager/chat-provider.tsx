"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type ContentManagerChatContextType = {
  isChatOpen: boolean
  toggleChat: () => void
  closeChat: () => void
  openChat: () => void
}

const ContentManagerChatContext = createContext<ContentManagerChatContextType | undefined>(undefined)

export function ContentManagerChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false)

  const toggleChat = () => setIsChatOpen((prev) => !prev)
  const closeChat = () => setIsChatOpen(false)
  const openChat = () => setIsChatOpen(true)

  return (
    <ContentManagerChatContext.Provider value={{ isChatOpen, toggleChat, closeChat, openChat }}>
      {children}
    </ContentManagerChatContext.Provider>
  )
}

export function useContentManagerChat() {
  const context = useContext(ContentManagerChatContext)
  if (context === undefined) {
    throw new Error("useContentManagerChat must be used within a ContentManagerChatProvider")
  }
  return context
}
