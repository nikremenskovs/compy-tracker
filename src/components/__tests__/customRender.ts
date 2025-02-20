import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import { render, type RenderOptions } from "@testing-library/vue";
import { createPinia } from "pinia";

const vuetify = createVuetify({ components, directives });
const pinia = createPinia();

global.ResizeObserver = require("resize-observer-polyfill");

export function customRender(component: any, options: RenderOptions<any> = {}) {
  return render(component, {
    ...options,
    global: {
      plugins: [vuetify, pinia],
      ...(options.global || {}),
    },
  });
}
