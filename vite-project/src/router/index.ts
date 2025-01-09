import { createRouter, createWebHashHistory } from "vue-router";
import { constantRoutes } from "./routes.ts";

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

export default router;
