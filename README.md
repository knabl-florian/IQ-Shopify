# Sleek Shopify Theme

This repository contains a customized Shopify theme based on **Sleek v2.1.0** by **FoxEcom**.

It uses Shopify's Online Store 2.0 theme architecture with Liquid templates, JSON templates, reusable sections/snippets, and static CSS/JS assets.

## Theme Details

- Theme: `Sleek`
- Version: `2.1.0`
- Author: `FoxEcom`
- Platform: `Shopify Online Store 2.0`

## Project Structure

- `layout/` - Main theme layouts such as [`theme.liquid`](/Users/hamza/Desktop/Theme_code/layout/theme.liquid) and [`password.liquid`](/Users/hamza/Desktop/Theme_code/layout/password.liquid)
- `templates/` - Page, product, collection, cart, blog, article, and customer templates
- `sections/` - Modular storefront sections used throughout the theme
- `snippets/` - Reusable Liquid partials and UI helpers
- `assets/` - Theme JavaScript, CSS, and supporting frontend files
- `config/` - Theme settings schema and store-specific theme configuration
- `locales/` - Translation files for multiple languages

Current repo size at a glance:

- `87` section files
- `126` snippet files
- `37` template files

## Notable Theme Features

Based on the current codebase, this theme includes support for:

- Multiple product page layouts
- Quick view and sticky add-to-cart behavior
- Related products and recently viewed products
- Product bundles and add-ons
- Lookbook, image comparison, and gallery sections
- Collection showcases, sliders, and promotional content blocks
- Blog, testimonials, newsletter, and store locator sections
- Localization and multilingual storefront support
- RTL support for supported languages

## Customizations Present In This Repository

This copy of the theme includes custom logic beyond the base structure:

- Custom head/body metafield output for tracking or third-party scripts in [`layout/theme.liquid`](/Users/hamza/Desktop/Theme_code/layout/theme.liquid)
- Rapid Search integration via [`snippets/rapid-search-settings.liquid`](/Users/hamza/Desktop/Theme_code/snippets/rapid-search-settings.liquid)
- A floating language selector rendered in the main layout
- Judge.me review click handling inside the main layout
- Custom form styling fix loaded from [`assets/custom-form-fix.js`](/Users/hamza/Desktop/Theme_code/assets/custom-form-fix.js)
- Additional Foxify-specific layout/components such as [`layout/theme.foxify.liquid`](/Users/hamza/Desktop/Theme_code/layout/theme.foxify.liquid)

## Requirements

To work on this theme locally, you typically need:

- A Shopify store with theme access
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli)
- A Shopify account with permission to preview or publish themes

## Local Development

Install Shopify CLI if you do not already have it, then run:

```bash
shopify theme dev
```

Useful commands:

```bash
shopify theme dev
shopify theme pull
shopify theme push
shopify theme publish
shopify theme check
```

## Common Editing Areas

- Global layout and script loading:
  [`layout/theme.liquid`](/Users/hamza/Desktop/Theme_code/layout/theme.liquid)
- Theme settings:
  [`config/settings_schema.json`](/Users/hamza/Desktop/Theme_code/config/settings_schema.json)
- Store-specific configured values:
  [`config/settings_data.json`](/Users/hamza/Desktop/Theme_code/config/settings_data.json)
- Main product experience:
  [`sections/main-product.liquid`](/Users/hamza/Desktop/Theme_code/sections/main-product.liquid)
- Header and navigation:
  [`sections/header.liquid`](/Users/hamza/Desktop/Theme_code/sections/header.liquid)
- Footer:
  [`sections/footer.liquid`](/Users/hamza/Desktop/Theme_code/sections/footer.liquid)
- Global styling:
  [`assets/theme.css`](/Users/hamza/Desktop/Theme_code/assets/theme.css)
  and [`assets/custom.css`](/Users/hamza/Desktop/Theme_code/assets/custom.css)
- Global frontend behavior:
  [`assets/theme.js`](/Users/hamza/Desktop/Theme_code/assets/theme.js)

## Deployment Notes

- Use `shopify theme push` to upload changes to a development theme.
- Use `shopify theme publish` only when the theme has been reviewed and approved.
- Avoid overwriting live store configuration without checking `config/settings_data.json` carefully.

## Recommended Workflow

1. Pull the latest theme changes from Shopify if needed.
2. Run `shopify theme dev` for local preview.
3. Make changes in sections, snippets, assets, or templates.
4. Validate with `shopify theme check`.
5. Push to a non-production theme first.
6. Publish only after QA approval.

## Notes

- This repository appears to be theme code only; no separate build system or package manager setup was found in the project root.
- Store-specific secrets, credentials, and access keys should not be committed.
- The files `1212` and `1212.pub` are present in the root and appear unrelated to core Shopify theme structure.

## Support

- FoxEcom documentation: https://docs.foxecom.com/sleek-theme
- FoxEcom support: https://help.foxecom.com/
