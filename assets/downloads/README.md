# Approved public PDFs only

The owner-supplied corporate profile is stored unchanged as `sundance-corporate-profile.pdf` (15 pages), and the Energy Infrastructure profile is stored unchanged as `sundance-energy-infrastructure.pdf` (10 pages). Both were supplied October 27, 2026 and are enabled in `content/downloads.json`.

For later replacements, update the matching file and `path` in `content/downloads.json` and run `npm run build:content`. The build checks the file exists and has a PDF signature, then creates separate **View PDF** and **Download PDF** links with the file size. Setting a path back to `null` displays an availability notice with no broken or pretend download link.

Review PDF properties, personal information, commercial data, image permissions, page order and mobile readability before uploading. Everything committed to the website repository must be suitable for public disclosure.
