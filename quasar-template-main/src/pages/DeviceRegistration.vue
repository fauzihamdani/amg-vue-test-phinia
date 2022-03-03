<template>
  <!-- content -->
  Device Registration
  <!-- 
  <q-btn color="primary" label="Add Data" @click="incrementBtn" /> -->
</template>

<script>
import numberStore from "../stores/number";
export default {
  name: "DeviceRegistrationPage",
  setup(props) {
    const useNumberStore = numberStore();

    const incrementBtn = () => {
      useNumberStore.increment();
    };

    return {
      useNumberStore,
      incrementBtn,
    };
  },
};
</script>
