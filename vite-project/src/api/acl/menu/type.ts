// 账号信息的TS类型
export interface ResonseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface Permission {
  id?: number;
  pid: number;
  type: number;
  level: number;
  createTime?: string;
  updateTime?: string;
  name: string;
  code: string;
  toCode: string;
  select: boolean;
  status: null;
  children: PermissionList;
}
export type PermissionList = Permission[];
export interface PermissionResponseData extends ResonseData {
  data: PermissionList;
}
//添加与更新菜单携带的参数的ts类型
export interface MenuParams {
  id?: number;
  code: string;
  level: number;
  name: string;
  pid: number;
}
