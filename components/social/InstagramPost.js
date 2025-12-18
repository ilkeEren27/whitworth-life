import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { memo } from "react";

function InstagramPost({ post }) {
  const {
    id,
    media_url,
    media_type,
    caption,
    permalink,
    timestamp,
    username,
    accountDisplayName,
    accountProfileImage,
    like_count,
    comments_count,
  } = post;

  let postDate;
  try {
    postDate = timestamp ? new Date(timestamp) : new Date();
    if (isNaN(postDate.getTime())) {
      postDate = new Date();
    }
  } catch (e) {
    postDate = new Date();
  }
  const timeAgo = formatDistanceToNow(postDate, { addSuffix: true });

  return (
    <article className="bg-card text-card-foreground rounded-xl border border-border shadow-sm mb-6 max-w-lg mx-auto">
      {/* Post Header */}
      <header className="flex items-center gap-3 p-4 border-b border-border">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
          {accountProfileImage ? (
            <Image
              src={accountProfileImage}
              alt={accountDisplayName || username}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-muted-foreground font-semibold text-sm">
              {(accountDisplayName || username || "IG")[0].toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <Link
            href={permalink || `https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-card-foreground hover:underline truncate block"
          >
            {accountDisplayName || username}
          </Link>
        </div>
      </header>

      {/* Post Media */}
      <div className="relative w-full aspect-square bg-muted">
        {media_url && (
          <Image
            src={media_url}
            alt={caption || "Instagram post"}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 500px"
          />
        )}
        {media_type === "VIDEO" && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
            VIDEO
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-4 text-sm">
          <button className="flex items-center gap-1 hover:opacity-70 text-card-foreground">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {like_count ? (
              <span className="font-semibold">
                {like_count.toLocaleString()}
              </span>
            ) : null}
          </button>
          <Link
            href={permalink || `https://instagram.com/p/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:opacity-70 text-card-foreground"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {comments_count ? (
              <span className="font-semibold">
                {comments_count.toLocaleString()}
              </span>
            ) : null}
          </Link>
        </div>

        {/* Caption */}
        {caption && (
          <div className="text-sm">
            <Link
              href={permalink || `https://instagram.com/p/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-card-foreground hover:underline mr-2"
            >
              {accountDisplayName || username}
            </Link>
            <span className="text-card-foreground/90">{caption}</span>
          </div>
        )}

        {/* Timestamp */}
        <time className="text-xs text-muted-foreground block">{timeAgo}</time>
      </div>
    </article>
  );
}

export default memo(InstagramPost);
