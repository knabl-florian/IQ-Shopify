# IQ Dogsport – Shopify Theme

This repository is used to track Shopify theme changes, compare versions, document deployments, and maintain a history of website updates.

## Shopify Theme References

| Theme | Shopify Theme ID | Purpose |
|---|---|---|
| IQ – live (previous version) | `202725884168` | Original published theme before Patricia's changes |
| Copy for Patricia | `202987798792` | Source theme containing Patricia's changes |
| Copy of IQ – live | `203453235464` | Updated theme receiving the selected changes; subsequently published |

## GitHub Branches

| Branch | Description |
|---|---|
| `shopify-live-direct` | Original live-theme baseline, subsequently updated with Patricia's changes |
| `shopify-patricia-direct` | Snapshot of Patricia's Shopify theme |
| `main` | Existing historical repository branch; not used for this release |
| `Staging` | Existing branch; not used for this release |

### Important Commits

- `d8b8016` – Original Shopify live-theme snapshot
- `7cec49c` – Patricia theme snapshot
- Pull Request **#3** – Comparison and merge of Patricia's changes into `shopify-live-direct`

The original live version can still be located through commit `d8b8016`.

---

## Release History

### 2026-10-14 – Patricia Theme Update

**Status:** Published to Shopify; functional verification pending.

**GitHub reference:** Pull Request #3

**Files changed:** 66

- 35 modified files
- 31 new files

### Changes Included

**1. Collection Pages**
- Updated collection layouts and product grids.
- Adjusted desktop product-column settings on selected collections.
- Modified filtering and product-loading behavior.
- Added or reorganized category content sections.

**2. Product Cards**
- Updated product-title presentation.
- Modified product-card styling and spacing.
- Adjusted rating and price presentation.
- Added a new product-title snippet.

**3. Shopping Cart**
- Added support for recommended products in the cart.
- Introduced configurable cart add-on settings.
- Updated cart-related snippets and sections.

**4. Collection Content and Navigation**
- Added new knowledge, story and video sections.
- Added FAQ content support.
- Updated collection-navigation components.
- Added product navigation/jump links.

**5. Homepage and Additional Sections**
- Reorganized selected homepage sections.
- Added reusable theme sections and snippets.
- Added a K9 discount-information section.

**6. Translations**
- Added new German and English cart-related text.
- Further translation verification is required.

### Deployment Method

1. Downloaded the original published Shopify theme.
2. Downloaded Patricia's Shopify theme separately.
3. Created independent GitHub snapshots.
4. Compared both versions using GitHub Pull Request #3.
5. Identified the 66 changed files.
6. Uploaded the selected files to a duplicate of the live Shopify theme using Shopify CLI.
7. Published the updated Shopify theme.

The existing historical `main` and `Staging` branches were not used for this deployment.


## Future Theme Update Workflow

For every new release:

1. Capture the current published Shopify theme.
2. Create a Git branch or snapshot.
3. Compare changes using a GitHub pull request.
4. Document the changes and any known issues.
5. Test modifications in an unpublished Shopify theme.
6. Publish only after approval.
7. Record the release date, theme ID, pull request and commit reference.

**Note:** GitHub and Shopify are not automatically synchronized. GitHub commits and merges do not deploy changes to the live store.
