import { INSTAGRAM_ACCOUNTS } from "@/lib/instagramAccounts";

// Instagram API configuration
// To set up Instagram Graph API:
// 1. Create a Facebook App at https://developers.facebook.com
// 2. Add Instagram Basic Display or Instagram Graph API product
// 3. Get a User Access Token or Page Access Token
// 4. For each Instagram account, get their Instagram Business Account ID
// 5. Add INSTAGRAM_ACCESS_TOKEN to your .env file
// 6. Optionally, map usernames to user IDs in INSTAGRAM_ACCOUNTS

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_APP_ID = process.env.INSTAGRAM_APP_ID;

/**
 * Fetch account info including profile picture from Instagram Graph API
 */
async function fetchAccountInfo(userId) {
  try {
    const url = `https://graph.instagram.com/${userId}?fields=username,profile_picture_url&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      return null;
    }

    const data = await response.json();

    if (data.error) {
      console.error(`Error fetching account info:`, data.error);
      return null;
    }

    return {
      username: data.username,
      profilePictureUrl: data.profile_picture_url,
    };
  } catch (error) {
    console.error(`Error fetching account info:`, error);
    return null;
  }
}

/**
 * Fetch posts from Instagram using the Graph API
 * Requires: Instagram Business Account ID and valid access token
 */
async function fetchInstagramPosts(account) {
  const { username, userId } = account;

  // If no access token, return empty posts
  if (!INSTAGRAM_ACCESS_TOKEN) {
    return {
      username,
      posts: [],
      profilePictureUrl: null,
      error: "Instagram access token not configured",
    };
  }

  // If userId is provided, use it directly; otherwise we'd need to look it up
  // For now, we'll use a placeholder approach
  if (!userId) {
    // In a real implementation, you'd need to:
    // 1. Look up the Instagram Business Account ID by username
    // 2. Or store the user IDs in the INSTAGRAM_ACCOUNTS config
    return {
      username,
      posts: [],
      profilePictureUrl: null,
      error: `Instagram user ID not found for ${username}. Please add userId to account config.`,
    };
  }

  try {
    // Fetch account info to get profile picture
    const accountInfo = await fetchAccountInfo(userId);

    // Instagram Graph API endpoint for posts
    const fields = [
      "id",
      "caption",
      "media_type",
      "media_url",
      "permalink",
      "thumbnail_url",
      "timestamp",
      "username",
      "like_count",
      "comments_count",
    ].join(",");

    const url = `https://graph.instagram.com/${userId}/media?fields=${fields}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      return {
        username,
        posts: [],
        profilePictureUrl: accountInfo?.profilePictureUrl || null,
        error: `HTTP ${response.status}: ${errorText.substring(0, 50)}`,
      };
    }

    const data = await response.json();

    if (data.error) {
      console.error(`Instagram API error for ${username}:`, data.error);
      return {
        username,
        posts: [],
        profilePictureUrl: accountInfo?.profilePictureUrl || null,
        error: data.error.message || "Instagram API error",
      };
    }

    const posts = data.data || [];
    return {
      username,
      posts,
      profilePictureUrl: accountInfo?.profilePictureUrl || null,
    };
  } catch (error) {
    console.error(`Error fetching Instagram posts for ${username}:`, error);
    return {
      username,
      posts: [],
      profilePictureUrl: null,
      error: error.message || "Failed to fetch posts",
    };
  }
}

/**
 * Fetch posts from all configured Instagram accounts
 */
async function fetchAllPosts() {
  const allPosts = [];

  for (const account of INSTAGRAM_ACCOUNTS) {
    try {
      const data = await fetchInstagramPosts(account);

      if (data.posts && data.posts.length > 0) {
        // Add account info to each post, prioritizing API-fetched profile picture
        const postsWithAccount = data.posts.map((post) => ({
          ...post,
          accountUsername: account.username,
          accountDisplayName: account.displayName,
          accountProfileImage: data.profilePictureUrl || account.profileImage,
          username: account.username, // Ensure username is set
        }));

        allPosts.push(...postsWithAccount);
      }
    } catch (error) {
      console.error(`Error fetching posts for ${account.username}:`, error);
    }
  }

  // Sort by timestamp (latest first)
  allPosts.sort((a, b) => {
    const timeA = new Date(a.timestamp || a.created_time || 0).getTime();
    const timeB = new Date(b.timestamp || b.created_time || 0).getTime();
    return timeB - timeA;
  });

  return allPosts;
}

export async function GET() {
  try {
    const posts = await fetchAllPosts();

    return Response.json({
      success: true,
      posts,
      count: posts.length,
    });
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch Instagram posts",
        posts: [],
      },
      { status: 500 }
    );
  }
}
