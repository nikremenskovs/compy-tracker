import { createRouter, createWebHistory } from "vue-router";
import type { UserRole } from "@/types/api.ts";
import { roleHomeMap } from "@/router/routeMaps.ts";
import routes from "@/router/routes.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const { user } = storeToRefs(useAuthStore());
  const { authorisedRoles } = to.meta as { authorisedRoles?: UserRole[] };

  if (!user.value.role && to.name !== "Login") return next({ name: "Login" });

  if (authorisedRoles && !authorisedRoles.includes(user.value.role as UserRole))
    return next({ name: "Unauthorised" });

  if (to.name === "Login" && user.value.role)
    return next({ name: roleHomeMap[user.value.role] });

  next();
});

export default router;
