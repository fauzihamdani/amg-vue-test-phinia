<template>
  <DeviceList
    title="Device Manager"
    :onStatusClick="showCommands"
    :onRowClick="showDeviceProperties"
  />
  <q-dialog
    v-model="propertiesDialog"
    :persistent="dialogComponent === 'DeviceProperties'"
    :maximized="$q.platform.is.mobile ? true : false"
    :transition-show="$q.platform.is.mobile ? 'slide-up' : 'scale'"
    :transition-hide="$q.platform.is.mobile ? 'slide-down' : 'scale'"
  >
    <DeviceCommands v-if="dialogComponent === 'DeviceCommands'"
      :device="device"
    />
    <DeviceProperties v-if="dialogComponent === 'DeviceProperties'"
      :device="device"
      :onSubmitted="() => (propertiesDialog = false)"
    />
    
  </q-dialog>
</template>

<script>
import { ref, markRaw } from "vue";
import DeviceList from "components/DeviceList.vue";
import DeviceCommands from "components/DeviceCommands.vue";
import DeviceProperties from "components/DeviceProperties.vue";

export default {
  name: "DeviceManagerPage",
  components: { DeviceList, DeviceCommands, DeviceProperties },
  setup(props) {
    const propertiesDialog = ref(false);
    const device = ref(null);
    const dialogComponent = ref('');
    
    const showCommands = (row, index) => {
      dialogComponent.value = 'DeviceCommands';
      device.value = row;
      propertiesDialog.value = true;
    };

    const showDeviceProperties = (row, index) => {
      dialogComponent.value = 'DeviceProperties';
      device.value = row;
      propertiesDialog.value = true;
    };

    return {
      propertiesDialog,
      device,
      showCommands,
      showDeviceProperties,
      dialogComponent
    };
  },
};
</script>
