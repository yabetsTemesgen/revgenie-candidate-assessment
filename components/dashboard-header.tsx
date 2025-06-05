"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, ChevronDown } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme"
import { LogoutButton } from "@/components/auth/logout-button"
import { useAuth } from "@/contexts/auth-context"

export function DashboardHeader() {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()
  const { user, isLoading } = useAuth()

  // Determine the page title based on the current path
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard"
    if (pathname === "/dashboard/content-manager") return "Content Manager"
    if (pathname === "/dashboard/content-manager/onboarding") return "Content Manager Onboarding"
    if (pathname === "/dashboard/settings") return "Settings"
    if (pathname === "/dashboard/profile") return "Profile"
    return "Dashboard"
  }

  // Get user display information
  const getUserDisplayInfo = () => {
    if (!user) return { name: "User", email: "", initials: "U" }
    
    const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
    const email = user.email || ''
    const initials = displayName
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U'
    
    return { name: displayName, email, initials }
  }

  const userInfo = getUserDisplayInfo()

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center px-6 justify-between">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4 text-gray-500 hover:text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <ThemeToggle variant="dropdown" />
        
        {/* Notification Bell */}
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-full hover:bg-gray-100 focus:outline-none">
              <Bell className="h-5 w-5 text-gray-500" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4 font-medium">Notifications</div>
            <DropdownMenuSeparator />
            <div className="py-6 text-center text-sm text-gray-500">No new notifications</div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile */}
        <DropdownMenu open={showUserMenu} onOpenChange={setShowUserMenu}>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-3 rounded-full hover:bg-gray-100 py-1 pl-1 pr-2 focus:outline-none" disabled={isLoading}>
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                {userInfo.initials}
              </div>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">{userInfo.name}</span>
                <span className="text-gray-500 text-xs">{userInfo.email}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <Link href="/dashboard/profile" className="flex w-full">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard/settings" className="flex w-full">
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <LogoutButton asMenuItem showIcon showText className="w-full" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
