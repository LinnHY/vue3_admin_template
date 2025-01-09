<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="refresh" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import { watch, ref, nextTick } from "vue";
import useLayoutSettingStore from "../../store/modules/setting.ts";
let refresh = ref(true);
let layoutSettingStore = useLayoutSettingStore();
watch(
  () => layoutSettingStore.refresh,
  () => {
    refresh.value = false;
    nextTick(() => {
      refresh.value = true;
    });
  }
);
</script>
<script lang="ts">
export default {
  name: "Main",
};
</script>
<style scoped></style>
