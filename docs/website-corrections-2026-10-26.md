# Website corrections release register

Source: the supplied Website Corrections Admin and IT Task Note and the live site, fetched on October 26, 2026. Repository baseline: `27d3fdcd4d5c3a4c1e871aa5d3411aaa5757360d`.

Continuation verified October 27, 2026: main remains at the baseline. GitHub write access is now working and the remote `site-corrections-2026-10-26` review branch exists. The owner waived the Phone field and Project Evaluator dropdown additions in Zoho; those are no longer release blockers. This register is a review-stage record, not a production-deployment claim.

The fresh full-site browser sweep on October 27 again reports zero axe violations and no page-level horizontal overflow at 320px, 390px and 1440px. All four inquiry contexts were verified in the actual provider form. Contact's existing office-towers image description was found visually inaccurate and corrected to describe the worker and paperwork actually shown; no image was substituted.

## Decisions and discrepancies flagged before HTML edits

- The owner confirmed US spellings in the conversation. This overrides the conflicting UK checks in the note.
- All 26 live HTML pages match the current repository and already include the shared header, skip link, main landmark, top email bar and shared footer. Retain those working features. Several body layouts still use older classes.
- Titles or description lengths fail on 22 pages. About and Our Business skip from h1 to h3. Fleet has 21 empty content-image alternatives and Experience has nine.
- All 18 linked specification PDFs currently load. No broken internal fragment was found. The CNAME file is not publicly served, which is normal and is not a broken visitor link. GitHub Pages hosting is supported by the repository and live response headers.
- The approved Port Harcourt address, landline and WhatsApp label are absent. The Lagos landline display will retain the owner's supplied `+234 0201 453 8414`. Its dial link will use `+2342014538414`, removing the national trunk zero for international dialing. NCC numbering plan confirms Lagos national code 0201 / destination code 201.
- The Zoho form loads, but its public configuration lacks Phone, the Project Evaluator choice and a consent notice. Direct probes subsequently verified that `Dropdown1` prefills existing business choices without a custom alias. Website embedding can proceed, including the website consent notice. Missing provider fields and receipt of a test submission cannot be marked complete without configuration and evidence.
- A2, A4 and A5 copy blocks referenced in T2 are not included in the attachment. Preserve body copy except explicit corrections in the note and the US spelling decision.
- Do not introduce a separate subsea business line, evaluator login, lead capture, tracking or email gate.

## Sequential implementation register

| Task | State | Evidence or remaining action |
|---|---|---|
| Baseline live crawl | Complete | 26 HTML pages, 18 linked PDFs, repository comparison and anchor checks |
| Admin contacts and homepage vessel | Implemented | Supplied values and existing vessel photograph |
| T2 shared template | Implemented | Master navigation retained across 26 pages |
| T3 footer and menu | Implemented | Both offices, telephone links and WhatsApp |
| T4 Zoho contact workflow | Implemented; two provider additions waived | Supplied form embedded, privacy text updated, existing-business prefill verified; evaluator topic uses existing Not sure yet option plus request text, verified in the actual provider form |
| Accessibility sweep | Implemented and automated checks passed | Image descriptions, heading hierarchy, contrast fixes, keyboard tabs, status announcements and menu Escape behavior; axe 4.14 reports zero violations on all 26 pages at 320px, 390px and 1440px. Manual screen-reader sign-off remains open. |
| T6 search metadata | Implemented | All 26 titles unique and no longer than 60 characters; descriptions 120–155 characters; canonical, Open Graph and Twitter metadata; five distinct main sharing images |
| Sitemap and structured data | Implemented; account steps open | 25 indexable sitemap entries, robots.txt, confirmed Organization data, root-safe 404 links; ownership verification and submission require owner account access |
| Speed and self-hosted fonts | Implemented; Lighthouse unverified | Seven licensed Latin WOFF2 files with swap, no Google Fonts requests, JPEGs at most 1600px wide, explicit image dimensions and lazy loading below the fold |
| T9 evaluator text and links | Implemented and tested | Static explainer, relevant work-package links, inappropriate regulatory link removed; no account or email gate |
| T10 coordinated release | Review branch created; production sign-off pending | Earlier HTTP 403 blocker resolved on October 27. Full release prepared for one branch commit and review. No production deployment claimed. |

## Validation and limitations

