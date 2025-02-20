import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vuetify from "vite-plugin-vuetify";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    AutoImport({
      dts: "src/auto-imports.d.ts",
      imports: ["vue", "vue-router", "@vueuse/core", "@vueuse/math", "pinia"],
      dirs: ["src/stores", "src/composables", "src/config"],
      vueTemplate: true,
    }),
    Components({ dts: true }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
