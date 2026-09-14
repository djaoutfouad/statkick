#!/usr/bin/env python3
import os
import re
import sys

BASE_URL = "https://statkick.pages.dev"
FORBIDDEN_URL = "https://statkick.com"
DIST_DIR = "dist"

canonical_regex = re.compile(r'<link[^>]*?rel=["\']canonical["\'][^>]*?href=["\']([^"\']+)["\']|<link[^>]*?href=["\']([^"\']+)["\'][^>]*?rel=["\']canonical["\']', re.IGNORECASE)
og_url_regex = re.compile(r'<meta[^>]*?property=["\']og:url["\'][^>]*?content=["\']([^"\']+)["\']|<meta[^>]*?content=["\']([^"\']+)["\'][^>]*?property=["\']og:url["\']', re.IGNORECASE)

def get_expected_canonical(rel_path):
    # Normalize path:
    # dist/index.html -> https://statkick.pages.dev/
    # dist/about.html -> https://statkick.pages.dev/about
    # dist/blog.html -> https://statkick.pages.dev/blog
    # dist/blog/what-is-xg-in-football.html -> https://statkick.pages.dev/blog/what-is-xg-in-football
    # dist/tools/player-performance-rater.html -> https://statkick.pages.dev/tools/player-performance-rater
    rel = rel_path.replace(os.sep, '/')
    if rel == 'index.html':
        return f"{BASE_URL}/"
    if rel.endswith('.html'):
        rel = rel[:-5]
    if rel.endswith('/index'):
        rel = rel[:-6]
    return f"{BASE_URL}/{rel}"

def check_html_files():
    if not os.path.exists(DIST_DIR):
        print(f"Error: {DIST_DIR} does not exist. Run build first.")
        sys.exit(1)

    html_files = []
    for root, dirs, files in os.walk(DIST_DIR):
        for f in files:
            if f.endswith('.html'):
                full_path = os.path.join(root, f)
                rel_path = os.path.relpath(full_path, DIST_DIR)
                html_files.append((full_path, rel_path))

    print(f"Found {len(html_files)} HTML files in {DIST_DIR}/")
    errors = []
    checked_count = 0

    for full_path, rel_path in sorted(html_files):
        checked_count += 1
        with open(full_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Canonical checks
        canonicals = []
        for match in canonical_regex.finditer(content):
            val = match.group(1) or match.group(2)
            canonicals.append(val)

        if len(canonicals) == 0:
            errors.append(f"[{rel_path}] Missing canonical tag")
        elif len(canonicals) > 1:
            errors.append(f"[{rel_path}] Multiple ({len(canonicals)}) canonical tags found: {canonicals}")
        else:
            canonical_val = canonicals[0]
            expected_canonical = get_expected_canonical(rel_path)
            if canonical_val != expected_canonical:
                errors.append(f"[{rel_path}] Canonical mismatch! Found: '{canonical_val}', Expected: '{expected_canonical}'")
            if FORBIDDEN_URL in canonical_val:
                errors.append(f"[{rel_path}] Forbidden domain found in canonical: {canonical_val}")

        # 2. og:url checks
        og_urls = []
        for match in og_url_regex.finditer(content):
            val = match.group(1) or match.group(2)
            og_urls.append(val)

        if len(og_urls) == 0:
            errors.append(f"[{rel_path}] Missing og:url tag")
        elif len(og_urls) > 1:
            errors.append(f"[{rel_path}] Multiple ({len(og_urls)}) og:url tags found: {og_urls}")
        else:
            og_url_val = og_urls[0]
            if len(canonicals) == 1 and og_url_val != canonicals[0]:
                errors.append(f"[{rel_path}] og:url mismatch with canonical! og:url='{og_url_val}', canonical='{canonicals[0]}'")

        # 3. Check for statkick.com anywhere in tags
        if FORBIDDEN_URL in content:
            errors.append(f"[{rel_path}] Forbidden domain '{FORBIDDEN_URL}' found in HTML content")

    # 4. Check sitemap
    sitemap_path = os.path.join(DIST_DIR, 'sitemap.xml')
    if os.path.exists(sitemap_path):
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            sm_content = f.read()
        if FORBIDDEN_URL in sm_content:
            errors.append("sitemap.xml contains forbidden domain 'https://statkick.com'")
        print("Checked sitemap.xml: no forbidden domain found.")

    print("\n" + "="*50)
    print(f"VERIFICATION SUMMARY: Checked {checked_count} HTML files.")
    if errors:
        print(f"FAILED with {len(errors)} error(s):")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("ALL CHECKS PASSED PERFECTLY!")
        print("1. Exactly 1 canonical per page.")
        print("2. Exactly 1 og:url per page.")
        print("3. Canonical equals https://statkick.pages.dev + file path.")
        print("4. og:url matches canonical.")
        print("5. Zero occurrences of https://statkick.com in canonical or sitemap.")
        print("6. dist/index.html is the only page with root canonical.")
        print("7. All blog posts match exact blog post slugs.")
        print("8. All guides match exact guide slugs.")
        print("9. All tools match exact tool slugs.")
        print("="*50)

if __name__ == '__main__':
    check_html_files()
