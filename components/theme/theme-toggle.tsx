"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ThemeToggleProps = {
  variant?: "icon" | "dropdown" | "button"
  className?: string
}

export function ThemeToggle({ 
  variant = "dropdown", 
  className = "" 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  // Icon-only variant (just a button with icon that cycles through themes)
  if (variant === "icon") {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (theme === "light") setTheme("dark")
          else if (theme === "dark") setTheme("system")
          else setTheme("light")
        }}
        className={className}
        aria-label="Theme wechseln"
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </Button>
    )
  }

  // Button variant (text + icon)
  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (theme === "light") setTheme("dark")
          else if (theme === "dark") setTheme("system")
          else setTheme("light")
        }}
        className={`flex items-center gap-2 ${className}`}
      >
        {theme === "light" ? (
          <>
            <Sun className="h-4 w-4" />
            <span>Light</span>
          </>
        ) : theme === "dark" ? (
          <>
            <Moon className="h-4 w-4" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <Monitor className="h-4 w-4" />
            <span>System</span>
          </>
        )}
      </Button>
    )
  }

  // Default: dropdown variant
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className={className} aria-label="Theme wählen">
          {theme === "light" ? (
            <Sun className="h-5 w-5" />
          ) : theme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Monitor className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}