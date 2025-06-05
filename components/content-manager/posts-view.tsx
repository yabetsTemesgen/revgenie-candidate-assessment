"use client";

import { useContentManager } from "@/contexts/content-manager-context";
import { PostCard } from "./post-card";

export function PostsView() {
  const { posts } = useContentManager();
  
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts available.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
