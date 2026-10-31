# Résumé downloads

`lib/resumes.json` supplies the online résumé and both job-specific documents.
Update that file when experience, dates or contact details change. Keep claims
specific to work Kim has done; add metrics only when there is evidence for them.

To rebuild the Word files, use Python with `python-docx` installed:

```sh
python3 scripts/resumes/build_resumes.py
```

The script writes both DOCX files to `public/resumes`. Export each to PDF using
Word or LibreOffice, keeping the matching filename. When using the Codex
document workflow, run the builder with the bundled Python runtime and render
each DOCX with `render_docx.py --emit_pdf` before copying the PDF into
`public/resumes`.

Check every rendered page after editing: both versions should fit on one A4
page with readable text, working hyperlinks and no clipped content. Commit all
four documents along with the JSON so `/resume` and its downloads agree.

The frontend version emphasises React interfaces and client delivery. The full
stack version emphasises product ownership, authentication and database work.
Dates and education follow Kim's supplied résumés; project details were checked
against the portfolio and available source code.
