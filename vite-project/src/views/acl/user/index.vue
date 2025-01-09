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
            @click="searchUserName()"
            >搜索</el-button
          >
          <el-button type="primary" size="default" @click="refreshSearchInput()"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0px; width: 1600px">
      <el-button type="primary" size="default" @click="addUser"
        >添加用户</el-button
      >
      <el-button type="danger" size="default" @click="removeMultiUser()"
        >批量删除</el-button
      >
      <el-table
        style="margin: 10px 0px"
        border
        :data="userArr"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" align="center" prop="id"></el-table-column>
        <el-table-column
          label="用户名字"
          align="center"
          prop="name"
        ></el-table-column>
        <el-table-column
          label="用户名称"
          align="center"
          prop="username"
        ></el-table-column>
        <el-table-column
          label="用户角色"
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
              >分配角色</el-button
            >
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editUser(row)"
              >编辑</el-button
            >

            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="removeUser(row.id)"
              >删除</el-button
            >
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
        @current-change="getHasUser"
        @size-change="getHasUser"
      />
      <el-drawer v-model="drawer">
        <template #header>
          <h4>{{ userParams.id ? "更新用户" : "添加用户" }}</h4>
        </template>
        <template #default>
          <el-form :model="userParams" prop="name" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="name">
              <el-input
                placeholder="请输入用户姓名"
                v-model="userParams.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="username">
              <el-input
                placeholder="请输入用户昵称"
                v-model="userParams.username"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="用户密码"
              prop="password"
              v-if="!userParams.id"
            >
              <el-input
                placeholder="请输入用户密码"
                v-model="userParams.password"
              ></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
          </div>
        </template>
      </el-drawer>
      <el-drawer v-model="drawer2">
        <template #header>
          <h4>分配角色用户</h4>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input :placeholder="userParams.username" disabled></el-input>
            </el-form-item>
            <el-form-item label="角色列表">
              <el-checkbox
                v-model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              >
                全选
              </el-checkbox>
              <el-checkbox-group
                v-model="checkedRoles"
                @change="handleCheckedRolesChange"
              >
                <el-checkbox
                  v-for="role in allRoles"
                  :key="role.id"
                  :label="role.roleName"
                  :value="role"
                >
                  {{ role.roleName }}
                </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button @click="drawer2 = false">取消</el-button>
            <el-button type="primary" @click="confirmSet">确定</el-button>
          </div>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import {
  reqUserInfo,
  reqAddOrUpdateUserInfo,
  reqAllRole,
  reqSetUserRole,
  reqRemoveUser,
  reqRemoveMultiUser,
} from "../../../api/acl/user/index";
import {
  UserResponseData,
  Records,
  User,
  AllRoleResponseData,
  AllRole,
  SetRoleData,
} from "../../../api/acl/user/type";
import { ElMessage } from "element-plus";
let currentPage4 = ref<number>(1);
let pageSize4 = ref<number>(7);
let total = ref<number>(0);
let userArr = ref<Records>([]);
let drawer = ref<boolean>(false);
let drawer2 = ref<boolean>(false);
const searchInput = ref<string>("");
let userParams = reactive<User>({
  password: "",
  name: "",
  username: "",
});
let multipleSelection = ref<number[]>([]);
let formRef = ref<any>();
//user组件一挂载完毕就请求一次user数据
onMounted(() => {
  getHasUser();
});
const getHasUser = async () => {
  let res: UserResponseData = await reqUserInfo(
    currentPage4.value,
    pageSize4.value,
    searchInput.value
  );
  total.value = res.data.total;
  userArr.value = res.data.records;
};
const addUser = async () => {
  drawer.value = true;
  Object.assign(userParams, { id: 0, password: "", name: "", username: "" });
  formRef?.value?.clearValidate();
};

const editUser = async (row: User) => {
  Object.assign(userParams, row);
  drawer.value = true;
  console.log("row=", row);

  formRef?.value?.clearValidate();
};
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val.map((role) => role.id) as number[];
  console.log("multipleSelection.value=", multipleSelection.value);
};
const searchUserName = () => {
  getHasUser();
};
const save = async () => {
  // 得先确定表单校验通过才能发请求
  await formRef.value.validate();
  let result: any = await reqAddOrUpdateUserInfo(userParams);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: userParams.id ? "更新成功" : "添加成功",
    });
    getHasUser();
    window.location.reload();
  } else {
    ElMessage({
      type: "error",
      message: userParams.id ? "更新失败" : "添加失败",
    });
  }
  drawer.value = false;
};
const validatorusername = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户名字至少五位"));
  }
};
const validatorName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户姓名至少五位"));
  }
};
const validatorPassword = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 5) {
    callBack();
  } else {
    callBack(new Error("用户密码至少五位"));
  }
};
const rules = {
  username: [{ required: true, trigger: "blur", validator: validatorusername }],
  name: [{ required: true, trigger: "blur", validator: validatorName }],
  password: [{ required: true, trigger: "blur", validator: validatorPassword }],
};
const assignRole = async (row: any) => {
  Object.assign(userParams, row);

  let result: AllRoleResponseData = await reqAllRole(row.id);
  if (result.code == 200) {
    allRoles.value = result.data.allRolesList;
    checkedRoles.value = result.data.assignRoles;
    drawer2.value = true;
  }
};

const removeMultiUser = async () => {
  let result: any = await reqRemoveMultiUser(multipleSelection.value);
  if (result.code == 200) {
    getHasUser();
    ElMessage({ type: "success", message: "删除成功" });
  } else {
    ElMessage({ type: "error", message: "删除失败" });
  }
};
const removeUser = async (userId: number) => {
  let result: any = await reqRemoveUser(userId);
  if (result.code == 200) {
    getHasUser();
    ElMessage({ type: "success", message: "删除成功" });
  } else {
    ElMessage({ type: "error", message: "删除失败" });
  }
};

const confirmSet = async () => {
  let roleIdList = checkedRoles.value.map((role: any) => role.id);
  let data: SetRoleData = {
    roleIdList: roleIdList as number[],
    userId: userParams.id as number,
  };
  let result: any = await reqSetUserRole(data);
  if (result.code == 200) {
    getHasUser();
    ElMessage({ type: "success", message: "分配成功" });
  } else {
    ElMessage({ type: "error", message: "分配失败" });
  }
  drawer2.value = false;
};
const checkAll = ref<boolean>(false);
const allRoles = ref<AllRole>([]);
const isIndeterminate = ref<boolean>(false);
const checkedRoles = ref<any>([]);
const handleCheckAllChange = (val: any) => {
  console.log("val=", val);
  checkedRoles.value = val ? [...allRoles.value] : [];
  isIndeterminate.value = false;
};
const handleCheckedRolesChange = (value: any) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === allRoles.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < allRoles.value.length;
};
const refreshSearchInput = () => {
  searchInput.value = "";
  getHasUser();
};
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
