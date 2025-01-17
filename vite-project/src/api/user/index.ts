/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-19 17:15:57
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-23 21:32:57
 */
// 统一管理用户相关接口
import request from "../../utils/request";
import type {
  LoginFormData,
  LoginResponseData,
  userInfoResponseData,
} from "./type";

enum API {
  LOGIN_URL = "/user/login",
  USERINFO_URL = "/user/info",
  LOGOUT_URL = "/admin/acl/index/logout",
}

export const reqLogin = (data: LoginFormData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data);

export const reqUserInfo = (token: any) =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL, token);

export const reqLogOut = () => request.post<any, any>(API.LOGOUT_URL);
