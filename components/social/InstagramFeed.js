"use client";

import { useEffect, useState, useMemo } from "react";
import InstagramPost from "./InstagramPost";

export default function InstagramFeed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize posts to prevent unnecessary re-renders
  // Must be called before any conditional returns (Rules of Hooks)
  const memoizedPosts = useMemo(() => {
    return posts.map((post, index) => {
      const key = post.id || post.permalink || `fallback-${index}`;
      return { key, post };
    });
  }, [posts]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch("/api/instagram/posts");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!isMounted) return;

        if (data.success && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setError(data.error || "Failed to load posts");
        }
      } catch (err) {
        console.error("Error fetching Instagram posts:", err);
        if (!isMounted) return;
        setError("Failed to load Instagram posts. Please try again later.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    async function safeFetchPosts() {
      if (!isMounted) return;
      await fetchPosts();
    }

    safeFetchPosts();

    // Refresh posts every 5 minutes
    const interval = setInterval(() => safeFetchPosts(), 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Loading Instagram feed...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4">
        <div className="bg-card border border-border rounded-xl p-6 max-w-md">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            Instagram Feed Unavailable
          </h3>
          <p className="text-muted-foreground text-sm">{error}</p>
          <p className="text-muted-foreground text-xs mt-2">
            The Instagram API needs to be configured. Please check the API setup
            in the documentation.
          </p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground text-lg">
          No posts available at the moment.
        </p>
        <p className="text-muted-foreground/70 text-sm mt-2">
          Check back later for updates!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {memoizedPosts.map(({ key, post }) => (
          <InstagramPost key={key} post={post} />
        ))}
      </div>
    </div>
  );
}
