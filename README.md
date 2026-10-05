# MOA — moaoutside.org

Static site for MOA, Inc. (formerly hosted on Wix at minorityoutdooralliance.org). No build step: plain HTML/CSS/JS, deployed on Netlify.

```
index.html                 Home
about-us/index.html        About Us
contact/index.html         Contact (Netlify Forms)
donate/index.html         Donate (Stripe Payment Links, configured in assets/site.js)
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
- `assets/site.js` → `donate.oneTime` (and optionally `donate.monthly`): paste the Stripe Payment Link URLs. Until set, /donate hides the Stripe buttons and shows Zelle.
- `contact/index.html` and `donate/index.html` → confirm the Zelle address.
- Emails: the site uses `info@moaoutside.org`. Set that mailbox up (or change it) before launch.

## Deploy
See `docs/DOMAIN_AND_REDIRECTS.md` for GitHub → Netlify → domain → old-domain redirect, step by step.
