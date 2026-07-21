# Virtually Benevolent

The static source for [vmstan.com](https://vmstan.com), built with Astro and deployed as Cloudflare Workers Static Assets.

## Write and preview

Posts live in `src/content/posts` and pages live in `src/content/pages`. Each file is plain Markdown with validated frontmatter.
Node.js 24 and pnpm 11 are required.

```sh
pnpm install
pnpm dev
```

Run the production checks and build with:

```sh
pnpm build
```

## Publish

GitHub Actions deploys the `blog` Worker to Cloudflare whenever a commit is
pushed to `main`. Configure these repository secrets under **Settings → Secrets
and variables → Actions**:

- `CLOUDFLARE_API_TOKEN` — a token scoped to the target account with permission
  to edit Cloudflare Workers

The deployment workflow installs the locked dependencies, runs the complete Astro
check and production build, and deploys with the repository's pinned Wrangler
version. Wrangler infers the account from the scoped API token. Other branches do
not deploy.

## Cloudflare caching

This site deliberately uses Workers Static Assets without a Worker script. Cloudflare
serves the generated HTML, CSS, JavaScript, images, RSS feed, and sitemap directly
from its edge network, and static asset requests do not incur Workers invocation
charges.

Do not enable the newer Workers Cache merely to wrap these files. Workers Cache is
designed to sit in front of a Worker that renders, transforms, or fetches a reusable
response. Forcing static assets through such a Worker would make those requests
billable without avoiding any meaningful computation.

If a cacheable dynamic route is added later—for example an image transformer,
server-rendered search, or a third-party API proxy—enable Workers Cache for that
Worker entrypoint with `"cache": { "enabled": true }` and return an explicit public
`Cache-Control` header. Keep the static blog routes on the asset-first path.

## Re-run the Ghost migration

The raw Ghost export must remain outside the repository because it contains staff and site configuration data. The importer refuses to replace existing Markdown unless `--force` is supplied.

```sh
pnpm import:ghost -- /absolute/path/to/export.json --download-images
```

Add `--force` only when intentionally regenerating all imported Markdown. Once posts have been edited by hand, treat the generated Markdown as the source of truth rather than re-running the importer.
