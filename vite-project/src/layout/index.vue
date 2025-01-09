<template>
  <div class="layout_container">
    <div class="layout_slider">
      <Logo></Logo>
      <el-scrollbar>
        <el-menu
          :collapse="layoutSettingStore.isFold ? true : false"
          background-color="#001529"
          text-color="white"
        >
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div
      class="layout_tabbar"
      :class="{ fold: layoutSettingStore.isFold ? true : false }"
    >
      <Tabbar></Tabbar>
    </div>
    <div
      class="layout_main"
      :class="{ fold: layoutSettingStore.isFold ? true : false }"
    >
      <Main></Main>
    </div>
  </div>
</template>

<script setup lang="ts">
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import useUserStore from "../store/modules/user";
import useLayoutSettingStore from "../store/modules/setting";
import Main from "./main/index.vue";
import Tabbar from "./tabbar/index.vue";

let userStore = useUserStore();
let layoutSettingStore = useLayoutSettingStore();
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.layout_container {
  position: fixed;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: block;
  text-align: left; // 确保内容左对齐
}
.layout_slider {
  width: 260px;
  height: 100vh;
  background: #001529;
  transition: all 0.3s;
  p {
    color: white;
  }
  .scrollbar {
    width: 100%;
    height: calc(100vh - 50px);
  }
}
.layout_tabbar {
  position: fixed;
  width: calc(100% - 260px);
  height: 50px;
  left: 260px;
  transition: all 0.3s;
  top: 0px;
  &.fold {
    width: calc(100vw - 50px);
    left: 50px;
  }
}
.layout_main {
  position: absolute;
  height: calc(100vh - 100px);
  width: calc(100% - 50px);
  left: 260px;
  top: 50px;
  padding: 20px;
  overflow: auto;
  transition: all 0.3s;
  &.fold {
    width: calc(100vw - 50px);
    left: 50px;
  }
}
</style>
