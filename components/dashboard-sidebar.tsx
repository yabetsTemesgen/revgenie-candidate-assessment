"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Grid, Settings, MessageSquare, Users, Brain } from "lucide-react";
import { LogoutButton } from "@/components/auth/logout-button";

export function DashboardSidebarContent() {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs font-semibold text-gray-500 px-4 py-2 ">
          YOUR MANAGER GENIES
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 ${pathname === "/dashboard" ? "bg-transparent hover:bg-gray-100" : ""}`}
              >
                <Link href="/dashboard" className="flex items-center gap-3">
                  <Grid className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 ${
                  pathname === "/dashboard/content-manager" ||
                  pathname === "/dashboard/content-manager/onboarding"
                    ? "bg-purple-50 text-purple-600 hover:bg-purple-50"
                    : "bg-transparent hover:bg-gray-100"
                }`}
              >
                <Link
                  href="/dashboard/content-manager/onboarding"
                  className="flex items-center gap-3"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      pathname === "/dashboard/content-manager" ||
                      pathname === "/dashboard/content-manager/onboarding"
                        ? "text-purple-600"
                        : "text-gray-700"
                    }
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className={
                      pathname === "/dashboard/content-manager" ||
                      pathname === "/dashboard/content-manager/onboarding"
                        ? "text-purple-600"
                        : "text-gray-700"
                    }
                  >
                    Content Manager Geni
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 ${
                  pathname === "/dashboard/abm-genie" ||
                  pathname === "/dashboard/abm-genie/onboarding"
                    ? "bg-purple-50 text-purple-600 hover:bg-purple-50"
                    : "bg-transparent hover:bg-gray-100"
                }`}
              >
                <Link
                  href="/dashboard/abm-genie/onboarding"
                  className="flex items-center gap-3"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                      pathname === "/dashboard/abm-genie" ||
                      pathname === "/dashboard/abm-genie/onboarding"
                        ? "text-purple-600"
                        : "text-gray-700"
                    }
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className={
                      pathname === "/dashboard/abm-genie" ||
                      pathname === "/dashboard/abm-genie/onboarding"
                        ? "text-purple-600"
                        : "text-gray-700"
                    }
                  >
                    ABM Geni
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <div className="flex items-center gap-3 px-3 py-2 text-gray-400">
                <Users className="h-5 w-5" />
                <span>Sales Geni</span>
                <span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                  Soon
                </span>
              </div>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <div className="flex items-center gap-3 px-3 py-2 text-gray-400">
                <MessageSquare className="h-5 w-5" />
                <span>
                  Customer
                  <br />
                  Success Geni
                </span>
                <span className="ml-auto text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">
                  Soon
                </span>
              </div>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 ${pathname === "/dashboard/ai-brain" ? "bg-purple-50 text-purple-600 hover:bg-purple-50" : "bg-transparent hover:bg-gray-100"}`}
              >
                <Link
                  href="/dashboard/ai-brain"
                  className="flex items-center gap-3"
                >
                  <Brain className={`h-5 w-5 ${
                      pathname === "/dashboard/ai-brain"
                        ? "text-purple-600"
                        : "text-gray-500"
                    }`} />

                  <span
                    className={
                      pathname === "/dashboard/ai-brain"
                        ? "text-purple-600"
                        : "text-gray-700"
                    }
                  >
                    AI Brain
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className={`flex items-center gap-3 ${pathname === "/dashboard/settings" ? "bg-transparent hover:bg-gray-100" : ""}`}
              >
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3"
                >
                  <Settings className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Logout Section */}
      <SidebarGroup className="mt-auto">
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                className="flex items-center gap-3 hover:bg-red-50"
              >
                <LogoutButton
                  variant="ghost"
                  showIcon
                  showText
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
