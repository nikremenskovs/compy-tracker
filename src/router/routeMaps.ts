import type { UserRole } from "@/types/api.ts";
import { protectedRoutes } from "@/router/routes.ts";

export const roleHomeMap: Record<UserRole, string> = {
  learner: "Learner",
  trainer: "Dashboard",
};

export const navigationMap = protectedRoutes.map((route) =>
  route.children?.length ? route.children[0].name : route.name,
);
