#!/usr/bin/env python3

from __future__ import annotations

import argparse
import json
from pathlib import Path

from pypdf import PdfReader


def extract_pdf_to_text(pdf_path: Path) -> tuple[str, dict]:
    reader = PdfReader(str(pdf_path))
    page_texts: list[str] = []
    extracted_chars = 0

    for i, page in enumerate(reader.pages, start=1):
        try:
            text = page.extract_text() or ""
        except Exception as exc:  # noqa: BLE001
            text = ""
            page_texts.append(f"\n\n--- Page {i} (extract error: {type(exc).__name__}) ---\n\n")
            continue

        extracted_chars += len(text)
        page_texts.append(f"\n\n--- Page {i} ---\n\n{text}")

    meta = {
        "file": pdf_path.name,
        "pages": len(reader.pages),
        "extracted_chars": extracted_chars,
    }

    return "\n".join(page_texts).strip() + "\n", meta


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract PDFs under thesis/pdfs to thesis/pdfs_txt.")
    parser.add_argument(
        "--pdf-dir",
        type=Path,
        default=Path("thesis/pdfs"),
        help="Directory containing PDF files (default: thesis/pdfs)",
    )
    parser.add_argument(
        "--out-dir",
        type=Path,
        default=Path("thesis/pdfs_txt"),
        help="Output directory for extracted .txt files (default: thesis/pdfs_txt)",
    )
    parser.add_argument(
        "--report",
        type=Path,
        default=Path("thesis/pdfs_txt/_extraction_report.json"),
        help="Where to write a JSON extraction report",
    )
    args = parser.parse_args()

    pdf_dir: Path = args.pdf_dir
    out_dir: Path = args.out_dir
    report_path: Path = args.report

    if not pdf_dir.exists() or not pdf_dir.is_dir():
        raise SystemExit(f"PDF directory not found: {pdf_dir}")

    out_dir.mkdir(parents=True, exist_ok=True)

    report: list[dict] = []
    pdfs = sorted(pdf_dir.glob("*.pdf"))

    if not pdfs:
        print(f"No PDFs found in {pdf_dir}")
        report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
        return 0

    for pdf_path in pdfs:
        text, meta = extract_pdf_to_text(pdf_path)
        out_path = out_dir / f"{pdf_path.stem}.txt"
        out_path.write_text(text, encoding="utf-8", errors="replace")
        report.append(meta)

    report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"Extracted {len(pdfs)} PDFs to {out_dir}")
    print(f"Wrote report: {report_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
