import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "../auth/routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    ...authRoutes,
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/HomeView.vue"),
    },
  ],
});

export default router;
