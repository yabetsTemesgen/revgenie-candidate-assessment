"use client";

import type React from "react"
import { ContentManagerChatProvider } from "@/components/content-manager/chat-provider"
import { ContentManagerLayout } from "@/components/content-manager/layout"

export default function ContentManagerRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ContentManagerChatProvider>
      <ContentManagerLayout>{children}</ContentManagerLayout>
    </ContentManagerChatProvider>
  )
}
