//用户管理模块的接口
import request from "../../../utils/request";
import type { PermissionResponseData, MenuParams } from "../menu/type";
enum API {
  ALLPERMISSTION_URL = "/admin/acl/permission",
  ADDMENU_URL = "/admin/acl/permission/save",
  UPDATEMENU_URL = "/admin/acl/permission/update",
  DELETEMENU_URL = "/admin/acl/permission/remove/",
}
//获取全部已有职位
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSTION_URL);
//添加与更新菜单的方法
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEMENU_URL, data);
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data);
  }
};
//删除一个已有的菜单
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id);
