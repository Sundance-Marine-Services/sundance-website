# Sundance self-hosted fonts

Prepared on 26 October 2026 from the official Google Fonts repository (Fraunces variable source) and the Google Fonts TTF files identified in the official CSS response (Inter and IBM Plex Mono). The files are Latin subsets with site punctuation and available mathematical/arrow glyphs retained. Each font uses SIL Open Font License 1.1; the corresponding full license is included.

## Integration

Copy this directory to `assets/fonts/` and add `<link rel="stylesheet" href="assets/fonts/fonts.css">` before the main stylesheet. The relative URLs in fonts.css resolve beside that stylesheet. Remove the Google Fonts stylesheet and preconnect lines from page heads.

Preload the primary fonts with:

```html
<link rel="preload" href="assets/fonts/fraunces-latin-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/inter-latin-400.woff2" as="font" type="font/woff2" crossorigin>
```

All seven requested normal weights have `font-display: swap`. Fraunces preserves its `opsz` optical-size axis (9–144) from the supplied TTF. The weight of each separate face is fixed to its requested value.

Every WOFF2 was reopened with fontTools after compression, verified for signature, OS/2 weight class and printable ASCII, and checked to retain every selected character that the source actually contains. All fonts retain multiplication and ≤/≥. Fraunces does not supply arrow glyphs in its upstream source; use the existing serif fallback for arrows in headings, while Inter and IBM Plex Mono contain them. No glyph artwork has been invented.

## Sources

- Fraunces 400: https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf
  License: https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/OFL.txt
- Fraunces 600: https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/Fraunces%5BSOFT%2CWONK%2Copsz%2Cwght%5D.ttf
  License: https://raw.githubusercontent.com/google/fonts/main/ofl/fraunces/OFL.txt
- IBM Plex Mono 400: https://fonts.gstatic.com/s/ibmplexmono/v20/-F63fjptAgt5VM-kVkqdyU8n5ig.ttf
  License: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt
- IBM Plex Mono 500: https://fonts.gstatic.com/s/ibmplexmono/v20/-F6qfjptAgt5VM-kVkqdyU8n3twJ8lc.ttf
  License: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt
- Inter 400: https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf
  License: https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt
- Inter 500: https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZg.ttf
  License: https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt
- Inter 600: https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf
  License: https://raw.githubusercontent.com/google/fonts/main/ofl/inter/OFL.txt

`validation.json` records file hashes, byte counts, font weights, axes and glyph-coverage exceptions. The original downloaded TTFs are retained outside this integration directory for audit only.
