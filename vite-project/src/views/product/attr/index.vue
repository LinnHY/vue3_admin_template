<template>
  <div>
    <Category
      :getc1Id="getc1Id"
      :getc2Id="getc2Id"
      :getc3Id="getc3Id"
      :scene="scene"
    />
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="c3Id == ''"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table style="margin: 10px 0px; width: 100%" border :data="attrArr">
          <el-table-column
            label="序号"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性名称" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag
                style="margin: 5px"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              @click="updateAttr"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Delete"
              @click="deleteAttr"
            ></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称"></el-input
          ></el-form-item>
        </el-form>
        <el-button type="primary" @click="" icon="Plus">添加属性值</el-button>
        <el-table border style="margin: 10px 0px">
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column label="属性值名称" align="center"> </el-table-column
          ><el-table-column label="属性值操作" align="center">
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import Category from "../../../components/Category/index.vue";
import { ref, watch } from "vue";
import { reqAttr } from "../../../api/product/attr";
import { AttrResponseData, Attr } from "../../../api/product/attr/type";
import { ElMessage } from "element-plus";
// 数据
const c1Id: any = ref("");
const c2Id: any = ref("");
const c3Id: any = ref("");
let scene = ref<number>(0);
let attrArr = ref<Attr[]>([]);
function getc1Id(value: string) {
  c1Id.value = value;
}
function getc2Id(value: string) {
  c2Id.value = value;
}
function getc3Id(value: string) {
  c3Id.value = value;
}
watch(
  () => c3Id.value,
  async () => {
    attrArr.value = [];
    if (c3Id.value != "") {
      try {
        let result: AttrResponseData = await reqAttr(
          c1Id.value,
          c2Id.value,
          c3Id.value
        );
        attrArr.value = result.data;
        console.log(result.data);
      } catch {
        ElMessage({ type: "error", message: "获取属性失败" });
      }
    }
  }
);
function addAttr() {
  scene.value = 1;
}
const updateAttr = () => {
  scene.value = 1;
};
const deleteAttr = () => {
  scene.value = 1;
};
const cancel = () => {
  scene.value = 0;
};
</script>

<style scoped></style>
