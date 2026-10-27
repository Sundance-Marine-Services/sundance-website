# Approved public PDFs only

Upload the owner-approved corporate profile as `sundance-corporate-profile.pdf` and the Energy Infrastructure profile as `sundance-energy-infrastructure.pdf` here. These files have not been supplied yet; no substitute document is published.

Set the matching `path` in `content/downloads.json` to the actual relative path (for example, `assets/downloads/sundance-corporate-profile.pdf`) and run `npm run build:content`. The build checks the file exists and has a PDF signature, then creates separate **View PDF** and **Download PDF** links with the file size. Until then, the pages display a truthful availability notice with no broken or pretend download link.

Review PDF properties, personal information, commercial data, image permissions, page order and mobile readability before uploading. Everything committed to the website repository must be suitable for public disclosure.
