# Owner follow-up corrections — October 27, 2026

This follow-up supersedes the prior content-review notes where they describe missing brochures or registration numbers in body copy. The production release remains unmerged; these changes are for the existing review branch and owner-private preview.

## Changes

- Corporate profile: `assets/downloads/sundance-corporate-profile.pdf`, 15 pages, 1,582,621 bytes. Linked from About's corporate-profile section; every footer already links to that section.
- Energy Infrastructure profile: `assets/downloads/sundance-energy-infrastructure.pdf`, 10 pages, 552,087 bytes. Linked directly from the Energy Infrastructure page's profile section.
- Each section has separate View and Download links with a visible PDF file size. Both source documents are preserved byte-for-byte; no edits to their wording, imagery or pagination were made.
- `RC 1497579` remains superscript in the shared header/footer wordmarks and footer copyright line only. It is removed from About, Home, Privacy and Disclaimer prose and evaluator report text. Non-visible Organization identifiers are retained as legal metadata.
- The existing FPSO photo is anonymized with the built-in image tool and replaced by `assets/img/fpso-offshore-anonymized.jpg`. The named original is removed from this current deployable asset set and remains recoverable in Git history. The requested illustrative-use sentence is removed completely.
- Core values are four boxed cards: Diligence, Integrity, Resilience and Excellence. Each has its own navy/brass vector icon based on the supplied reference. Existing descriptions are retained inside the cards.
- Home and Business Overview use an explicit shared 8:5 image frame, `height: auto`, `object-fit: cover` and no flex shrinking. The source images retain their correct intrinsic width/height metadata.

## Validation

- 39 automated tests passed; zero failed. Includes headers/footer-only RC checks, four distinct value icons, real brochure links, all earlier evaluator arithmetic/import/export tests and the static blog generator.
- Static checks passed across 27 HTML pages: links, assets, anchors, IDs, landmarks and metadata.
- All 18 existing equipment PDFs remain byte-for-byte unchanged. Domain configuration is unchanged.
- The uploaded brochures were parsed and rendered locally for read-only inspection. Both also open in the browser's PDF viewer from their actual website asset URLs, showing 15 and 10 pages respectively. This is file availability/rendering verification, not independent validation of every commercial or market statement in the supplied documents.
- Source PDF SHA-256 hashes: corporate `3545adf458e3056b61f1af86a70f50dd9047331fabb6624acf64e306cf6a1974`; Infrastructure `27eeda098459899a16dfbbf395b15c5b4c6fe2a5b57ff101dab41fba72563310`.
- Desktop image geometry measured in-browser at 1440px: all three Home images start at y=1245.016px, have width approximately 377.33px and equal height 235.828px. Fractional column widths differ by under 0.02px, as expected for grid rounding. Core-value cards were visually inspected in-browser.
- Fresh axe and horizontal-overflow checks completed across all 27 pages at 1440px, 390px and 320px, with zero detected violations or page-level overflows at each width. Incomplete/manual contrast checks are not treated as passed, and the external Zoho iframe remains outside the automated audit scope.
- Browser download-event capture timed out. The files themselves open correctly in the browser PDF viewer and the view/download anchors resolve to the exact approved PDF bytes. Native save behavior and physical-phone saving are not claimed as verified.

The existing release checks for real inquiry receipts, screen-reader listening, Lighthouse scores, native evaluator file-picker use, evaluator PDF print pagination and physical-phone interaction remain outstanding. No production merge or public deployment is performed by this follow-up.
