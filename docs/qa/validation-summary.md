# Validation summary

Date: October 26, 2026. State: local correction release; not deployed.

| Check | Result |
|---|---|
| `npm test` | 29 passed, zero failed |
| `python3 tests/check_site.py` | 26 pages passed; links/assets/anchors, navigation, main landmarks, headings, IDs, metadata and date placeholders |
| `git diff --check` | Passed |
| axe 4.14, 320px | 26 pages, zero violations, zero page-level horizontal overflows |
| axe 4.14, 390px | 26 pages, zero violations, zero page-level horizontal overflows |
| axe 4.14, 1440px | 26 pages, zero violations, zero page-level horizontal overflows |
| Browser fictional comparison | Package A 100%, USD 634,000; Package B 50%, USD 559,000 |
| Browser mandatory failure | Package A ROV depth changed to 100m: Does not meet, 83%, one gap; cost unchanged |
| Browser keyboard | Left Arrow selects Candidates; mobile menu opens, Escape closes it |
| Browser exports | Project JSON and text summary downloads completed; final summary uses mobilization and demobilization |
| Save/reopen | Application import-handler round-trip passed; native OS file picker not verified |
| Zoho infrastructure prefill | Actual provider select showed Sundance Energy Infrastructure |
| PDFs | All 18 linked PDFs loaded in baseline; bytes retained; local signatures and links pass |
| Remote branch creation on October 26 | Blocked at that time: GitHub HTTP 403; resolved October 27 as recorded below |

## October 27 continuation

GitHub installation access is now visible for Sundance-Marine-Services. Creation of the review branch succeeded and its ref was read back at the audited baseline. The prior remote-write blocker is resolved; main remains unchanged.

The owner waived Zoho's Phone and Project Evaluator additions. The evaluator inquiry now uses the existing Not sure yet choice and prefills the existing project-request field with Project Evaluator inquiry. Both values were observed inside the actual embedded provider form, not merely in the URL. No inquiry was submitted and no CAPTCHA was attempted. All 29 automated tests and the 26-page static check pass after this change.

The complete axe/overflow sweep was repeated on October 27 at 320px, 390px and 1440px: 26 pages at each width, zero violations and zero page-level horizontal overflows. All three business selections were also verified in the actual Zoho form. The evaluator's keyboard path again produced Does not meet, 83% and USD 634,000 after reducing Package A's ROV depth rating to 100m. Print / PDF populated a 5,011-character printable summary; a PDF file and its physical pagination could not be inspected in this browser session.

Visual review corrected the existing Contact image alternative: its misleading office-towers description was replaced with Worker in a high-visibility vest reviewing paperwork. The image and its filename were retained. A human screen-reader listening pass and Lighthouse mobile results remain unverified; none is represented as passed.

The three axe files contain incomplete items requiring manual review, principally contrast over background images. They are evidence of the automated result, not a guarantee of full WCAG conformance. The cross-origin form is not included in the site scan. Narrow viewports are not equivalent to a physical-phone test. Lighthouse, screen-reader listening, browser print/PDF pagination, inquiry delivery, ownership-account tasks, live social previews and post-deployment checks remain open. See the release register for the exact owner actions.
