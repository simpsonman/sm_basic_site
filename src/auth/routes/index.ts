import type { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    component: () => import("../layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        redirect: { name: "auth-login" },
      },
      {
        path: "login",
        name: "auth-login",
        component: () => import("../views/LoginView.vue"),
      },
    ],
  },
];
