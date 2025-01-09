// 账号信息的TS类型
export interface ResonseData {
  code: number;
  message: string;
  ok: boolean;
}
export interface Role {
  id: number;
  createTime?: string;
  updateTime?: string;
  roleName: string;
  remark?: string;
}
export type Records = Role[];
export interface RoleResponseData extends ResonseData {
  data: {
    records: Records;
    total: number;
  };
}

export interface Permission {
  id: number;
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
