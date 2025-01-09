<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 85%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column prop="address" label="操作" min-width="45">
        <template #="{ row, index }">
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 4"
            @click="addMenu(row)"
            >{{ row.level >= 3 ? "添加功能" : "添加菜单" }}</el-button
          >
          <el-button
            type="primary"
            size="small"
            :disabled="row.level == 1"
            @click="updateMenu(row)"
            >编辑</el-button
          >
          <el-popconfirm
            :title="`你确定要删除${row.name}吗?`"
            @confirm="removeMenu(row)"
          >
            <template #reference>
              <el-button type="primary" size="small" :disabled="row.level == 1"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="centerDialogVisible" width="500" center>
      <div class="form-container">
        <div class="form-item">
          <label>名称</label>
          <el-input
            v-model="menuParams.name"
            style="width: 240px"
            placeholder="Please input"
          />
        </div>
        <div class="form-item">
          <label>权限</label>
          <el-input
            v-model="menuParams.code"
            style="width: 240px"
            placeholder="Please input"
          />
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmAddOrUpdate">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  reqAllPermission,
  reqAddOrUpdateMenu,
  reqRemoveMenu,
} from "../../../api/acl/menu";
import {
  PermissionList,
  PermissionResponseData,
  MenuParams,
} from "../../../api/acl/menu/type";
import { ElMessage } from "element-plus";

const centerDialogVisible = ref(false);
const tableData = ref<PermissionList>([]);
let menuParams = reactive<MenuParams>({
  id: 0,
  code: "",
  level: 0,
  name: "",
  pid: 0,
});
onMounted(() => {
  getHasPermission();
});
const getHasPermission = async () => {
  let result: PermissionResponseData = await reqAllPermission();
  tableData.value = result.data;
};
const confirmAddOrUpdate = async () => {
  let result: any = await reqAddOrUpdateMenu(menuParams);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: menuParams.id ? "更新成功" : "添加成功",
    });
    getHasPermission();
  } else {
    ElMessage({
      type: "error",
      message: menuParams.id ? "更新失败" : "添加失败",
    });
  }
  centerDialogVisible.value = false;
};
const addMenu = (row: any) => {
  menuParams.id = 0;
  menuParams.name = "";
  menuParams.code = "";
  menuParams.level = row.level + 1;
  menuParams.pid = row.id;
  centerDialogVisible.value = true;
};
const updateMenu = (row: any) => {
  menuParams.name = row.name;
  menuParams.id = row.id;
  menuParams.code = row.code;
  centerDialogVisible.value = true;
};
const removeMenu = async (row: any) => {
  let result: any = await reqRemoveMenu(row.id);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
    getHasPermission();
  } else {
    ElMessage({
      type: "error",
      message: result.data,
    });
  }
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* 垂直对齐 (改为row则水平对齐) */
  gap: 10px; /* 控制每个表单项之间的间距 */
}

.form-item {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
}

.form-item label {
  width: 50px; /* 固定宽度，确保对齐 */
  margin-right: 10px;
  text-align: right;
}
</style>
