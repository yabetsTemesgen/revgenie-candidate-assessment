"use client"

import type React from "react"

export function ABMGenieLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full transition-all duration-300 ease-in-out overflow-auto"
      >
        {children}
      </div>
    </div>
  )
}
