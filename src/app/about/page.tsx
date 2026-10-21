import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AboutContent, aboutStyles as s } from "@/components/about/AboutContent";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_LINKS } from "@/lib/site";

export const metadata: Metadata = { title: "About Me — Oil & Gas Development" };

/** About Me: the presentation's self-introduction as a regular page — every card shown, no key controls. */
export default function About() {
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="about" position="relative" />
      <section className={s.page} aria-label="About me">
        <AboutContent
          actions={
            <Link href="/" className={s.begin}>
              Explore Journey <ArrowRight size={16} aria-hidden />
            </Link>
          }
        />
      </section>
      <SiteFooter />
    </main>
  );
}
