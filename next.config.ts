import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Petroleum System topic moved under G&G when Technology went from 5 to 3 categories
  async redirects() {
    return [{ source: "/technology/petroleum/pt-generation", destination: "/technology/gg/pt-generation", permanent: false }];
  },
};

export default nextConfig;
