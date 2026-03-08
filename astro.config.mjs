import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import indexNow from "./src/integrations/indexnow.ts";

export default defineConfig({
  site: process.env.SITE_URL || "https://hvacaudit.co",
  integrations: [indexNow()],
  vite: {
    plugins: [tailwindcss()],
  },
});
