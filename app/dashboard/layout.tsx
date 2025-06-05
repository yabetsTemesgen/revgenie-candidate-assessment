import type React from "react";
import type { Metadata } from "next";
import {
  Sidebar,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { DashboardSidebarContent } from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata: Metadata = {
  title: "RevGeni - Dashboard",
  description: "Manage your AI-powered growth team",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <div className="flex w-full h-screen bg-gray-100">
          {/* Sidebar */}
          <Sidebar className="border-r border-gray-200 bg-white">
            <SidebarHeader className="p-4">
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 bg-[#5a17d6] rounded-full flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-l-2 border-white rounded-full animate-spin"></div>
                </div>
                <h1 className="text-xl font-bold">
                  <span className="text-[#5a17d6]">REV</span>
                  <span className="text-gray-500">GENI</span>
                </h1>
              </div>
            </SidebarHeader>

            {/* Use client-side component for sidebar content */}
            <DashboardSidebarContent />
          </Sidebar>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <DashboardHeader />

            {/* Content */}
            <main className="flex-1 overflow-auto p-6">{children}</main>
          </div>
        </div>
      </SidebarProvider>
    </AuthProvider>
  );
}
