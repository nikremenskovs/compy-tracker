import { createFetch } from "@vueuse/core";

export const useCompyFetch = createFetch({
  baseUrl: "http://localhost:5173/api/compy-gateway",
  options: {
    immediate: true,
    beforeFetch({ options }) {
      const { token } = storeToRefs(useAuthStore());
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    },
  },
  fetchOptions: {
    mode: "cors",
  },
});
