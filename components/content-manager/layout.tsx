"use client"

import type React from "react"

import { useContentManagerChat } from "./chat-provider"
import { ChatSidebar } from "./chat-sidebar"
import { ChatToggleButton } from "./chat-toggle-button"

export function ContentManagerLayout({ children }: { children: React.ReactNode }) {
  const { isChatOpen } = useContentManagerChat();

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full transition-all duration-300 ease-in-out overflow-auto"
        style={{
          marginRight: isChatOpen ? "320px" : "0",
        }}
      >
        {children}
      </div>
      <ChatToggleButton />
      <ChatSidebar />
    </div>
  )
}
