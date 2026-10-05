import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

export interface TextLinkProps {
  href: string;
  onDark?: boolean;
  chevron?: boolean;
  underline?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

/** Inline action link in the single accent blue (Sky blue on dark surfaces). */
export function TextLink({ href, onDark = false, chevron = false, underline = false, children, style }: TextLinkProps) {
  return (
    <Link
      href={href}
      style={{
        color: onDark ? "var(--color-primary-on-dark)" : "var(--color-primary)",
        textDecoration: underline ? "underline" : "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 2,
        ...style,
      }}
    >
      {children}
      {chevron && <ChevronRight size="0.85em" aria-hidden />}
    </Link>
  );
}
