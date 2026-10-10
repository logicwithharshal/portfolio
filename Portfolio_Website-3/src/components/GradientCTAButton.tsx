import { ArrowRight } from "lucide-react";

/**
 * Uiverse-inspired animated gradient CTA, adapted to the portfolio's
 * indigo / blue / cyan palette. Used only for the Hero "Let's work together" CTA.
 */
export function GradientCTAButton({ href = "#contact" }: { href?: string }) {
  const label = (
    <>
      Let's work together
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </>
  );

  return (
    <span className="cta-grad-wrapper">
      <span className="cta-grad-layer" aria-hidden="true" />
      <span className="cta-grad-layer" aria-hidden="true" />
      <span className="cta-grad-light" aria-hidden="true" />
      <a href={href} className="cta-grad-btn">
        {label}
      </a>
      <span className="cta-grad-overlay" aria-hidden="true">
        {label}
      </span>
    </span>
  );
}
