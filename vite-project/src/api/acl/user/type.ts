// 账号信息的TS类型
export interface ResonseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface User {
  id?: number;
  createTime?: string;
  updateTime?: string;
  password: string;
  name: string;
  username: string;
  phone?: string;
  roleName?: string;
}
export type Records = User[];
export interface UserResponseData extends ResonseData {
  data: {
    records: Records;
    total: number;
  };
}
//一个职位的ts类型
export interface RoleData {
  id?: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark: null;
}
export type AllRole = RoleData[];
export interface AllRoleResponseData extends ResonseData {
  data: {
    assignRoles: AllRole;
    allRolesList: AllRole;
  };
}
//给已有用户分配角色时请求所携带的参数类型
export interface SetRoleData {
  roleIdList: number[];
  userId: number;
}
