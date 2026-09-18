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

## Design system

Clean and professional, in a warm peach-and-coral palette.

- **Full-bleed hero.** The homepage opens on a large classroom photograph that
  fills the viewport (min 34rem, 42rem on desktop), with a warm gradient scrim
  that is dark on the left so the headline stays legible and clears toward the
  right so the room itself is still visible.
- **Coral** is the single accent: buttons, links, icons, active nav, numbered
  steps. There is no second competing accent colour.
- Sections alternate **white** and a soft **peach tint** so the page has rhythm.
- Cards are white with a light warm border and a soft shadow.

### Palette

| Token         | Hex       | Use                                  |
| ------------- | --------- | ------------------------------------ |
| `coral`       | `#E2673C` | Buttons, links, icons, accents       |
| `coral-dark`  | `#C4512B` | Button hover, CTA band               |
| `coral-light` | `#FDE8DC` | Borders, icon chips                  |
| `coral-tint`  | `#FFF4EE` | Alternating section backgrounds      |
| `navy`        | `#3D2B24` | Headings (warm brown-black)          |
| `slate-600`   | `#6B564C` | Body copy                            |

Neutrals are warm-toned rather than blue-grey so they sit comfortably on peach.

### Type

**Inter** throughout, at two weights — `font-semibold` for headings and
`font-normal` for body. One family keeps it clean and highly legible.

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
