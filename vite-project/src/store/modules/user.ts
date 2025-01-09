import { constantRoutes } from "../../router/routes";
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo, reqLogOut } from "../../api/user";

import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "../../utils/token";

let useUserStore = defineStore("userStore", {
  state: () => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoutes,
      username: "",
      avatar: "",
      buttons: [],
    };
  },
  actions: {
    //用户登录方法
    async userLogin(data: any) {
      const res: any = await reqLogin(data);
      console.log("res=", res);

      // success=>token
      // error=>error.message
      if (res.code === 200) {
        this.token = res.data.token;
        // 持久化
        SET_TOKEN(res.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(res.data));
      }
    },
    async userInfo() {
      let result = await reqUserInfo(GET_TOKEN());
      console.log("result=", result);
      if (result.code == 200) {
        this.username = result.data.checkUser.username;
        this.avatar = result.data.checkUser.avatar;
        this.token = GET_TOKEN();
        return "获取用户信息成功";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async userLogout() {
      let result = await reqLogOut();
      if (result.code == 200) {
        this.token = "";
        this.username = "";
        this.avatar = "";
        REMOVE_TOKEN();
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
});
export default useUserStore;
