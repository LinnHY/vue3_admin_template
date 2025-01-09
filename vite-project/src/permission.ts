import router from "./router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import pinia from "./store";
import setting from "./setting";
import useUserStore from "./store/modules/user.ts";

let userStore = useUserStore(pinia);
router.beforeEach(async (to: any, from: any, next: any) => {
  nprogress.start();
  document.title = `${setting.title} - ${to.meta.title}`;
  if (userStore.token) {
    console.log("userStore.token=", userStore.token);
    console.log("to.path=", to.path);

    //用户已登录，直接放行
    if (to.path == "/login") {
      next();
    } else {
      if (userStore.username) {
        console.log("userStore.username=", userStore.username);
        console.log("to.path=", to.path);
        next();
      } else {
        console.log("userStore.username=", userStore.username);
        console.log("to.path=", to.path);
        try {
          await userStore.userInfo();
          next();
        } catch (error: any) {
          try {
            await userStore.userLogout();
          } catch (logoutError: any) {
            console.error("Failed to logout:", logoutError.message);
          }
          console.log(error.message);
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    if (to.path == "/login") {
      next();
    } else {
      // 用户未登录，重定向到login
      next({ path: "/login", query: { redirect: to.path } });
    }
  }
});
router.afterEach((to: any, from: any, next: any) => {
  nprogress.done();
});
