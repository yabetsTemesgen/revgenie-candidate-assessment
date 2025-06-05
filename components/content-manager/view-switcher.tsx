"use client";

import { FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContentManager } from "@/contexts/content-manager-context";

export function ViewSwitcher() {
  const { selectedView, setSelectedView } = useContentManager();

  return (
    <div className="flex space-x-1 border rounded-md p-1 bg-muted/50">
      <Button
        variant={selectedView === "posts" ? "default" : "ghost"}
        size="sm"
        onClick={() => setSelectedView("posts")}
        className="flex items-center"
      >
        <FileText className="h-4 w-4 mr-2" />
        Posts
      </Button>
      <Button
        variant={selectedView === "calendar" ? "default" : "ghost"}
        size="sm"
        onClick={() => setSelectedView("calendar")}
        className="flex items-center"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Calendar View
      </Button>
    </div>
  );
}
