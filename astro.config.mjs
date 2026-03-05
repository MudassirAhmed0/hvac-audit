import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.SITE_URL || "https://hvac-audit.vercel.app",
  integrations: [],
  vite: {
    plugins: [tailwindcss()],
  },
});
