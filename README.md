# Sundance website corrections — review release

Complete HTML, CSS, JavaScript and assets for the existing Sundance GitHub Pages site, prepared on October 26, 2026 against commit `27d3fdcd4d5c3a4c1e871aa5d3411aaa5757360d`. The 26 existing HTML filenames and domain configuration are retained. US spellings are used in public copy, visible evaluator labels and exported summaries.

This is a review release, **not a verified production deployment**. GitHub repository write access was verified on October 27, 2026 by creating and reading the `site-corrections-2026-10-26` review branch. The earlier HTTP 403 blocker is resolved. Production remains on the audited baseline until the coordinated release is approved.

## Review entry points

- `index.html`: vessel-led homepage and three business lines.
- `sundance-energy-infrastructure.html`: Project Advisor for shallow-water oil-and-gas field development.
- `fleet.html`: descriptive image alternatives, working PDF links and further equipment available on request.
- `project-evaluator.html`: public browser-based evaluator, ten combinable work packages, custom criteria and up to four candidate packages; no login or email gate.
- `contact.html`: supplied Zoho form with website privacy notice, business-context links and confirmed office/contact details.
- `blog.html`: static Blog & Insights index, full-HTML article publishing support and RSS feed. No articles are published yet.
- `about.html#corporate-profile` and `sundance-energy-infrastructure.html#infrastructure-profile`: public PDF download sections prepared; the owner-approved PDFs still need to be supplied.
- `docs/content-publishing.md`: blog editorial process and PDF activation instructions.
- `docs/website-corrections-2026-10-26.md`: sequential implementation register, evidence and remaining owner actions.
- `docs/fleet-image-alternatives.md`: fleet image decisions and complete replacement image tags.

## Local preview and tests

Serve this folder with a normal static web server, for example `python3 -m http.server 8000`, then open `http://localhost:8000/`. The production site has no build or package-installation step. Do not test the root-relative custom 404 from a `file://` URL.

Developer tests:

```sh
npm ci
npm test
```

All 37 model, DOM-integration, content-publishing and static tests pass as of the October 27 content update. Browser checks from the original review verify fictional comparisons, keyboard tabs, mandatory-gap changes, commercial totals, JSON/text downloads, mobile navigation and the embedded form's Infrastructure preselection. The earlier 26-page axe evidence JSON is retained in `docs/qa/`; the new 27-page content review is recorded separately there. This is not a full accessibility certification or a physical-phone test.

When adding approved blog posts or activating a supplied PDF, run `npm run build:content` before the checks above and commit the generated HTML, RSS and sitemap with the source. Ordinary hosting still serves the committed static files; no production hosting workflow or permissions were changed.

The evaluator retains inputs only in session memory. Users explicitly download/open local JSON files, download a text summary or use browser Print / PDF. No project database, automatic assessment submission, client login, market-price feed or currency-conversion feed is included. Fonts are self-hosted with their OFL licenses. Original saved-project JSON cost keys remain compatible.

## Open release checks

1. Review the complete correction release on `site-corrections-2026-10-26`. Main and the review branch were checked against the audited baseline before upload; no newer upstream change was found.
2. The owner waived adding Phone and a Project Evaluator choice to Zoho on October 27, 2026. The existing form stays unchanged. Evaluator inquiries use its existing Not sure yet option and prefill the request field with Project Evaluator inquiry. The website privacy notice is already provided outside the iframe. Actual notification delivery still needs verification.
3. Complete real desktop/phone inquiry and inbox checks, Lighthouse mobile, a screen-reader listening pass and browser PDF pagination. Native file-picker operation also remains unverified; the application import handler and saved-project round-trip are tested.
4. A2, A4 and A5 approved replacement copy was not supplied. Other body wording was preserved except the explicitly requested corrections.
5. After the complete release is approved and deployed, re-crawl the live site, check WhatsApp/LinkedIn previews, verify search-owner accounts, submit the sitemap and obtain owner live-site approval.

No confidential client names or commercial information have been introduced. The current site's photographs and specification PDFs remain representative catalogue material; no ownership or certification is inferred from them. The original PDF bytes were retained.
