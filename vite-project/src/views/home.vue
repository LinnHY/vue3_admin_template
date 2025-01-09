<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" class="avatar" />
      <div class="bottom">
        <h3 class="title">{{ getTime() }}好，{{ userStore.username }}</h3>
        <h3 class="subtitle">硅谷甄选运营平台</h3>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import useUserStore from "../store/modules/user";
import { getTime } from "../utils/time";
let userStore = useUserStore();
</script>

<style scoped lang="scss">
.box {
  display: flex;
  align-items: center;

  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    .title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 30px;
    }
    .subtitle {
      font-size: italic;
      color: skyblue;
    }
  }
}
</style>
