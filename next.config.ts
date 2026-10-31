import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/admin/resumes/*': ['./private/resumes/**/*'],
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }, ...(process.env.NEXT_PUBLIC_SUPABASE_URL ? [{protocol:"https" as const,hostname:new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname}] : [])],
  },
};

export default nextConfig;
