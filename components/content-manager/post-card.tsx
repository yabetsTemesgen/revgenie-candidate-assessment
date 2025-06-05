"use client";

import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContentPost } from "@/contexts/content-manager-context";

interface PostCardProps {
  post: ContentPost;
}

export function PostCard({ post }: PostCardProps) {
  // Format the date for display
  const formatScheduledDate = (date?: Date) => {
    if (!date) return "";
    return `${date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    })} at ${date.toLocaleTimeString("en-US", { 
      hour: "numeric", 
      minute: "2-digit",
      hour12: true 
    })}`;
  };

  // Format content with tags
  const formatContent = (content: string) => {
    // Split content by lines
    const lines = content.split("\n");
    return lines.map((line, index) => {
      // Check if line is a hashtag
      if (line.startsWith("#")) {
        return <Badge key={index} variant="secondary" className="mr-1 mt-1">{line}</Badge>;
      }
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{post.title}</CardTitle>
        {post.scheduledFor && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            <span>Scheduled for {formatScheduledDate(post.scheduledFor)}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert">
          {formatContent(post.content)}
        </div>
      </CardContent>
    </Card>
  );
}
