import ROUTES from "./constants/routes.js";

// @ts-check
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverActions: { allowedOrigins: ["formify.astroflare.online", "localhost:3458"], },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: ROUTES.signIn,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: ROUTES.signUp,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: ROUTES.main,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: ROUTES.main,
    routes: ROUTES,
    baseUrl: process.env.NODE_ENV === "production" ? "https://formify.astroflare.online/" : "http://localhost:3000/",
  },
};

export default nextConfig;
