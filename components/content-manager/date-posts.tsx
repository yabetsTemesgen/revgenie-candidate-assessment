"use client";

import { useContentManager } from "@/contexts/content-manager-context";
import { PostCard } from "./post-card";

export function DatePosts() {
  const { selectedDate, getPostsForDate } = useContentManager();
  
  if (!selectedDate) {
    return null;
  }
  
  const postsForDate = getPostsForDate(selectedDate);
  
  if (postsForDate.length === 0) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Posts on {selectedDate.toLocaleDateString("en-US", { 
            month: "long", 
            day: "numeric", 
            year: "numeric" 
          })}
        </h2>
        <p className="text-muted-foreground">No posts scheduled for this date.</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Posts on {selectedDate.toLocaleDateString("en-US", { 
          month: "long", 
          day: "numeric", 
          year: "numeric" 
        })}
      </h2>
      <div>
        {postsForDate.map((post) => (
          <div key={post.id} className="mb-4">
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
