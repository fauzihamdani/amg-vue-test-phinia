<template>
  <Page3Child :isTrue="isTrue" :names="names" />
</template>

<script>
import Page3Child from "../components/Page3Child.vue";

export default {
  components: { Page3Child },
  setup() {
    const names = [
      { id: 1, name: "andaind" },
      { id: 2, name: "fwekm" },
      { id: 3, name: "wefewf" },
    ];

    const isTrue = true;
    return { isTrue, names };
  },
};
</script>
