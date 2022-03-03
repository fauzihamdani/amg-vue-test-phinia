<template>
  <AppToolbar :Items="TemplateAppToolbar" />
  <q-page padding> Template </q-page>
</template>

<script>
import AppToolbar from "templates/AppToolbar";
import TemplateAppToolbar from "components/TemplateAppToolbar";

export default {
  components: { AppToolbar },
  // name: 'PageName',
  setup(props) {
    // const appStore = useAppStore();
    // setTimeout(() => {
    //   appStore.toolbar = TemplateToolbar;
    // }, 3000);
    return {
      TemplateAppToolbar
    }
  }
};
</script>
