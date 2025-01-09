<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="c1Id" @change="c1IdChange" :disabled="scene == 1">
          <el-option
            v-for="c1 in c1Arr"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="c2Id" @change="c2IdChange" :disabled="scene == 1">
          <el-option
            v-for="c2 in c2Arr"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          v-model="c3Id"
          @change="getc3Id(c3Id)"
          :disabled="scene == 1"
        >
          <el-option
            v-for="c3 in c3Arr"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { CategoryResponseData } from "../../api/product/attr/type";
import { reqC1, reqC2, reqC3 } from "../../api/product/attr";
let props = defineProps(["getc1Id", "getc2Id", "getc3Id", "scene"]);
let c1Arr = ref<any>([]);
let c2Arr = ref<any>([]);
let c3Arr = ref<any>([]);
let c1Id = ref<any>("");
let c2Id = ref<any>("");
let c3Id = ref<any>("");

onMounted(async () => {
  let result: CategoryResponseData = await reqC1();
  if (result.code == 200) {
    c1Arr.value = result.data;
  } else {
    console.log("reqC1错误", result);
  }
});
const c1IdChange = async () => {
  let result: CategoryResponseData = await reqC2(c1Id.value);
  if (result.code == 200) {
    c2Arr.value = result.data;

    c2Id.value = "";
    c3Id.value = "";
    props.getc1Id(c1Id.value);
    props.getc2Id(c2Id.value);
    props.getc3Id(c3Id.value);
  }
};
const c2IdChange = async () => {
  let result: CategoryResponseData = await reqC3(c2Id.value);
  if (result.code == 200) {
    c3Arr.value = result.data;
    c3Id.value = "";
    props.getc2Id(c2Id.value);
    props.getc3Id(c3Id.value);
  }
};
</script>

<style scoped>
.el-select {
  --el-select-width: 220px;
}
</style>
