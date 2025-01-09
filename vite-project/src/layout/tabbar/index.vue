<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <el-icon style="margin: 10px" @click="changeFold">
        <component :is="layoutSettingStore.isFold ? 'Expand' : 'Fold'" />
      </el-icon>
      <breadcrumb></breadcrumb>
    </div>
    <div class="tabbar_right">
      <el-button
        icon="Refresh"
        circle
        @click="layoutSettingStore.refresh = !layoutSettingStore.refresh"
      ></el-button>
      <el-button icon="FullScreen" circle @click="fullScreen"></el-button>
      <el-popover
        placement="bottom"
        title="主题设置"
        :width="300"
        trigger="click"
      >
        <el-form>
          <el-form-item label="主题颜色">
            <el-color-picker
              v-model="color"
              @change="setColorTheme"
              show-alpha
              :predefine="predefineColors"
              :teleported="false"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch @change="switchDark" size="small" v-model="darkOrNot" />
          </el-form-item>
        </el-form>
        <template #reference>
          <el-button icon="Setting" circle></el-button>
        </template>
      </el-popover>
      <img
        :src="userStore.avatar"
        style="width: 35px; height: 35px; margin: 0px 10px; border-radius: 50%"
      />
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import breadcrumb from "../tabbar/breadcrumb/index.vue";
import useLayoutSettingStore from "../../store/modules/setting";
import useUserStore from "../../store/modules/user";
import { useRouter } from "vue-router";
let $router = useRouter();
let layoutSettingStore = useLayoutSettingStore();
let userStore = useUserStore();
let darkOrNot = ref<boolean>(false);
const color = ref("rgba(255, 69, 0, 0.68)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);
let changeFold = () => {
  layoutSettingStore.isFold = !layoutSettingStore.isFold;
};
const fullScreen = () => {
  let isFullScreen = document.fullscreenElement;
  if (!isFullScreen) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
const logout = async () => {
  //向服务器发请求，告知这个token作废[退出登陆接口]
  //pinia中用户相关的数据要清空
  //重定向到login页面
  await userStore.userLogout();
  $router.push({ path: "/login" });
};
const setColorTheme = () => {
  //通过js修改根节点的样式对象的css变量
  // document.documentElement 是全局变量时
  const el = document.documentElement;
  // const el = document.getElementById('xxx')

  // 获取 css 变量

  // 设置 css 变量
  el.style.setProperty("--el-color-primary", color.value);
};
const switchDark = () => {
  let html = document.documentElement;
  if (darkOrNot.value) {
    html.className = "dark";
  } else {
    html.className = "";
  }
};
</script>

<script lang="ts">
export default {
  name: "Tabbar",
};
</script>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  .tabbar_left {
    display: flex;
    align-items: center;
  }
  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>
