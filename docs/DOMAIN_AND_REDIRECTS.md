# Launch checklist: GitHub → Netlify → moaoutside.org → redirect the old domain

## 1. GitHub
```
cd moaoutside-site
git init && git add -A && git commit -m "MOA site: initial static rebuild"
gh repo create moaoutside-site --public --source=. --push
```

## 2. Netlify
```
npm i -g netlify-cli
netlify login
netlify init        # "Create & configure a new site", pick your team, site name: moaoutside
netlify deploy --prod --dir=.
```
Or in the Netlify UI: Add new site → Import from Git → pick the repo → publish directory `.` → Deploy.
Every push to `main` redeploys automatically.

Turn on **Site settings → Forms** so the newsletter form on /contact collects submissions (it's already tagged `data-netlify="true"`).

## 3. Point moaoutside.org at Netlify
Netlify UI → **Domain management → Add a domain → moaoutside.org**.
At your registrar (wherever you bought moaoutside.org) set DNS to:

| Type | Name | Value |
|---|---|---|
| A | @ | 75.2.60.5 |
| CNAME | www | `<your-site>.netlify.app` |

(Simplest option: in Netlify choose **"Use Netlify DNS"** and change the nameservers at the registrar to the four `dns1–4.p0x.nsone.net` entries Netlify shows you. Then Netlify manages the records.)

HTTPS is automatic (Let's Encrypt) once DNS resolves — usually under an hour, up to 24h.

## 4. Redirect minorityoutdooralliance.org → moaoutside.org
The cleanest way is to let Netlify own the old domain too, so every old link 301-redirects to the same path on the new site (the rules are already in `_redirects`).

1. Netlify → **Domain management → Add domain alias → minorityoutdooralliance.org** (and `www.`).
2. In **Wix**: Settings → Domains → **minorityoutdooralliance.org → ⋯ → Disconnect from site** (so Wix stops serving it). If the domain is *registered* with Wix, keep it registered there — you only change the DNS records:
   Wix → Domains → minorityoutdooralliance.org → **Manage DNS records**.
3. Set the old domain's DNS to Netlify exactly like step 3 (A `@` → 75.2.60.5, CNAME `www` → your netlify.app host). Delete Wix's old A/CNAME records for `@` and `www`.
4. Wait for DNS, then let Netlify issue the certificate for the alias (Domain management → HTTPS → Verify).
5. Test: `curl -I https://www.minorityoutdooralliance.org/about-us` should return `301` with `Location: https://moaoutside.org/about-us`.

Keep the old domain registered for at least a year or two — search engines, printed materials, and email signatures still point there.

## 5. Email
- Contact email stays `ashleysmith@minorityoutdooralliance.org` (existing mailbox on the old domain); no new mailbox needed for moaoutside.org.
- Keep the old `@minorityoutdooralliance.org` mailboxes alive and forward them to the new addresses.

## 6. After launch
- Google Search Console: add moaoutside.org, submit `/sitemap.xml`, and use **Change of address** from the old property.
- Update Instagram/Facebook/YouTube bio links, Zelle display name, and any printed materials.
- Cancel the Wix Premium plan only after the redirect has been verified for a couple of weeks.
