//layout组件相关配置的仓库
import { defineStore } from "pinia";

let useLayoutSettingStore = defineStore("LayoutSettingStore", {
  state: () => {
    return {
      isFold: false,
      refresh: true,
    };
  },
});

export default useLayoutSettingStore;
