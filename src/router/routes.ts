import type { RouteRecordRaw } from "vue-router";
import LoginLayout from "@/layouts/LoginLayout.vue";
import AuthorisedLayout from "@/layouts/AuthorisedLayout.vue";

const baseRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
    meta: { layout: LoginLayout },
  },
  {
    path: "/unauthorised",
    name: "Unauthorised",
    component: () => import("@/views/UnauthorisedView.vue"),
    meta: { layout: AuthorisedLayout },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
    meta: { layout: AuthorisedLayout },
  },
];

export const protectedRoutes: RouteRecordRaw[] = [
  {
    path: "/dashboard",
    name: "",
    component: () => import("@/views/DashboardView.vue"),
    meta: {
      layout: AuthorisedLayout,
      authorisedRoles: ["trainer"],
    },
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () => import("@/components/DashboardTable.vue"),
        meta: {
          description:
            "View all learners, their competency scores, and submit new scores",
        },
      },
      {
        path: ":learnerId",
        name: "Learner Detail",
        component: () => import("@/components/DashboardDetail.vue"),
        beforeEnter: (to, from, next) =>
          !from.name ? next({ name: "Dashboard" }) : next(),
      },
    ],
  },
  {
    path: "/learner",
    name: "",
    component: () => import("@/views/LearnerView.vue"),
    meta: {
      layout: AuthorisedLayout,
      authorisedRoles: ["learner"],
    },
    children: [
      {
        path: "",
        name: "Learner",
        component: () => import("@/components/LearnerCompetencies.vue"),
        meta: {
          description:
            "View your competencies and score yourself with a rating of 1 to 5 for each",
        },
      },
      {
        path: ":competencyId",
        name: "Competency Detail",
        component: () => import("@/components/LearnerDetail.vue"),
      },
    ],
  },
  {
    path: "/help",
    name: "Help",
    component: () => import("@/views/HelpView.vue"),
    meta: {
      layout: AuthorisedLayout,
      authorisedRoles: ["learner", "trainer"],
    },
  },
];

const routes = [...baseRoutes, ...protectedRoutes];

export default routes;
