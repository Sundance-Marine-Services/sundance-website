# Public downloads and static blog

Updated October 27, 2026. The corporate and Energy Infrastructure PDFs are now supplied and linked, byte-for-byte unchanged. Nothing in this change replaces the original 18 equipment PDFs.

## Downloads

- Corporate profile: About page, `about.html#corporate-profile`, linked from every footer.
- Energy Infrastructure profile: `sundance-energy-infrastructure.html#infrastructure-profile` on the business page itself.
- Upload approved PDFs into `assets/downloads/`, set their actual paths in `content/downloads.json`, and run `npm run build:content`. Commit the PDFs, registry and generated HTML together to the review branch. No fabricated PDF or broken download URL is used while a file is missing.
- Visitors receive both a browser-view link and a download link, clearly labeled PDF with its file size. A browser may open a PDF rather than save it, depending on its settings; its viewer's save/share control remains available.

## Blog architecture

`blog.html` is a real, crawlable HTML index. Approved articles are generated as root-level `insight-SLUG.html` files, with full article text, unique metadata, canonical URL, Article structured data, accessible headings, RSS (`feed.xml`) and sitemap entries. Neither reading posts nor finding them requires JavaScript, a login, a CMS subscription or a server-side database.

Posts are maintained in `content/insights.json` and built using a dependency-free Node script. This deliberately preserves the current GitHub Pages publishing source rather than changing the site's hosting or introducing an unapproved deployment workflow. The finished HTML is committed alongside its source, so the existing static publishing process can serve it directly. `.nojekyll` bypasses unintended Jekyll processing.

There are no published articles yet. The blog presents an honest empty state rather than fabricated thought leadership or example posts. Comments, mailing-list capture, analytics and CMS authentication are not added.

### First article workflow

1. Prepare an original article with an agreed title, business category, byline, publication date and 120–155-character description. Use US spellings. Verify technical, regulatory and market statements against primary sources. Obtain permission for project references and images.
2. Have Sundance approve it for public release. Do not commit confidential material or unpublished drafts to this public repository: setting `published: false` hides an article from the generated site, not from GitHub source history.
3. Add an approved entry to `content/insights.json`. Supported block types are `paragraph` (`text`), `heading` (`text`, rendered as h2), and `list` (`items`, an array of strings). Text is escaped; raw HTML and embedded scripts are not supported. The `references` array accepts descriptive text and HTTPS links to verified public sources.
4. Run `npm run build:content`, `npm test`, and `python3 tests/check_site.py`. Commit the source, generated index/article/feed/sitemap and any approved assets together to the review branch.
5. Review on desktop and phone, then approve the normal pull request/release. A publishing date does not schedule a deployment; a future-dated article stays out of the build until it is rebuilt on or after that date.

Example structure (instructional only; do not publish placeholder text):

```json
{
  "slug": "your-approved-article-title",
  "title": "Your approved article title",
  "description": "Replace this with an original 120–155-character search description that accurately summarizes the approved article and its practical focus.",
  "excerpt": "A concise introduction to the approved article.",
  "category": "Marine Operations",
  "author": "Sundance editorial team",
  "date": "2026-10-27",
  "published": true,
  "blocks": [
    {"type": "paragraph", "text": "Approved opening paragraph."},
    {"type": "heading", "text": "A useful section heading"},
    {"type": "list", "items": ["A practical consideration."]}
  ],
  "references": []
}
```

Categories: `Marine Operations`, `Ports & Cargo`, `Energy Advisory`, `Energy Infrastructure`.

If a browser-based editorial interface becomes necessary later, a Git-backed CMS can be considered separately. That would require explicit account, permissions and approval-workflow decisions; none are silently added now.

Primary hosting reference checked October 27, 2026: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site (GitHub Pages serves committed static HTML and supports a local static build).

## This review's other changes

- Remove painted Stanford Hawk name, registry port and IMO identity from the vessel image; use a generically named edited asset in page and sharing references. The unedited named image is not in the deployable asset set. The FPSO has also been anonymized and its previous caption removed, as requested in the subsequent owner review.
- Remove decorative service, business-card and approach numbering. Evaluator step numbering remains functional navigation rather than service numbering.
- Superscript `RC 1497579` in site headers and footers only. Do not add it to prose, headings, bylines, descriptions or evaluator report text. Structured Organization identifiers remain machine-readable legal metadata, not visible sentence decorations.
- Replace Business Overview headline with the requested integrated-solutions wording.
- Use the anonymized FPSO image on About and matching sharing metadata. Remove the previous illustrative-use note per the owner's correction; do not introduce ownership claims.
- Present Diligence, Integrity, Resilience and Excellence as four boxed cards with individual navy/brass vector icons matching the supplied reference. Preserve the existing descriptions.
- Business cards explicitly reset image height and use the same 8:5 frame with cover cropping, preventing intrinsic portrait dimensions from pushing headings out of alignment.
- Remove the dated reverse-chronological caption on Experience.
- These are review-branch/private-preview changes, not a production merge.
