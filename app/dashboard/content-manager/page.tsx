"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Edit,
  Calendar,
  ArrowRight,
  Users,
  BarChart3,
  PieChart,
  TrendingUp,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react"
import { ContentManagerProvider } from "@/contexts/content-manager-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Helper function to get date string
const getDateString = (date: Date) => {
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit" })
}

// Helper function to get day name
const getDayName = (date: Date) => {
  return date.toLocaleDateString("de-DE", { weekday: "short" })
}

export default function ContentManager() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [viewMode, setViewMode] = useState<"posts" | "calendar">("posts")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Generate dates for the current month
  const generateCalendarDates = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()

    const dates = []
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      dates.push(date)
    }
    return dates
  }

  const calendarDates = generateCalendarDates()

  // Generate mock data for content posts - 3 posts per week for 30 days starting from today
  const generateContentPosts = () => {
    const today = new Date();
    const contentTypes = ["blog", "social", "video"];
    const mockTitles = {
      blog: [
        "10 Tips for Better Content Strategy",
        "How to Measure Content Marketing ROI",
        "Content Strategy Best Practices",
        "Case Study: Success with RevGenie",
        "The Future of Content Marketing",
        "B2B Content Marketing Trends",
        "Creating a Content Calendar That Works",
        "Content Distribution Strategies"
      ],
      social: [
        "Industry Insights: AI in Marketing",
        "Meet the Team: Marketing Department",
        "Customer Spotlight: TechCorp",
        "Thought Leadership in Your Industry",
        "Top 5 Marketing Trends This Month",
        "Behind the Scenes at Our Company",
        "Client Success Story Highlights",
        "Industry News Roundup"
      ],
      video: [
        "Product Demo: New Features",
        "Expert Interview: Marketing Innovations",
        "How-To Tutorial: Content Strategy",
        "Customer Testimonial: RevGenie Benefits",
        "Webinar Recap: Content Marketing",
        "Team Spotlight: Meet Our Experts",
        "Product Feature Showcase",
        "Quick Tips for Better Marketing"
      ]
    };
    
    // Define post frequency - days of the week (1 = Monday, 5 = Friday)
    const postDays = [1, 3, 5]; // Monday, Wednesday, Friday
    
    const posts = {};
    const endDate = new Date();
    endDate.setDate(today.getDate() + 30); // 30 days from today
    
    let currentDate = new Date(today);
    let typeIndex = 0;
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday
      
      // Post on Monday, Wednesday, Friday (1, 3, 5)
      if (postDays.includes(dayOfWeek)) {
        const contentType = contentTypes[typeIndex % contentTypes.length];
        const titleArray = mockTitles[contentType];
        const randomTitleIndex = Math.floor(Math.random() * titleArray.length);
        
        const dateString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
        
        posts[dateString] = {
          type: contentType,
          status: "scheduled",
          title: titleArray[randomTitleIndex],
        };
        
        typeIndex++;
      }
      
      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return posts;
  };
  
  // Create mock content posts
  const contentPosts = generateContentPosts();

  // Get content type for a specific date
  const getContentForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
    return contentPosts[dateString];
  }

  // Get color based on content type
  const getContentTypeColor = (type: string) => {
    switch (type) {
      case "blog":
        return "bg-purple-500"
      case "social":
        return "bg-blue-500"
      case "video":
        return "bg-orange-500"
      default:
        return "bg-gray-300"
    }
  }

  // Get status badge color
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "drafted":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Generate upcoming content from contentPosts
  const getUpcomingContent = () => {
    const today = new Date();
    const result = [];
    let id = 1;
    
    // Convert contentPosts object to array and sort by date
    const postsArray = Object.entries(contentPosts)
      .map(([dateString, post]) => ({
        id,
        title: post.title,
        type: post.type,
        date: dateString,
        status: post.status,
        image: getImageForContentType(post.type),
      }));
      
    // Sort by date (ascending)
    postsArray.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    // Get only next 3 upcoming posts
    return postsArray
      .filter(post => new Date(post.date) >= today)
      .slice(0, 3)
      .map((post, index) => ({
        ...post,
        id: index + 1,
        date: new Date(post.date).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      }));
  };
  
  // Helper function to get image based on content type
  const getImageForContentType = (type: string) => {
    switch (type) {
      case "blog":
        return "/blog-post-concept.png";
      case "social":
        return "/social-media-post.png";
      case "video":
        return "/video-thumbnail.png";
      default:
        return "/content-placeholder.png";
    }
  };
  
  // Generate upcoming content
  const upcomingContent = getUpcomingContent();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Content Strategy</h1>
          <p className="text-muted-foreground">Powered by Content Genie</p>
        </div>
        <Card className="w-full md:w-auto">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium">Business Goal</p>
              <p className="text-xs text-muted-foreground">Increase demo signups by 20% in 30 days</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Setup Complete
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Overview Panel */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Strategy Overview</CardTitle>
            <CardDescription>Your 30-day content plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Content Cadence */}
            <div>
              <h3 className="text-sm font-medium mb-3">Content Cadence</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day, i) => (
                    <div
                      key={day}
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-medium ${
                        [1, 3, 5].includes(i) ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div className="text-sm font-medium">3 posts/week</div>
              </div>
            </div>

            {/* Topic Focus Areas */}
            <div>
              <h3 className="text-sm font-medium mb-3">Topic Focus Areas</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Industry Trends</span>
                    <span className="font-medium">40%</span>
                  </div>
                  <Progress value={40} className="h-2 bg-gray-100" indicatorClassName="bg-purple-500" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Product Education</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Customer Stories</span>
                    <span className="font-medium">30%</span>
                  </div>
                  <Progress value={30} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-sm font-medium mb-3">Strategy Timeline</h3>
              <div className="relative pt-2 pb-4">
                <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 z-0"></div>
                <div className="absolute top-5 left-0 w-[2%] h-1 bg-purple-500 z-10"></div>
                <div className="relative z-20 flex justify-between">
                  {(() => {
                    // Get current date for start
                    const startDate = new Date();
                    
                    // Calculate mid-point (today + 15 days)
                    const midDate = new Date();
                    midDate.setDate(midDate.getDate() + 15);
                    
                    // Calculate end-point (today + 30 days)
                    const endDate = new Date();
                    endDate.setDate(endDate.getDate() + 30);
                    
                    // Format dates as DD.MM
                    const formatDate = (date) => {
                      return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
                    };
                    
                    return (
                      <>
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                          <span className="text-xs mt-1">Start</span>
                          <span className="text-xs text-gray-500">{formatDate(startDate)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          <span className="text-xs mt-1">Mid-point</span>
                          <span className="text-xs text-gray-500">{formatDate(midDate)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                          <span className="text-xs mt-1">End</span>
                          <span className="text-xs text-gray-500">{formatDate(endDate)}</span>
                        </div>
                      </>
                    );
                  })()} 
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Review Ready Content
                <Badge className="ml-2 bg-purple-200 text-purple-800 hover:bg-purple-200">5</Badge>
              </Button>
              <Button variant="outline" className="justify-start">
                <Edit className="h-4 w-4 mr-2" />
                Edit Strategy
              </Button>
              <Button variant="outline" className="justify-start">
                <Zap className="h-4 w-4 mr-2" />
                Generate More Content
              </Button>
              <Button variant="outline" className="justify-start">
                <Users className="h-4 w-4 mr-2" />
                Invite Team Members
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center">
                <Zap className="h-4 w-4 text-purple-500 mr-2" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">
                Topics selected based on your audience's engagement patterns and current market trends. Your content
                strategy focuses on educational content with a mix of thought leadership to position your brand as an
                industry expert.
              </p>
              <div className="mt-3 text-xs text-purple-700 font-medium flex items-center">
                <Button variant="link" className="p-0 h-auto text-xs text-purple-700">
                  View detailed analysis
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Panel */}
          
        </div>
      </div>

      {/* Content Manager Section */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="flex-1">
            <CardTitle>Content Manager</CardTitle>
            <CardDescription>Plan and schedule your content</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex space-x-1 border rounded-md p-1 bg-muted/50">
              <Button
                variant={viewMode === "posts" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("posts")}
                className="flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Posts
              </Button>
              <Button
                variant={viewMode === "calendar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Calendar View
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "posts" ? (
            <div className="space-y-4">
              {/* Posts View */}
              {Object.entries(contentPosts).map(([dateKey, post]) => (
                <div key={dateKey} className="mb-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Scheduled for {dateKey.replace(/^\d{4}-\d{2}-/, "").padStart(2, "0")} May 2023</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusBadgeColor(post.status)}>{post.status}</Badge>
                        <Badge variant="outline" className="capitalize">{post.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Content for {post.title}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Calendar View */}
              <div className="flex justify-between items-center mb-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <h3 className="text-lg font-medium">
                  {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium bg-white dark:bg-gray-950">
                    {day}
                  </div>
                ))}
                
                {calendarDates.map((date, i) => {
                  const content = getContentForDate(date);
                  const today = new Date();
                  const isToday = date.getDate() === today.getDate() && 
                               date.getMonth() === today.getMonth() && 
                               date.getFullYear() === today.getFullYear();
                  
                  return (
                    <div
                      key={i}
                      className={`min-h-[100px] p-2 bg-white dark:bg-gray-950 ${isToday ? "ring-2 ring-primary ring-inset" : ""}`}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className="text-right">{date.getDate()}</div>
                      {content && (
                        <div className="mt-2">
                          <div 
                            className={`text-xs p-1 mb-1 rounded truncate ${getStatusBadgeColor(content.status)}`}
                          >
                            {content.title}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Selected Date Posts */}
              {selectedDate && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Posts on {selectedDate.toLocaleDateString("en-US", { 
                      month: "long", 
                      day: "numeric", 
                      year: "numeric" 
                    })}
                  </h2>
                  {(() => {
                    const content = getContentForDate(selectedDate);
                    if (!content) {
                      return <p className="text-muted-foreground">No posts scheduled for this date.</p>;
                    }
                    
                    return (
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{content.title}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>Scheduled for {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getStatusBadgeColor(content.status)}>{content.status}</Badge>
                            <Badge variant="outline" className="capitalize">{content.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Content for {content.title}</p>
                        </CardContent>
                      </Card>
                    );
                  })()}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Preview</CardTitle>
          <CardDescription>Projected impact of your content strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Expected Reach</p>
                    <p className="text-2xl font-bold">12,500+</p>
                    <p className="text-xs text-muted-foreground">Potential audience per month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Estimated Engagement</p>
                    <p className="text-2xl font-bold">8.2%</p>
                    <p className="text-xs text-muted-foreground">Average engagement rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <PieChart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Projected Conversion</p>
                    <p className="text-2xl font-bold">3.5%</p>
                    <p className="text-xs text-muted-foreground">Conversion rate to demos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground flex items-center justify-center">
            <Clock className="h-4 w-4 mr-2" />
            Metrics will be populated as your content is published
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
