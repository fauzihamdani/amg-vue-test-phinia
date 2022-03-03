<template>
  <q-drawer v-model="filterDrawer" side="right" overlay bordered elevated>
    <q-toolbar>
      <q-btn flat round dense icon="o_filter_alt" />
      <q-toolbar-title> Filter </q-toolbar-title>
      <q-btn flat round dense icon="close" @click="toggleFilter" />
    </q-toolbar>
    <q-separator />
    <div class="q-pa-sm full-width">Hello</div>
  </q-drawer>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props) {
    const filterDrawer = ref(false);

    function toggleFilter() {
      filterDrawer.value = !filterDrawer.value;
    }

    return {
      filterDrawer,
      toggleFilter,
    };
  },
};
</script>
