import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://vmstan.com",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
  vite: {
    build: {
      // The subset icon fonts are small enough that Vite would inline them as
      // base64, which grows the render-blocking stylesheet by a third of their
      // size. Keep them as separate files so only the CSS blocks paint.
      assetsInlineLimit: (file) => (file.endsWith(".woff2") ? false : undefined),
    },
  },
});
