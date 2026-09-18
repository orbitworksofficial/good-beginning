# Good Beginnings — Next.js site

A rebuild of **gbeginnings.com** (Good Beginnings Child Care and Preschool, Laurel MD)
as a clean Next.js app. All content, branding, and imagery were recovered from the
compromised WordPress installation — **no malware was carried over**.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Pages

| Route         | Source of content                      |
| ------------- | -------------------------------------- |
| `/`           | WordPress page ID 2 (Home)             |
| `/about-us`   | WordPress page ID 959                  |
| `/enroll`     | WordPress page ID 981                  |
| `/contact-us` | WordPress page ID 1024                 |

## Where the content lives

Everything editable is in **`app/lib/site.ts`** — business details, programs,
classrooms, staff names, enrollment steps and all body copy. Change it there and it
updates across every page. No CMS or database required.

## Design system — "building blocks"

The whole visual language is derived from the logo: **stacked painted toy blocks
under a rainbow arc**. Three rules make it cohesive:

1. **Everything is a block.** Cards, buttons, inputs, badges and stats all use a
   `3px` ink outline with a hard offset shadow (never a soft blur). Cards carry a
   coloured "cap" bar on top so they read as physical blocks.
2. **Nothing is perfectly aligned.** Grids stagger (`lg:mt-8`), photos tilt 1–2°,
   and the eyebrow labels sit at `-1°`, like taped-up paper.
3. **Colour is playful, ink is constant.** Every outline and shadow is the same
   `ink` (`#2A2140`); the fills rotate through the block palette.

Key utility classes live in `app/globals.css`: `.block-card`, `.block-cap`,
`.btn-primary`, `.eyebrow`, `.field`.

### Palette

Recovered from the original Elementor kit (`elementor_active_kit`, post ID 10),
then saturated so it reads like painted blocks:

| Token        | Hex       | Use                             |
| ------------ | --------- | ------------------------------- |
| `ink`        | `#2A2140` | Every outline, shadow, body text|
| `tomato`     | `#EE3524` | Primary buttons                 |
| `sunshine`   | `#F9D616` | Eyebrows, highlights, squiggles |
| `berry`      | `#7B2FF2` | Accent words, CTA band          |
| `jade`       | `#4FB59B` | Checkmarks, caps                |
| `bubblegum`  | `#F08FC8` | Caps, avatars                   |
| `cream`      | `#FBF3EC` | Page background                 |
| `sand`       | `#F4E4D6` | Alternating sections            |

### Type

**Fraunces** for display — a soft, slightly wonky serif, loaded as a variable font
with the `SOFT` and `WONK` axes turned up (see `.font-display` in `globals.css`).
That wonk is what stops it reading like a generic template.
**Outfit** for body copy. Both self-hosted via `next/font`.

Decorative SVG motifs (rainbow arc, block stack, squiggle, block dots) live in
`app/components/Decor.tsx` and are all `aria-hidden`.

## Images

`public/images/` holds only the real photos and the logo pulled from the original
`wp-content/uploads`. The logo is the original
`2025/02/good-beginning-logo.png`.

## Notes

- The contact and enrollment forms use `mailto:` submission so the site runs with no
  backend. To capture submissions properly, point the `action` at a form service
  (Formspree, Netlify Forms) or a route handler.
- Pages are fully static (`○ Static` in the build output) so it can deploy to Vercel,
  Netlify, or any static host.
- Scroll animations are progressive enhancement: if JS fails, content stays visible.
