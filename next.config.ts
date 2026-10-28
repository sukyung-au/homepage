import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Earlier Technology IAs (5 categories, then G&G): their URLs land on the Technology entry
  async redirects() {
    return [
      { source: "/technology/petroleum/:path*", destination: "/technology", permanent: false },
      { source: "/technology/gg/:path*", destination: "/technology", permanent: false },
      { source: "/technology/gg", destination: "/technology", permanent: false },
      // Reserves Estimation moved from Reservoir Engineering 3.5 to its own category 04 (replacing Reservoir Evaluation)
      { source: "/technology/engineering/re-reserves", destination: "/technology/reserves/rs-estimation", permanent: false },
      { source: "/technology/evaluation", destination: "/technology/reserves/rs-estimation", permanent: false },
      // Case Studies became AI Technology
      { source: "/case-studies", destination: "/ai-technology", permanent: false },
    ];
  },
};

export default nextConfig;