- `npm ci` then `npm test`: 29 passing tests. Coverage includes the ten fictional work packages, mandatory gates, evidence states, commercial arithmetic, custom criteria, malformed imports, shared templates, links, metadata, image attributes and the 18 specification PDF file signatures.
- Browser checks: load Subsea IMR example, use the Left Arrow key from Evaluation to Candidates, change Package A ROV depth to 100m, evaluate, observe 83% and Does not meet with USD 634,000 unchanged. Downloaded JSON and text summary successfully. The file-import handler passes a save/reopen round-trip in JSDOM; the native operating-system file picker was not verified.
- Three complete axe/overflow passes cover 78 page-width combinations. These use narrow browser viewports, not a physical phone or mobile user-agent emulation. Background-image text can require manual contrast review; axe incomplete checks are retained in the evidence JSON. The third-party cross-origin Zoho form is outside the site axe scan.
- Visual review: homepage desktop and 320px layout, mobile menu open/Escape, and the embedded contact form. The real Zoho business select showed Sundance Energy Infrastructure selected. Following the owner's waiver, the evaluator link uses the existing Not sure yet option and the existing request field. Browser inspection on October 27 confirmed both Not sure yet and Project Evaluator inquiry inside the real Zoho form. No test inquiry was submitted.
- Public copy and exported summaries use US spellings. The original `mobilisation` and `demobilisation` JSON property names remain unchanged solely for compatibility with existing saved projects; visible labels and warnings use Mobilization and Demobilization.
- No Lighthouse score was generated. No NVDA/VoiceOver listening pass, physical-phone form submission, received-inbox check, live social-preview check or post-deployment crawl has been claimed.
- PDFs were retained byte-for-byte, and all 18 load in the baseline crawl. Their pages were not edited or newly pagination-certified in this corrections release. Evaluator PDF output remains the browser Print / PDF workflow; printed pagination needs a final browser/owner check.

## External sign-off evidence still required

- Confirm notification delivery to contact@sundance.com.ng. The owner waived adding Phone and a Project Evaluator business choice; no provider-field changes are required for this release. Raw `Dropdown1` prefill works for existing choices, and the existing request field preserves evaluator context. The website already provides consent/privacy wording outside the iframe.
- Successful desktop and phone test submissions received by `contact@sundance.com.ng`. CAPTCHA must be completed by a human if presented.
- Search Console and Bing Webmaster Tools ownership verification and sitemap submission in the owner's accounts.
- Real WhatsApp and LinkedIn sharing previews after release.
- Lighthouse mobile scores and an assistive-technology screen-reader pass, if the necessary tools are unavailable in this session.
- Owner approval of the live release. Do not mark any unavailable check as passed.

## Owner action order

1. Review the complete correction release on `site-corrections-2026-10-26`. GitHub write access is verified; no newer main-branch changes were found before upload. Do not replace unrelated newer work.
2. Keep Zoho's existing form unchanged, as the owner requested. Confirm actual notification delivery during the human test below.
3. Supply the missing A2, A4 and A5 approved copy only if those replacements are still intended. They were not fabricated.
4. Review the preview; run Lighthouse mobile on Home, Fleet and Evaluator and resolve any confirmed issues. Complete keyboard/screen-reader and browser PDF pagination checks.
5. Submit one clearly labeled test inquiry from a desktop and one from a real phone, complete the CAPTCHA yourself, and verify delivery. Use fictional project details, not client information.
6. Merge the entire reviewed release once ready, verify the GitHub Pages deployment, re-crawl the live pages, check both social previews and submit the sitemap in the verified owner accounts. Obtain owner live-site approval.

### Handoff package

The package contains the complete website tree without `.git`, `node_modules` or QA harness files, plus tests, font licenses and this register. The adjacent release patch includes all changed and newly added files against the baseline commit. Retained unreferenced image files are not displayed on the site; no existing PDFs or business cards were deleted. `docs/fleet-image-alternatives.md` contains the descriptive image decisions and replacement tags. Browser audit JSON files are in `docs/qa/`.

## Reference sources

- https://www.ncc.gov.ng/operators/national-numbering-plan
- https://ndpc.gov.ng/download/nigeria-data-protection-act-2023
- https://help.zoho.com/portal/en/kb/forms/form-settings/prefill/articles/field-alias
