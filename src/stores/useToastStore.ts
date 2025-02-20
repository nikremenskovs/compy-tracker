import type { Toast } from "@/types";

export const useToastStore = defineStore("ToastStore", () => {
  const toastType = ref<Toast>("success");
  const toastText = ref("");

  const enableToast = (type: Toast, text: string) => {
    toastType.value = type;
    toastText.value = text;
  };

  return { toastType, toastText, enableToast };
});
