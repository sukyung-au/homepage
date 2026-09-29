import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Homepage",
  description: "개인 홈페이지",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
