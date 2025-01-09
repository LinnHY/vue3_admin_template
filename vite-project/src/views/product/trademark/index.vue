<template>
  <div>
    <el-card style="max-width: 1600px">
      <el-button type="primary" icon="Plus" @click="appendTradeMark"
        >添加品牌</el-button
      >
      <el-table style="margin: 10px 0px" :data="trademarkArr" border>
        <el-table-column
          label="序号"
          width="80px"
          type="index"
        ></el-table-column>
        <el-table-column
          label="品牌名称"
          width="520px"
          align="center"
          prop="tmName"
        ></el-table-column>
        <el-table-column label="品牌Logo" width="520px" align="center">
          <template #="{ row, $index }">
            <img
              :src="row.logoUrl"
              alt="图片未加载"
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" width="520px" align="center">
          <template #="{ row, $index }">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="editTradeMark(row)"
            ></el-button>
            <el-popconfirm
              :title="`Are you sure to delete ${row.tmName}?`"
              @confirm="removeTradeMark(row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize4"
        :page-sizes="[3, 5, 7, 9, 11]"
        :background="true"
        layout=" prev, pager, next, jumper,sizes,total"
        :total="total"
        @current-change="getHasTrademark"
      />
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademark.id ? '修改品牌' : '添加品牌'"
    >
      <el-form :model="trademark" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademark.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademark.logoUrl"
              :src="trademark.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="cancelForm">取消</el-button>
        <el-button type="primary" @click="confirmForm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from "../../../api/product/trademark";
import { Records, TradeMarkResponseData, TradeMark } from "./type";
import type { UploadProps } from "element-plus";
import { ElMessage } from "element-plus";
let pageNo = ref<number>(1);
let pageSize4 = ref<number>(3);
let total = ref<number>(0);
let dialogFormVisible = ref<boolean>(false);
let trademarkArr = ref<Records>([]);
let trademark = reactive<TradeMark>({
  tmName: "",
  logoUrl: "",
});
let formRef = ref();
const validatortmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack();
  } else {
    callBack(new Error("品牌名称至少2个字符"));
  }
};
const validatorLogoURL = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack();
  } else {
    callBack(new Error("请上传Logo图片"));
  }
};
const rules = reactive<any>({
  tmName: [{ required: true, trigger: "blur", validator: validatortmName }],
  logoUrl: [{ required: true, validator: validatorLogoURL }],
});
const getHasTrademark = async () => {
  let result: TradeMarkResponseData = await reqHasTrademark(
    pageNo.value,
    pageSize4.value
  );
  if (result.code == 200) {
    total.value = result.data.total;
    trademarkArr.value = result.data.records;
  }
};
const appendTradeMark = () => {
  trademark.logoUrl = "";
  trademark.tmName = "";
  trademark.id = undefined;
  dialogFormVisible.value = true;
};
const editTradeMark = (row: any) => {
  dialogFormVisible.value = true;
  trademark.logoUrl = row.logoUrl;
  trademark.tmName = row.tmName;
  trademark.id = row.id;
};
const removeTradeMark = async (id: number) => {
  let result = await reqDeleteTrademark(id);
  if (result.code == 200) {
    ElMessage({ type: "success", message: "删除成功" });
    getHasTrademark();
  } else {
    ElMessage({ type: "error", message: "删除失败" });
  }
};
const cancelForm = () => {
  dialogFormVisible.value = false;
};
const confirmForm = async () => {
  await formRef.value.validate();
  let result = await reqAddOrUpdateTrademark(trademark);
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: trademark.id ? "修改品牌成功" : "添加品牌成功",
    });
    getHasTrademark();
  } else {
    ElMessage({
      type: "error",
      message: trademark.id ? "修改品牌失败" : "添加品牌失败",
    });
  }
  console.log(result);
  dialogFormVisible.value = false;
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error("Picture size can not exceed 4MB!");
    return false;
  }
  return true;
};
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  trademark.logoUrl = response.data;
};
onMounted(() => {
  getHasTrademark();
});
</script>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
