# TEDA — Teso Elites Development Association Website

A static HTML, CSS, and JavaScript website for TEDA, hosted free on GitHub Pages.
No PHP, no database, no login system, no admin panel — all content lives in
`data/*.js` files and all forms submit via [Web3Forms](https://web3forms.com).

## Status

All 18 pages are built. See the checklist below for what's left before this
is ready to go live.

## File Structure

```
teda-website/
├── index.html, about.html, focus-areas.html, opportunities.html,
│   youth-forum.html, events.html, gallery.html, resources.html,
│   news.html, get-involved.html, join.html, apply.html,
│   contact.html, donate.html, terms.html, privacy-policy.html,
│   thank-you.html, 404.html
├── manifest.json
├── sw.js
├── robots.txt
├── sitemap.xml
├── README.md
├── assets/
│   ├── css/style.css
│   ├── js/main.js, forms.js, gallery.js, mobile-menu.js
│   └── images/ (logo, favicon, og-image, hero/, directors/, ambassadors/, gallery/, events/, posts/)
└── data/
    ├── directors.js, ambassadors.js, events.js, gallery.js, posts.js,
    ├── positions.js, testimonials.js, focus-areas.js, opportunities.js,
    └── resources.js, faqs.js, partners.js
```

## Before You Deploy — Outstanding Items

- [ ] **Replace placeholder photos.** Every image currently points to
      `picsum.photos` placeholders. Add real photos to
      `assets/images/` and update the `src`/`background-image` references.
      (Member and testimonial avatars intentionally use a generic icon
      instead of stock photos, no change needed there.)
- [ ] **Self-host Font Awesome.** Every page currently loads Font Awesome
      from the cdnjs CDN for preview convenience. Download it into
      `assets/vendor/fontawesome/` and update the `<link>` tag on every
      page to meet the "no CDN dependency" security requirement.
- [ ] **Populate `data/*.js` files for about.html.** Directors, ambassadors,
      testimonials, focus areas, and opportunities data files exist and
      match the current page content, but `about.html`/`index.html`/
      `focus-areas.html`/`opportunities.html` still render that content
      as static HTML rather than reading from those files.
- [ ] **Add real icons.** `manifest.json` references
      `assets/images/icon-192.png`, `icon-512.png`, and
      `icon-maskable-512.png` — none of these exist yet, which will
      block the "Add to Home Screen" install prompt.
- [ ] **Enable GitHub 2FA** on the account hosting this repo — the
      single highest-impact security step for a GitHub Pages site (see
      the security guide from earlier in this project).
- [ ] **Set "Allowed Domains" in the Web3Forms dashboard** once the site
      has a real live URL, so the access key only works from your actual
      domain (currently open to any origin).

## Completed

- ✅ **Web3Forms wired up.** All 5 forms (join, apply, contact,
      youth-forum register, volunteer, partner) submit live to
      `tedayouthteso@gmail.com` via Web3Forms, including a honeypot
      spam field.
- ✅ **reCAPTCHA v3 wired up.** Invisible check runs before every
      submission, using a live site key.
- ✅ **Real domain wired up.** Every `canonical`, `og:url`, `og:image`,
      `sitemap.xml`, and `robots.txt` reference now points to the actual
      live GitHub Pages URL instead of a placeholder domain.
- ✅ **Social media links live.** Footer icons across all 18 pages link
      to the real Facebook, X, LinkedIn, TikTok, and WhatsApp Channel
      profiles.
- ✅ **Focus Areas dropdown.** Hover reveal on desktop, tap-to-expand on
      mobile/tablet, linking straight to each of the 6 focus area
      sections.
- ✅ **Editable photo tags added.** Every hero, page-header, join-CTA,
      footer, and forum-teaser photo now has a real `<img class="bg-photo-img" src="" alt="">`
      tag sitting alongside the placeholder, ready for a real photo's
      filename to be dropped into `src=""` whenever you have one.

## Local Preview

No build step — just open any `.html` file directly in a browser, or
serve the folder with any static file server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment (GitHub Pages)

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings → Pages**.
3. Set the source branch (usually `main`) and root folder.
4. Site is live at `https://teda-youth.github.io/TESO-ELITES_DEVELOPMENT-ASSOCIATION-/`
   using GitHub's default address, no custom domain or `CNAME` file needed.

## Design System

| Token | Value |
|---|---|
| Brown (primary) | `#7B1F1F` |
| Blue (secondary) | `#1A5FAD` |
| Green (success) | `#2E7D32` |
| Gold (accent) | `#c9952a` |
| Dark (footer) | `#1a0a0a` |
| Off-white (section bg) | `#faf8f5` |
| Headings | Playfair Display |
| Body | DM Sans |

## Contact

tedayouthteso@gmail.com · WhatsApp +256 775 375249
