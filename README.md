# Sundance website rebuild — review draft

This branch contains the 23 supplied website pages refreshed with one shared navigation/footer, plus Energy Infrastructure, the Project Evaluator and a custom 404 page. It is ordinary HTML, CSS and JavaScript suitable for the existing GitHub Pages site. Existing vessel/equipment PDFs and photos remain representative catalogue material.

## Review entry points

- `index.html`: refreshed homepage and three business lines.
- `sundance-energy-infrastructure.html`: project advisory for shallow-water field development.
- `project-evaluator.html`: public browser-based evaluator, ten combinable work packages, custom criteria and up to four candidate packages.
- `contact.html`: email-draft preparation and copy fallback. No server-side delivery service is configured.

Open `index.html` in a browser for a local review. For full clipboard/download behavior, serve the repository root with a normal static web server. There is no build or package installation step.

The evaluator keeps inputs in session memory. Users explicitly download/open local JSON project files, download a text summary or print to PDF. It makes no application API requests and does not automatically submit assessments to Sundance. No cloud project database, user accounts or market-price feed is included. External Google Fonts remain in use.

## Validation

Run from the repository root:

```sh
node --test tests/evaluator.test.cjs
python3 tests/check_site.py
```

- 17 model tests pass: all ten module examples, mandatory failures, incomplete requirements, evidence states/references, numeric directions/zero/invalid values, shared criteria, applicability, cost arithmetic, duration warnings, availability, import validation and report content.
- Static checks pass across all 26 pages: local links, assets and anchors; shared navigation; main landmarks; primary headings; duplicate IDs; canonical metadata; unfinished date markers.
- Browser verified: homepage/evaluator render, fictional example comparison, editing a candidate changes mandatory-gate results, project JSON download and text-summary download. Downloaded files were inspected and contained the expected project and cost.
- Browser file-chooser/import verification stalled and is incomplete. Import schema and summary preservation are covered by model tests.
- Mobile viewport, keyboard-only navigation, print-to-PDF layout, contact email-app behavior and actual email delivery still need final interactive checks. The email form deliberately makes no delivery confirmation claim.

## Content review before production

Review the new homepage wording and Energy Infrastructure scope; confirm the published office/contact details; review the updated privacy/disclaimer data-flow wording. Two missing fleet images are explicitly marked as pending, rather than replaced with a different asset. Catalogue specification-pending entries remain labelled. No client-specific commercial data was added to the evaluator.

The production branch, existing CNAME and live domain have not been changed by preparing this draft. A reviewed merge and successful GitHub Pages deployment are still required for the new pages to become live.
