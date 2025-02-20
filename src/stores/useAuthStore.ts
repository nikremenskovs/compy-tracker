import type { LoginResponse, User, UserRole } from "@/types/api.ts";
import { useCookies } from "@vueuse/integrations/useCookies";
import { roleHomeMap } from "@/router/routeMaps.ts";

export const useAuthStore = defineStore("AuthStore", () => {
  const { enableToast } = useToastStore();
  const cookies = useCookies();
  const router = useRouter();

  const token = ref<string | null>(cookies.get("compy_tracker_token") || null);

  const user = ref<User>({
    id: 0,
    name: "",
    email: "",
    role: "" as UserRole,
  });

  if (token.value) {
    user.value = JSON.parse(atob(token.value));
  }

  const userFirstName = computed(() => user.value.name?.split(" ")[0]);

  const navigateHome = async () => {
    await router.replace({
      name: roleHomeMap[user.value.role as UserRole],
    });
  };

  const loginUser = async () => {
    const { data, error } = await useCompyFetch("/login")
      .post({
        name: user.value.name,
        role: user.value.role,
      })
      .json<LoginResponse>();

    if (error.value)
      return enableToast("error", "Login failed. Please try again.");

    cookies.set("compy_tracker_token", data.value);

    await navigateHome();
  };

  const logoutUser = async () => {
    token.value = null;
    user.value = {} as User;
    cookies.remove("compy_tracker_token");
    await router.replace({ name: "Login" });
  };

  return { user, userFirstName, token, loginUser, logoutUser, navigateHome };
});
