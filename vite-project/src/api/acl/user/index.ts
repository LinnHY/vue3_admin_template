//用户管理模块的接口
import request from "../../../utils/request";
import type {
  UserResponseData,
  AllRoleResponseData,
  SetRoleData,
} from "./type";
import { User } from "./type";
enum API {
  //获取全部已有用户的帐号信息
  ALLUSER_URL = "/admin/acl/user/",
  //添加一个新用户信息
  ADDUSER_URL = "/admin/acl/user/save",
  //更新已有用户的信息
  UPDATEUSER_URL = "/admin/acl/user/save",
  //获取所有职位
  ALLROLE_URL = "/admin/acl/user/toAssign/",
  //给已有角色分配职位
  SETROLE_URL = "/admin/acl/user/doAssignRole",
  //删除一个帐号
  DELETEUSER_URL = "/admin/acl/user/remove/",
  //批量删除多个帐号
  DELETEMULTIUSER_URL = "/admin/acl/user/batchRemove",
}
//获取全部已有用户的帐号信息的接口
export const reqUserInfo = (page: number, limit: number, username: string) =>
  request.get<any, UserResponseData>(
    API.ALLUSER_URL + `${page}/${limit}/?username=${username}`
  );
//添加与更新用户信息的接口
export const reqAddOrUpdateUserInfo = (data: User) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEUSER_URL, data);
  } else {
    return request.post<any, any>(API.ADDUSER_URL, data);
  }
};
//获取全部职位以及当前用户的职位
export const reqAllRole = (userId: number) =>
  request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId);

//给已有角色分配职位
export const reqSetUserRole = (data: SetRoleData) =>
  request.post<any, any>(API.SETROLE_URL, data);
//删除某个帐号
export const reqRemoveUser = (userId: number) =>
  request.delete<any, any>(API.DELETEUSER_URL + userId);
//批量删除帐号
export const reqRemoveMultiUser = (idList: number[]) =>
  request.delete<any, any>(API.DELETEMULTIUSER_URL, { data: idList });
