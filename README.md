# MOA — moaoutside.org

Static site for MOA, Inc. (formerly hosted on Wix at minorityoutdooralliance.org). No build step: plain HTML/CSS/JS, deployed on Netlify.

```
index.html                 Home
about-us/index.html        About Us
contact/index.html         Contact (Netlify Forms)
privacy-policy/            Privacy Policy
accessibility-statement/   Accessibility Statement
assets/site.css            Styles (palette + type from the Wix site and the 2026 print materials)
assets/site.js             Grass animation, mobile nav, YouTube embed, site config
assets/img/                Photos pulled from the Wix site
assets/logos/moa-badge.png The round MOA badge
_redirects / netlify.toml  Netlify redirects + headers
```

## Local preview
```
python3 -m http.server 8000   # then open http://localhost:8000
```

## Things to fill in (search for them)
- `assets/site.js` → `youtubeChannelId` (starts with `UC…`) and `youtubeChannelUrl`; the social links object.
- `index.html` → Partners: swap the text tiles for `<img>` logos in `assets/logos/`.
- `contact/index.html` → Donate card: confirm the Zelle address / add a donation link.
- Emails: the site uses `info@moaoutside.org`. Set that mailbox up (or change it) before launch.

## Deploy
See `docs/DOMAIN_AND_REDIRECTS.md` for GitHub → Netlify → domain → old-domain redirect, step by step.
