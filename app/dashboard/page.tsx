"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpRight,
  Users,
  BarChart3,
  Target,
  TrendingUp,
  MessageSquare,
  Plus,
  HeartHandshake,
  Info,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock activity data - in a real app this would come from an API
type ActivityType =
  | "post"
  | "follow-up"
  | "analysis"
  | "engagement"
  | "research";

interface Activity {
  id: string;
  geniName: string;
  action: string;
  timestamp: string;
  activityType: ActivityType;
  details?: string;
}

// Helper function to get color based on activity type
const getActivityColor = (type: ActivityType): string => {
  switch (type) {
    case "post":
      return "bg-green-500";
    case "follow-up":
      return "bg-blue-500";
    case "analysis":
      return "bg-purple-500";
    case "engagement":
      return "bg-yellow-500";
    case "research":
      return "bg-indigo-500";
    default:
      return "bg-gray-500";
  }
};

export default function Dashboard() {
  // In a real application, this would be fetched from an API
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayMode, setDisplayMode] = useState<
    "normal" | "empty" | "loading"
  >("normal");

  // Simulate fetching data from an API
  useEffect(() => {
    const fetchActivities = async () => {
      // Always start with loading state
      setIsLoading(true);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Mock data - all from Content Manager Geni with chronological workflow order
      // {
      //   id: '1',
      //   geniName: 'Content Manager Geni',
      //   action: 'created content strategy',
      //   timestamp: '1 hour ago',
      //   activityType: 'research',
      // },
      // {
      //   id: '2',
      //   geniName: 'Content Manager Geni',
      //   action: 'created drafts',
      //   timestamp: '3 hours ago',
      //   activityType: 'post',
      // },
      const mockActivities: Activity[] = [
        {
          id: "3",
          geniName: "Content Manager Geni",
          action: "created drafts",
          timestamp: "Yesterday",
          activityType: "post",
        },
        {
          id: "4",
          geniName: "Content Manager Geni",
          action: "identified trending topics",
          timestamp: "2 days ago",
          activityType: "research",
        },
        {
          id: "5",
          geniName: "Content Manager Geni",
          action: "created content strategy",
          timestamp: "4 days ago",
          activityType: "research",
        },
      ];

      // Handle different display modes
      if (displayMode === "empty") {
        setActivities([]);
      } else if (displayMode === "normal") {
        setActivities(mockActivities);
      } else {
        // For 'loading' mode, we'll just keep the loading state
        setActivities([]);
      }

      // Only turn off loading for non-loading modes
      if (displayMode !== "loading") {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [displayMode]);

  // Get the most recent 3 activities to display
  const recentActivities = activities.slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to RevGeni
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered growth team is ready to help you achieve your business
          goals.
        </p>
      </div>

      {/* Objectives Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Objectives</h2>
          <Link href="#" className="text-sm text-blue-500 hover:text-blue-700">
            Manage Objectives
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,245</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500 font-medium">12%</span> from
                last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500 font-medium">3.2%</span> from
                last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,780</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
                <span className="text-green-500 font-medium">18%</span> from
                last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Goals Progress
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/4</div>
              <p className="text-xs text-muted-foreground">
                75% of goals on track
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Genies Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Your Genies</h2>
          <Link href="#" className="text-sm text-blue-500 hover:text-blue-700">
            Manage Genies
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Content Manager Geni */}
          <Link href="/dashboard/content-manager">
            <Card className="cursor-pointer hover:shadow-md transition-shadow h-full">
              <CardContent className="flex flex-col h-full pt-6">
                <div className="mb-2 text-[#5a17d6]">
                  {/* <MessageSquare className="h-5 w-5" /> */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-purple-600"
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
                </div>
                <h3 className="font-medium mb-1">Content Manager Geni</h3>
                <p className="text-xs text-muted-foreground">
                  LinkedIn content creation and scheduling
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* Sales Geni - Coming Soon */}
          <Card className="border-dashed h-full">
            <CardContent className="flex flex-col h-full pt-6">
              <div className="mb-2 text-muted-foreground">
                <Users className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">Sales Geni</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  Soon
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Automated outreach and follow-ups
              </p>
            </CardContent>
          </Card>

          {/* Customer Success Geni - Coming Soon */}
          <Card className="border-dashed h-full">
            <CardContent className="flex flex-col h-full pt-6">
              <div className="mb-2 text-muted-foreground">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium">Customer Success Geni</h3>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  Soon
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Proactive support and engagement
              </p>
            </CardContent>
          </Card>

          {/* Add New Geni Card */}
          <Card className="flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow border-dashed h-full">
            <CardContent className="flex flex-col items-center justify-center h-full py-6 w-full">
              <div className="text-[#5a17d6] flex items-center justify-center mb-2">
                <Plus className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium">Add New Geni</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Recent Activity</h2>
          {activities.length > 3 && (
            <Link
              href="#"
              className="text-sm text-blue-500 hover:text-blue-700"
            >
              See all activities
            </Link>
          )}
        </div>

        <Card className="bg-white shadow-sm border">
          <CardContent className="pt-6 pb-6">
            {isLoading ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="animate-spin h-8 w-8 border-4 border-[#5a17d6] border-opacity-25 rounded-full border-t-transparent mb-4"></div>
                <p className="text-sm text-muted-foreground">
                  Loading activities...
                </p>
              </div>
            ) : activities.length === 0 ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <Info className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">
                  No activities yet
                </h3>
                <p className="text-sm text-muted-foreground">
                  Your Genies haven't performed any actions yet
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1.5">
                      <div
                        className={`h-3 w-3 rounded-full ${getActivityColor(activity.activityType)}`}
                      ></div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {activity.geniName} {activity.action}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
