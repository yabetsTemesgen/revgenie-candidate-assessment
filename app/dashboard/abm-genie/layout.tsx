"use client";

import { ABMGenieLayout } from "@/components/abm-genie/layout";
import type React from "react"

export default function ABMGenieRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ABMGenieLayout>{children}</ABMGenieLayout>
  )
}
