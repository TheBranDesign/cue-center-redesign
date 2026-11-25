# WordPress Implementation Guide – CUE Center for Missing Persons

This redesign preserves the **sector-based homepage layout**, brand colors, logos, photography, navigation, and contact details from [ncmissingpersons.org](https://ncmissingpersons.org/), while modernizing responsiveness, accessibility, visual hierarchy, and missing-person sector discovery.

## Files Included
- `index.html` – Semantic homepage markup with all original `ncmissingpersons.org` links, images, and contact info.
- `styles.css` – Responsive CSS using CUE's signature palette (`#C4121F` crimson red, `#0C0C0E` jet black, `#FCDEAF` warm heritage peach, `#E0A82E` gold).
- `script.js` – Lightweight vanilla JavaScript for the hero slider, expandable search bar, mobile drawer, and 24/7 contact modal.

## How to Apply to WordPress

### Option A: Custom Page Template (`front-page.php`) in a Child Theme (Recommended)
1. Copy `styles.css` and `script.js` into your active child theme directory (e.g. `wp-content/themes/highend-child/assets/`).
2. Enqueue them in `functions.php` (only on `is_front_page()`).
3. Place the `<main>` sections from `index.html` into `front-page.php` between `get_header()` and `get_footer()`, or use the full header/footer markup if replacing the theme header/footer on the homepage.

### Option B: WordPress Block Editor / Custom HTML Block
1. Create a new Page in WordPress using a **Full Width / No Sidebar** template.
2. Paste the `<main>` HTML sections into a **Custom HTML** block (or split each sector into its own Custom HTML / Group block for easy future edits).
3. Add the contents of `styles.css` under **Appearance → Customize → Additional CSS**.
4. Enqueue `script.js` via your theme or a lightweight header/footer scripts plugin.

## Key Improvements Over the Current Homepage
- **Preserved 6-Sector Program Band**: Uniform circular emblem rings with crisp labels and hover states (including fixing the rectangular HRD logo framing).
- **Prominent Missing Persons Sectors & Search**: Surfaced all 7 regional/specialized case sectors (*West Coast, South, Midwest, Northeast, International, Unidentified, Unsolved Homicides*) + *Submit a Tip* directly on the homepage alongside an inline case search bar.
- **24-Hour Helpline Visibility**: Placed `910-232-1687` in the top utility bar, urgent action strip, footer, and floating contact widget.
- **Balanced Sponsor Grid**: Aligned all 16 community & corporate sponsor logos in clean, uniform white cards.
