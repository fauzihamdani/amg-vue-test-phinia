<template>
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">{{ device.name }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <div class="row">
          <div class="col">
            <q-input filled readonly v-model="source.did" label="Device No" />
          </div>
          <div class="col-0 q-pa-sm"></div>
          <div class="col">
            <q-input filled readonly v-model="source.aid" label="Asset No" />
          </div>
        </div>

        <q-input
          :disable="!unlock"
          filled
          v-model="source.name"
          label="Name *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please enter Device name',
          ]"
        />

        <q-input
          :disable="!unlock"
          filled
          v-model="source.description"
          label="Description"
        />

        <SelectMasterChannel :disable="!unlock" :model="source" />

        <SelectChannel :disable="!unlock" :model="source" />

        <!-- <q-separator /> -->

        <div class="row">
          <div class="col">
            <q-toggle
              :disable="!unlock"
              v-model="source.sync.master"
              label="Master"
            />
          </div>
          <div class="col">
            <q-toggle
              :disable="!unlock"
              v-model="source.sync.slave"
              label="Slave"
            />
          </div>
          <div class="col">
            <q-toggle
              :disable="!unlock"
              v-model="source.active"
              label="Active"
              color="green"
            />
          </div>
        </div>

        <q-separator />

        <q-card-actions class="q-pa-none">
          <q-toggle
            v-model="unlock"
            :icon="unlock ? 'lock_open' : 'lock'"
            color="red"
          />
          <q-space />
          <q-btn
            :disable="!unlock"
            label="Submit"
            type="submit"
            color="primary"
          />
          <q-btn
            label="Cancel"
            color="primary"
            flat
            class="q-ml-sm"
            v-close-popup
          />
        </q-card-actions>
        
      </q-form>
      
    </q-card-section>
    <!-- <q-separator />
    <q-card-section>
      <DeviceCommands :device="device" />
    </q-card-section> -->
  </q-card>

  <q-dialog v-model="showErrorDialog">
    <q-card>
      <q-card-section>
        <div class="row items-center">
          <div class="col-1">
            <q-icon name="warning" color="negative" style="font-size: 3rem" />
          </div>
          <div class="col-0 q-ma-sm"></div>
          <div class="col">
            <span>{{ errorMessage }}</span>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, reactive, toRefs, watch } from "vue";
import postDevice from "api/postDevice";
import SelectMasterChannel from "components/SelectMasterChannel.vue";
import SelectChannel from "components/SelectChannel.vue";
// import DeviceCommands from "components/DeviceCommands.vue";

export default {
  components: { SelectMasterChannel, SelectChannel },
  props: {
    device: {
      type: Object,
      required: true,
    },
    onSubmitted: Function,
  },
  setup(props) {
    const device = ref(props.device);
    // const source = reactive({ ...props.device });
    const source = reactive(JSON.parse(JSON.stringify(props.device))); // deep clone
    const showErrorDialog = ref(false);
    const errorMessage = ref("");
    const unlock = ref(false);

    if (!source.aid) {
      source.aid = "-";
    }

    const { master, slave } = toRefs(source.sync);

    watch(master, () => {
      if (master.value) {
        slave.value = false;
      }
    });

    watch(slave, () => {
      if (slave.value) {
        master.value = false;
      }
    });

    const onSubmit = async () => {
      device.value = Object.assign(device.value, source);

      const data = device.value;

      // lihat nama2 field data di console
      // isinya sama dengan field https://message.amg.id/monitor/device.json?active=false

      // console.log(data);

      try {
        const response = await postDevice({
          device_no: data.did,
          asset_no: data.aid,
          name: data.name,
          user: 0,
          description: data.description,
          channel_id: data.channelId,
          master: data.sync.master,
          slave: data.sync.slave,
          active: data.active || false,
        });

        // console.log("response", response);

        if (!response.r) {
          // console.log(response.m);
          errorMessage.value = response.m.message || response.m;
          showErrorDialog.value = true;
        } else {
          if (props.onSubmitted) {
            props.onSubmitted();
          }
        }
      } catch (err) {
        errorMessage.value = err.message;
        showErrorDialog.value = true;
      }
    };

    return {
      source,
      onSubmit,
      showErrorDialog,
      errorMessage,
      unlock,
    };
  },
};
</script>
