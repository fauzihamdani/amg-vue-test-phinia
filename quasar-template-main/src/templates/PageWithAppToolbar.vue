<template>
  <AppToolbar :Items="ToolbarItems" />
  <template v-if="Page">
    <KeepAlive>
      <component :is="Page"></component>
    </KeepAlive>
  </template>
</template>

<script>
// This is example Page how to use AppToolbar
import AppToolbar from "templates/AppToolbar";

export default {
  props: {
    ToolbarItems: Object,
    Page: Object,
  },
  components: { AppToolbar },
  name: "PageWithAppToolbar",
};
</script>
