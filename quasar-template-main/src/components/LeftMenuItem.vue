<style lang="scss">
.menu-active {
  background: #e6f8ff;
  // background: $primary;
}
</style>

<template>
  <q-separator v-if="separator" :spaced="spaced" />
  <q-item v-else-if="header">
    <q-item-section>
      <q-item-label overline>{{ title }}</q-item-label>
      <q-item-label caption>{{ caption }}</q-item-label>
    </q-item-section>
  </q-item>

  <q-item
    v-else
    clickable
    :to="link"
    :exact="true"
    exact-active-class="menu-active"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon class="q-ml-sm" :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption>
        {{ caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "LeftMenuItem",
  props: {
    separator: {
      type: Boolean,
      default: false,
    },
    spaced: {
      type: Boolean,
      default: true,
    },
    header: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },

    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },

    icon: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
