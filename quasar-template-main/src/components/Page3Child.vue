<template>
  Page 3 Child

  <h3 v-if="isTrue">True</h3>
  <h3 v-else>False</h3>

  <ul data-testid="items">
    <li v-for="item in names" :key="item.id">
      {{ item.name }}
      <!--  <button @click="cart.removeItem(item.name)" type="button">X</button>  -->
    </li>
  </ul>
</template>

<script>
import { watch } from "vue";
export default {
  props: { isTrue: Boolean, names: Array },
  setup() {
    // const data = isTrue;
    // return data;
    var data;
    // watch(() => {
    //     data = isTrue;
    // });
    return {};
  },
};
</script>
