"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentManager } from "@/contexts/content-manager-context";

export function ContentCalendar() {
  const { getPostsForDate, setSelectedDate } = useContentManager();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Helper functions for date handling
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format month and year for display
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      days.push(date);
    }
    
    return days;
  };

  // Check if a date has posts
  const hasPostsOnDate = (date: Date | null) => {
    if (!date) return false;
    return getPostsForDate(date).length > 0;
  };

  // Handle date selection
  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
  };

  // Get the current day's date
  const today = new Date();
  const isToday = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const days = generateCalendarDays();
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">{formatMonthYear(currentMonth)}</h2>
        <Button variant="outline" size="icon" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-px bg-gray-200 dark:bg-gray-800">
        {weekdays.map((day) => (
          <div key={day} className="p-2 text-center text-sm font-medium bg-white dark:bg-gray-950">
            {day}
          </div>
        ))}
        
        {days.map((date, i) => (
          <div
            key={i}
            className={`min-h-[100px] p-2 bg-white dark:bg-gray-950 ${
              !date ? "text-gray-400" : ""
            } ${isToday(date) ? "ring-2 ring-primary ring-inset" : ""}`}
            onClick={() => handleDateClick(date)}
          >
            {date && (
              <>
                <div className="text-right">{date.getDate()}</div>
                {hasPostsOnDate(date) && (
                  <div className="mt-2">
                    {getPostsForDate(date).map((post) => (
                      <div 
                        key={post.id} 
                        className="text-xs p-1 mb-1 rounded bg-blue-100 dark:bg-blue-900 truncate"
                      >
                        {post.scheduledFor?.toLocaleTimeString("en-US", { 
                          hour: "numeric", 
                          minute: "2-digit",
                          hour12: true 
                        })}: {post.title}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
