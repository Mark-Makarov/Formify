import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  ignoredRoutes: ["/forms", "/builder", "/submit"],
  authorizedParties: ["http://localhost:3000", "http://localhost:3458", "https://formify.astroflare.online"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
