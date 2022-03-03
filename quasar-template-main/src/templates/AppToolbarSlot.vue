<template>
  <template v-if="appStore.AppToolbarItems">
    <!-- <Transition mode="out-in"> -->
    <!-- <KeepAlive> -->
    <!-- <Suspense> -->
    <!-- main content -->
    <component :is="appStore.AppToolbarItems"></component>

    <!-- loading state -->
    <!-- <template #fallback> Loading... </template> -->
    <!-- </Suspense> -->
    <!-- </KeepAlive> -->
    <!-- </Transition> -->
    <q-separator inset spaced vertical />
  </template>
</template>

<script>
import useAppStore from "stores/appStore";

export default {
  name: "AppToolbarSlot",
  setup() {
    const appStore = useAppStore();
    return {
      appStore,
    };
  },
};
</script>
