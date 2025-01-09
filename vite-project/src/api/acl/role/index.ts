//用户管理模块的接口
import request from "../../../utils/request";
import type {} from "../role/type";
import { RoleResponseData, Role, PermissionResponseData } from "../role/type";
enum API {
  //获取全部已有职位
  ALLROLE_URL = "/admin/acl/role/",
  //添加一个新职位
  SAVEROLE_URL = "/admin/acl/role/save",
  //添加一个新职位
  REMOVEROLE_URL = "/admin/acl/role/remove/",
  //更新已有的职位
  UPDATEROLE_URL = "/admin/acl/role/update",
  //获取所有的权限
  ALLPERMISSION_URL = "/admin/acl/permission/toAssign/",
  //给指定职位分配权限
  SETPERMISSION_URL = "/admin/acl/permission/doAssign/?",
}
//获取全部已有用户的帐号信息的接口
export const reqRoleInfo = (page: number, limit: number, rolename: string) =>
  request.get<any, RoleResponseData>(
    API.ALLROLE_URL + `${page}/${limit}/?rolename=${rolename}`
  );
//添加一个新职位的接口
export const reqAddOrUpdataRole = (data: Role) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, data);
  } else {
    return request.post<any, any>(API.SAVEROLE_URL, data);
  }
};
//根据职位id获取其权限的接口
export const reqAllMenuList = (roleId: number) =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL + roleId);
//根据职位id分配其权限的接口
export const reqSetPermisstion = (roleId: number, permissionId: number[]) =>
  request.post<any, any>(
    API.SETPERMISSION_URL + `roleId=${roleId}&permissionId=${permissionId}`
  );
//根据职位id获取其权限的接口
export const reqRemoveRole = (roleId: number) =>
  request.delete<any, any>(API.REMOVEROLE_URL + roleId);
