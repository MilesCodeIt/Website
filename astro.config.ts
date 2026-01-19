import { defineConfig } from "astro/config";
import solid from "@astrojs/solid-js";
import unocss from "unocss/astro";

export default defineConfig({
  integrations: [unocss(), solid()],
});
