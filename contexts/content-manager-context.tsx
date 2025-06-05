"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define types for our content posts
export type ContentStatus = "scheduled" | "published" | "draft";

export interface ContentPost {
  id: string;
  title: string;
  content: string;
  scheduledFor?: Date;
  status: ContentStatus;
  tags?: string[];
}

// Define the context state
interface ContentManagerContextState {
  posts: ContentPost[];
  selectedView: "posts" | "calendar";
  selectedDate: Date | null;
  setSelectedView: (view: "posts" | "calendar") => void;
  setSelectedDate: (date: Date | null) => void;
  addPost: (post: ContentPost) => void;
  updatePost: (id: string, post: Partial<ContentPost>) => void;
  deletePost: (id: string) => void;
  getPostsForDate: (date: Date) => ContentPost[];
}

// Create the context
const ContentManagerContext = createContext<ContentManagerContextState | undefined>(undefined);

// Mock data for initial posts
const mockPosts: ContentPost[] = [
  {
    id: "1",
    title: "asdfasdf",
    content: "asdfasdf\n\n#asdfasdf",
    scheduledFor: new Date(2025, 4, 12, 11, 20), // May 12, 2025 at 11:20 AM
    status: "scheduled",
    tags: ["asdfasdf"]
  }
];

export const ContentManagerProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<ContentPost[]>(mockPosts);
  const [selectedView, setSelectedView] = useState<"posts" | "calendar">("posts");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const addPost = (post: ContentPost) => {
    setPosts((prevPosts) => [...prevPosts, post]);
  };

  const updatePost = (id: string, updatedPost: Partial<ContentPost>) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    );
  };

  const deletePost = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const getPostsForDate = (date: Date) => {
    return posts.filter((post) => {
      if (!post.scheduledFor) return false;
      
      const postDate = new Date(post.scheduledFor);
      return (
        postDate.getDate() === date.getDate() &&
        postDate.getMonth() === date.getMonth() &&
        postDate.getFullYear() === date.getFullYear()
      );
    });
  };

  return (
    <ContentManagerContext.Provider
      value={{
        posts,
        selectedView,
        selectedDate,
        setSelectedView,
        setSelectedDate,
        addPost,
        updatePost,
        deletePost,
        getPostsForDate,
      }}
    >
      {children}
    </ContentManagerContext.Provider>
  );
};

// Custom hook to use the content manager context
export const useContentManager = () => {
  const context = useContext(ContentManagerContext);
  if (context === undefined) {
    throw new Error("useContentManager must be used within a ContentManagerProvider");
  }
  return context;
};
