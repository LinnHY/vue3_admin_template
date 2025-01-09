<template>
  <div class="logo">
    <img src="../../../public/logo.png" />
    <p>硅谷甄选运营平台</p>
  </div>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
  name: "Logo",
};
</script>
<style scoped lang="scss">
.logo {
  display: flex;
  height: 50px;
  width: 100%;
  color: white;
  align-items: center;
  img {
    padding: 20px;
    height: 40px;
    width: 40px;
  }
  p {
    font-size: 20px;
  }
}
</style>
