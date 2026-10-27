# Accessibility correction record

Reviewed October 26–27, 2026. Priorities below are implementation-review priorities, not a claim that every issue had an identical axe impact rating. The current automated result is zero reported violations across all 26 pages at 320px, 390px and 1440px. Incomplete contrast checks over photographs still need human judgment. A screen-reader listening pass remains open.

| Priority | Observed issue | Applied correction |
|---|---|---|
| High | Content photographs on Fleet and Experience had empty alternatives; the Home image used internal wording | Descriptive alternatives were added, without guessing vessel/owner identities. Fleet's complete file/alternative table and actual image tags are in `fleet-image-alternatives.md`. Decorative logos retain empty alternatives beside the visible wordmark. |
| High | The Contact image was described as office towers, but shows a worker and paperwork | Its `alt` is now `Worker in a high-visibility vest reviewing paperwork`; the original image and URL are unchanged. |
| High | Small brass text and some legacy hero/card styles failed automated contrast checks | The exact small-text color is `#8a6320`; legacy selectors receive explicit readable colors in `assets/css/corrections.css`. The active Contact CTA retains white text. Brand brass remains available for suitable large text and graphics. |
| High | The brand link's accessible name omitted much of its visible wordmark | The conflicting `aria-label="Sundance home"` was removed; the visible wordmark now supplies the accessible name. |
| High | About and Our Business skipped heading levels | Mission, Vision and business-card headings were changed from `h3` to `h2` where they follow `h1`. Each static page has one `h1` and no skipped level. |
| High | Evaluator stage tabs needed consistent names, selection and keyboard behavior | The panel uses `aria-labelledby`, tabs have roving `tabindex`, and Left/Right/Home/End keys update the stage and focus the selected tab. Next-stage buttons focus the panel. |
| High | Evaluation updates and import errors needed accessible announcements | Normal notices use `role="status"` and `aria-live="polite"`; errors use `role="alert"` and `aria-live="assertive"`. Results announce candidate status and input-match percentage. |
| Medium | Wide evaluator input/result tables needed keyboard scrolling and visible focus | Each wrapper receives `role="region"`, `tabindex="0"` and a descriptive `aria-label`, with a visible focus outline. |
| Medium | The import file input had a tiny interactive area | Its transparent native input now covers the complete visible Open project button area, without replacing the native file control. |
| Medium | Some controls and gallery dots had undersized targets | Main action/navigation controls have at least 44px height; gallery dots have 24px targets. Relevant links have at least 24px interactive height. |
| Medium | Carousel selection and mobile-menu dismissal needed explicit state/focus | Slides expose one current image through `aria-hidden`; dots use `aria-pressed`; Escape closes navigation and returns focus to its trigger. |

## Exact implementation examples

The following fragments are taken from the applied source. The repository files remain the complete authoritative implementation.

```css
.s-nav>a.s-nav-cta[aria-current="page"]{color:#fff}
.ev-panel:focus-visible{outline:3px solid #2e6e7e;outline-offset:3px}
.ev-table-wrap:focus-visible{outline:3px solid #2e6e7e;outline-offset:3px}
.ev-import input{inset:0;width:100%;height:100%;cursor:pointer;padding:0;border:0}
```

```js
function notice(msg,error=false){notices.setAttribute('role',error?'alert':'status');notices.setAttribute('aria-live',error?'assertive':'polite');notices.textContent=msg;notices.classList.toggle('ev-error',error);}
```

The evaluator also retains explicit form labels, textual result statuses, evidence descriptions and gap messages. Meaning is not conveyed by color alone. Saved-project content is escaped before insertion into HTML; the import handler rejects malformed, oversized and unsupported files without replacing the current assessment.

## Remaining verification

Automated checks do not establish complete WCAG conformance. The cross-origin Zoho form is not included in the site axe sweep. Its controls and prefilled values were inspected in the actual embedded form, but human CAPTCHA completion, successful submission/inbox receipt, physical-phone use and a screen-reader listening pass are still required. Browser Print / PDF populates the report, but final PDF pagination has not been inspected. Lighthouse mobile scores have not been generated.
