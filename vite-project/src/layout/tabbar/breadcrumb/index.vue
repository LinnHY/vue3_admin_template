<template>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
      >{{ item.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
let $route = useRoute();
console.log($route);
</script>

<style scoped></style>
<script lang="ts">
export default {
  name: "breadcrumb",
};
</script>
