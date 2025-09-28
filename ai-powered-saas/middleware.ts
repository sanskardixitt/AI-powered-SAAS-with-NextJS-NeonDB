import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/home",
]);

const isPublicApiRoute = createRouteMatcher(["/api/videos(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  const { userId } = session;
  const currentUrl = new URL(req.url);
  const pathname = currentUrl.pathname;
  const isApiRequest = pathname.startsWith("/api/");
  if (
    userId &&
    (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up"))
  ) {
    console.log("Redirecting authenticated user to /home");
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if (isApiRequest) {
    if (isPublicApiRoute(req)) {
      return NextResponse.next();
    }

    if (!userId) {
      console.log("Unauthenticated API request - returning 401 JSON");
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    return NextResponse.next();
  }

  if (!userId && !isPublicRoute(req)) {
    console.log("Redirecting unauthenticated page request to /sign-in");
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
