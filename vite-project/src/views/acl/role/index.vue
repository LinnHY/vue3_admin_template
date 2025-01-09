<template>
  <div>
    <el-card style="width: 1600px">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名">
          <el-input placeholder="搜索用户名" v-model="searchInput"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="default"
            :disabled="searchInput ? false : true"
            @click="searchRoleName()"
            >搜索</el-button
          >
          <el-button type="primary" size="default" @click="refreshSearchInput()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0px; width: 1600px">
      <el-button type="primary" size="default" @click="addRole()"
        >添加角色</el-button
      >
      <el-table style="margin: 10px 0px" border :data="roleArr">
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column
          label="角色名称"
          align="center"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
        ></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="User"
              @click="assignRole(row)"
              >分配权限</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editRoleName(row)"
              >编辑名称</el-button
            >
            <el-popconfirm
              :title="`你确定要删除${row.roleName}职位吗?`"
              @confirm="removeRole(row)"
            >
              <template #reference>
                <el-button type="primary" size="small" icon="Delete"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[5, 7, 9, 11]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @current-change="getHasRole"
        @size-change="getHasRole"
      />
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="form.id ? '修改角色' : '添加角色'"
      width="500"
    >
      <el-form :model="form">
        <el-form-item label="角色名字" label-width="140px">
          <el-input v-model="form.roleName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAddRole()"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
    <!--针对每个职位分配权限的抽屉组件-->
    <el-drawer v-model="drawer2">
      <template #header>
        <h4>分配权限</h4>
      </template>
      <template #default>
        <div>
          <el-tree
            ref="tree"
            v-if="data.length"
            style="max-width: 600px"
            :data="data"
            show-checkbox
            node-key="id"
            default-expand-all
            :default-checked-keys="filterArr"
            :props="defaultProps"
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer2 = false">取消</el-button>
          <el-button type="primary" @click="confirmAssign">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import {
  reqRoleInfo,
  reqAddOrUpdataRole,
  reqAllMenuList,
  reqSetPermisstion,
  reqRemoveRole,
} from "../../../api/acl/role/index";
import {
  Records,
  RoleResponseData,
  Role,
  PermissionList,
  PermissionResponseData,
} from "../../../api/acl/role/type";
let currentPage4 = ref<number>(1);
const drawer2 = ref<boolean>(false);
let pageSize4 = ref<number>(7);
let dialogFormVisible = ref<boolean>(false);
let roleArr = ref<Records>([]);
const searchInput = ref<string>("");
let total = ref<number>(0);
const currentRoleId = ref<number>(0);
const filterArr = ref([]);
const tree = ref<any>();
const defaultProps = {
  children: "children",
  label: "name",
};
const data = ref<PermissionList>([]);
const form = reactive<Role>({
  id: 0,
  roleName: "",
});
const refreshSearchInput = () => {
  searchInput.value = "";
};
const searchRoleName = () => {};
//user组件一挂载完毕就请求一次user数据
onMounted(() => {
  getHasRole();
});
const getHasRole = async () => {
  let res: RoleResponseData = await reqRoleInfo(
    currentPage4.value,
    pageSize4.value,
    searchInput.value
  );
  total.value = res.data.total;
  roleArr.value = res.data.records;
};
const addRole = () => {
  Object.assign(form, { id: "", roleName: "", authority: "" });
  dialogFormVisible.value = true;
};
const confirmAddRole = async () => {
  let result: any = await reqAddOrUpdataRole(form);
  if (result.code == 200) {
    getHasRole();
    ElMessage({ type: "success", message: "添加成功" });
  } else {
    ElMessage({ type: "error", message: "添加失败" });
  }
  dialogFormVisible.value = false;
};
const assignRole = async (row: any) => {
  currentRoleId.value = row.id;
  let result: PermissionResponseData = await reqAllMenuList(row.id);
  if (result.code == 200) {
    data.value = result.data;
    filterArr.value = filterSelection(data.value, []);
    drawer2.value = true;
  } else {
    ElMessage({ type: "error", message: "获取菜单失败" });
  }
};
const filterSelection = (data: any, filterArr: any) => {
  data.forEach((element: any) => {
    if (element.children.length) {
      filterSelection(element.children, filterArr);
    } else {
      if (element.select) {
        filterArr.push(element.id);
      }
    }
  });
  return filterArr;
};
const editRoleName = (row: any) => {
  Object.assign(form, row);
  dialogFormVisible.value = true;
};
const removeRole = async (row: any) => {
  let result: any = await reqRemoveRole(row.id);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "删除成功" });
    getHasRole();
  } else {
    ElMessage({ type: "error", message: "删除失败" });
  }
};
const confirmAssign = async () => {
  //被选中的叶子节点
  let checkedLeftArr = tree.value.getCheckedKeys();
  //选中的非叶子节点
  let halfCheackedArr = tree.value.getHalfCheckedKeys();
  let permissionId = checkedLeftArr.concat(halfCheackedArr);

  let result: any = await reqSetPermisstion(currentRoleId.value, permissionId);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "分配成功" });
    window.location.reload();
  } else {
    ElMessage({ type: "error", message: "分配失败" });
  }
  drawer2.value = false;
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
