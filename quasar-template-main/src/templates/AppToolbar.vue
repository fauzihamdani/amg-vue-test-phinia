<template>
  <template></template>
</template>

<script>
import { markRaw } from "vue";
import useAppStore from "stores/appStore";

export default {
  name: "AppToolbar",
  props: {
    Items: Object,
  },
  setup(props) {
    const appStore = useAppStore();
    return {
      appStore,
      AppToolbarItems: markRaw(props.Items),
    };
  },
  mounted() {
    this.appStore.AppToolbarItems = this.AppToolbarItems;
  },
  unmounted() {
    this.appStore.AppToolbarItems = null;
  },
};
</script>
