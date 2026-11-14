import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

/** Production address on Vercel, so shared links resolve the preview image; local builds fall back to localhost. */
const SITE_HOST = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_HOST ? `https://${SITE_HOST}` : "http://localhost:3000"),
  openGraph: {
    type: "website",
    siteName: "Oil & Gas Development",
    locale: "ko_KR",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Offshore drilling platform on open blue sea under a clear sky" }],
  },
  twitter: { card: "summary_large_image" },
  title: "Oil & Gas Development — From Subsurface to Field Development",
  description:
    "지표에서 저류층까지, 그리고 생산과 개발까지. 석유개발의 전 과정을 하나의 과학적 여정으로 탐색합니다.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
