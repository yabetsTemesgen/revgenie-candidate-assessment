"use client";

import { ViewSwitcher } from "./view-switcher";
import { PostsView } from "./posts-view";
import { ContentCalendar } from "./content-calendar";
import { DatePosts } from "./date-posts";
import { useContentManager } from "@/contexts/content-manager-context";

export function ContentManager() {
  const { selectedView } = useContentManager();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Content Manager</h1>
        <ViewSwitcher />
      </div>

      {selectedView === "posts" ? (
        <PostsView />
      ) : (
        <div className="space-y-6">
          <ContentCalendar />
          <DatePosts />
        </div>
      )}
    </div>
  );
}
