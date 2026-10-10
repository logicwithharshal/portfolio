# Sticky Projects Showcase

## Goal
Replace only the existing Projects card grid with a scroll-driven case-study showcase inspired by the supplied reference, while preserving the portfolio’s own theme, typography, starfield, content, and project order.

## What will change
- Keep the existing Projects heading and `#projects` navigation target.
- Build a desktop two-column experience:
  - a large sticky preview on the left;
  - a vertically scrolling project list on the right.
- Determine the active project from the row closest to the viewport center.
- Crossfade and gently scale the sticky preview over 500–700ms when the active project changes.
- Expand only the active row to show its description, technologies, GitHub link, and Live Demo link.
- Collapse inactive rows to their number and title.
- Use the existing violet/lavender accents, semantic theme colors, typography, borders, and restrained shadows.
- On tablet and mobile, switch to a natural stacked list where each project’s preview and details appear together; no sticky split layout.
- Respect reduced-motion preferences and avoid adding a heavy animation library.

## Existing-data constraint
The seven existing project records currently contain no screenshot URLs, and their GitHub/Demo URLs are placeholders. The redesign will preserve those values exactly and render the existing intentional visual placeholder until real screenshots and links are supplied.

## Verification
- Test scroll activation and image transitions at desktop width.
- Test stacked reading order at tablet and mobile widths.
- Confirm no horizontal overflow, runtime errors, or changes outside Projects.
