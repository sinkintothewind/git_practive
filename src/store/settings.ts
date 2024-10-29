import { defineStore } from "pinia";
import defaultSettings from "@/settings";
import { ref } from "vue";

export const useSettingsStore = defineStore("setting", () => {
  // state
  const showSettings = ref<boolean>(defaultSettings.showSettings);
  const fixedHeader = ref<boolean>(defaultSettings.fixedHeader);
  const sidebarLogo = ref<boolean>(defaultSettings.sidebarLogo);

  // actions
  function changeSetting(param: { key: string; value: any }) {
    const { key, value } = param;
    switch (key) {
      case "showSettings":
        showSettings.value = value;
        break;
      case "fixedHeader":
        fixedHeader.value = value;
        break;
      case "sidevarLogo":
        sidebarLogo.value = value;
        break; 
      default:
        break;
    }
  }

  return {
    showSettings, 
    fixedHeader,
    sidebarLogo, 
    changeSetting,
  };
});
