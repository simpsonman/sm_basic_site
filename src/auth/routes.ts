import { RouteRecordRaw } from "vue-router";

export const authRoutes: RouteRecordRaw[] = [
  {
    path: "/auth",
    component: () => import("./layouts/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("./views/LoginView.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("./views/RegisterView.vue"),
      },
    ],
  },
];
