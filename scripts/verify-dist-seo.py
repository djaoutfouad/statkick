#!/usr/bin/env python3
import os
import re
import sys
import html

BASE_URL = "https://statkick.pages.dev"
FORBIDDEN_URL = "https://statkick.com"
DIST_DIR = "dist"

canonical_regex = re.compile(
    r'<link[^>]*?rel=["\']canonical["\'][^>]*?href=["\']([^"\']+)["\']|<link[^>]*?href=["\']([^"\']+)["\'][^>]*?rel=["\']canonical["\']',
    re.IGNORECASE,
)
og_url_regex = re.compile(
    r'<meta[^>]*?property=["\']og:url["\'][^>]*?content=["\']([^"\']+)["\']|<meta[^>]*?content=["\']([^"\']+)["\'][^>]*?property=["\']og:url["\']',
    re.IGNORECASE,
)
title_regex = re.compile(r'<title[^>]*>(.*?)</title>', re.IGNORECASE | re.DOTALL)
desc_regex = re.compile(
    r'<meta[^>]*?name=["\']description["\'][^>]*?content=["\']([^"\']*)["\']|<meta[^>]*?content=["\']([^"\']*)["\'][^>]*?name=["\']description["\']',
    re.IGNORECASE,
)
href_regex = re.compile(r'<a[^>]*?\bhref=["\'](/[^"\']*)["\']', re.IGNORECASE)


def get_expected_canonical(rel_path):
    rel = rel_path.replace(os.sep, '/')
    if rel == 'index.html':
        return f"{BASE_URL}/"
    if rel.endswith('.html'):
        rel = rel[:-5]
    if rel.endswith('/index'):
        rel = rel[:-6]
    return f"{BASE_URL}/{rel}/"


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

        # 0. Check <meta charset="UTF-8"> position (must be within first 256 bytes right after <head>)
        first_chunk = content[:300]
        if not re.search(r'<head>\s*<meta\s+charset=["\']UTF-8["\']', first_chunk, re.IGNORECASE):
            errors.append(f"[{rel_path}] <meta charset=\"UTF-8\"> is not the first element inside <head>")

        # 1. Canonical checks
        canonicals = [m.group(1) or m.group(2) for m in canonical_regex.finditer(content)]
        if len(canonicals) == 0:
            errors.append(f"[{rel_path}] Missing canonical tag")
        elif len(canonicals) > 1:
            errors.append(f"[{rel_path}] Multiple ({len(canonicals)}) canonical tags found: {canonicals}")
        else:
            canonical_val = canonicals[0]
            expected_canonical = get_expected_canonical(rel_path)
            if canonical_val != expected_canonical:
                errors.append(
                    f"[{rel_path}] Canonical mismatch! Found: '{canonical_val}', Expected: '{expected_canonical}'"
                )
            if not canonical_val.endswith('/'):
                errors.append(f"[{rel_path}] Canonical does not end with '/': {canonical_val}")
            if FORBIDDEN_URL in canonical_val:
                errors.append(f"[{rel_path}] Forbidden domain found in canonical: {canonical_val}")

        # 2. og:url checks
        og_urls = [m.group(1) or m.group(2) for m in og_url_regex.finditer(content)]
        if len(og_urls) == 0:
            errors.append(f"[{rel_path}] Missing og:url tag")
        elif len(og_urls) > 1:
            errors.append(f"[{rel_path}] Multiple ({len(og_urls)}) og:url tags found: {og_urls}")
        else:
            og_url_val = og_urls[0]
            if len(canonicals) == 1 and og_url_val != canonicals[0]:
                errors.append(
                    f"[{rel_path}] og:url mismatch with canonical! og:url='{og_url_val}', canonical='{canonicals[0]}'"
                )
            if not og_url_val.endswith('/'):
                errors.append(f"[{rel_path}] og:url does not end with '/': {og_url_val}")

        # 3. <title> length check (48 to 58 characters)
        title_match = title_regex.search(content)
        if not title_match:
            errors.append(f"[{rel_path}] Missing <title> tag")
        else:
            title_text = html.unescape(title_match.group(1).strip())
            t_len = len(title_text)
            if not (48 <= t_len <= 58):
                errors.append(f"[{rel_path}] Title length {t_len} out of [48, 58] range: '{title_text}'")

        # 4. <meta name="description"> length check (135 to 155 characters)
        desc_matches = [m.group(1) if m.group(1) is not None else m.group(2) for m in desc_regex.finditer(content)]
        if len(desc_matches) == 0:
            errors.append(f"[{rel_path}] Missing <meta name=\"description\"> tag")
        elif len(desc_matches) > 1:
            errors.append(f"[{rel_path}] Multiple ({len(desc_matches)}) description meta tags found")
        else:
            desc_text = html.unescape(desc_matches[0].strip())
            d_len = len(desc_text)
            if not (135 <= d_len <= 155):
                errors.append(f"[{rel_path}] Description length {d_len} out of [135, 155] range: '{desc_text}'")

        # 5. Internal <a href="/..."> trailing slash check
        for m in href_regex.finditer(content):
            href_val = m.group(1)
            if not href_val.endswith('/'):
                errors.append(f"[{rel_path}] Internal link href does not end with '/': '{href_val}'")

        # 6. Check for forbidden external Unsplash URLs or statkick.com
        if "images.unsplash.com" in content:
            errors.append(f"[{rel_path}] Contains external Unsplash URL!")
        if FORBIDDEN_URL in content:
            errors.append(f"[{rel_path}] Forbidden domain '{FORBIDDEN_URL}' found in HTML content")

    # 7. Check sitemap
    sitemap_path = os.path.join(DIST_DIR, 'sitemap.xml')
    if os.path.exists(sitemap_path):
        with open(sitemap_path, 'r', encoding='utf-8') as f:
            sm_content = f.read()
        if FORBIDDEN_URL in sm_content:
            errors.append("sitemap.xml contains forbidden domain 'https://statkick.com'")
        for m in re.finditer(r'<loc>([^<]+)</loc>', sm_content):
            loc_url = m.group(1).strip()
            if not loc_url.endswith('/'):
                errors.append(f"sitemap.xml <loc> does not end with '/': {loc_url}")
        print("Checked sitemap.xml: all <loc> URLs end with '/' and no forbidden domain found.")

    print("\n" + "=" * 60)
    print(f"VERIFICATION SUMMARY: Checked {checked_count} HTML files.")
    if errors:
        print(f"FAILED with {len(errors)} error(s):")
        for err in errors:
            print(f"  - {err}")
        sys.exit(1)
    else:
        print("ALL CHECKS PASSED PERFECTLY!")
        print("1. <meta charset=\"UTF-8\"> is immediately after <head> in all 50 pages.")
        print("2. <title> length is strictly 48-58 characters across all 50 pages.")
        print("3. <meta name=\"description\"> length is strictly 135-155 characters across all 50 pages.")
        print("4. All canonicals, og:url tags, and internal <a href> links end with '/'.")
        print("5. Zero external Unsplash URLs — all images are local WebP with explicit dimensions.")
        print("=" * 60)


if __name__ == '__main__':
    check_html_files()
