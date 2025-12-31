import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Create next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Add all *public* routes here (no auth required)
// Note: Include locale prefix patterns
const isPublicRoute = createRouteMatcher([
  "/:locale/map(.*)",
  "/:locale/events(.*)", // Allow all events routes including editor
  "/:locale/campus-guide(.*)", // Campus guide pages
  "/:locale/social(.*)", // Social/Instagram feed pages
  "/:locale/log-in(.*)",
  "/:locale/sign-up(.*)",
  "/:locale/forgot-password(.*)",
  "/:locale/reset-password(.*)",
  "/:locale/verify-email(.*)",
  "/api/webhooks/clerk", // <-- allow Clerk webhook
  "/api/webhooks/(.*)", // <-- (optional) any other webhooks you add
  "/:locale",
  "/",
]);

export default clerkMiddleware(async (auth, req) => {
  // Run next-intl middleware first for locale handling
  const intlResponse = intlMiddleware(req);
  
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
  
  return intlResponse;
});

export const config = {
  matcher: [
    // Run middleware for everything except static files and _next
    "/((?!_next|sign-in|sign-up|forgot-password|reset-password|verify-email|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
