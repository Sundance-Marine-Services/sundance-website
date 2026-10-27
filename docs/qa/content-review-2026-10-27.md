# Content and publishing review — October 27, 2026

Scope: owner-requested corporate/Infrastructure PDF provisions, static blog, vessel image anonymization, decorative numbering, superscript registration number and page copy/hero edits. Work remains on the review branch and the existing owner-private Sites preview; production `main` is not merged by this task.

## Verified

- `npm test`: **37 passed, zero failed**. Includes all existing evaluator model/integration tests, local save/reopen, cost arithmetic, malicious imported text handling, Zoho context behavior, plus new content publishing, PDF availability, HTML escaping, RSS, generated article metadata, publication-date controls and superscript registration tests.
- `python3 tests/check_site.py`: **27 HTML pages**, local links/assets/anchors, navigation, main landmarks, one h1, IDs, metadata and no date placeholders pass.
- `git diff --check`: passes.
- Fresh cloud-browser axe 4.14 and page-overflow sweeps: **27/27 pages** completed at **320px, 390px and 1440px**, **zero detected violations and zero page-level horizontal overflows** at each width.
- Axe still flags incomplete checks that require human judgment, including background-image contrast; these are not represented as passed. At 390px and 1440px there were 18 incomplete rule/page groups each. The external Zoho iframe is outside the automated audit scope.
- About's FPSO hero and header spacing inspected visually in-browser. The new image is loaded, with a clear illustrative-use note and superscript registration alongside the company name.
- Vessel identity removed from the edited image by visual inspection. The edited 960 × 1280 JPEG uses a generic asset filename; all HTML/social-image references updated. The old named original is absent from the new deployable file set, but recoverable in Git history.
- All **18 existing equipment PDFs are byte-for-byte unchanged** from the reviewed parent commit. `CNAME` remains `sundance.com.ng`.
- Blog has no fabricated live articles. Generated articles are tested in isolated temporary fixtures, not published as real company content.
- Both missing PDF sections have truthful availability text and no broken/fake download anchors. A valid test fixture confirms that adding an approved PDF enables separate view/download links with file size; the fixture is not deployed.

## Still required

The owner must supply the approved corporate profile and Energy Infrastructure PDF. Their contents, download behavior and PDF pagination cannot be checked before upload. The pre-existing release checks for physical-phone interaction, real inquiry receipt, native file-picker operation, screen-reader listening, Lighthouse targets, actual evaluator PDF pagination and social previews remain outstanding. No claim of production release or owner final sign-off is made here.
