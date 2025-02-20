import { createApp } from "vue";
import { createPinia } from "pinia";
import vuetify from "@/plugins/vuetify";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

import App from "./App.vue";
import router from "./router";

async function prepareApp() {
  if (import.meta.env.MODE === "development") {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: (req, print) => {
        const ignoredPaths = ["/src/", "/node_modules/", ".vue", "fonts"];

        if (ignoredPaths.some((path) => req.url.includes(path))) return;

        print.warning();
      },
    });
  }
}

const app = createApp(App);

app.use(vuetify);
app.use(createPinia());
app.use(router);

prepareApp().then(() => {
  app.mount("#app");
});
