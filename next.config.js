import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    speedInsights: true, // Enable SpeedInsights
  },
  // Other Next.js config options can be added here
};

export default SpeedInsights(config);
