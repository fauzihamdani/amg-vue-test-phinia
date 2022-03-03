<style lang="sass">
.item-active
  // color: white
  // background: #e6f8ff

  // color: white
  background: #F2C037
</style>

<template>
  
  <q-card style="min-widthx: 450px">
    <q-card-section>
      <div class="row">
        <div class="col" style="min-width: 450px">
          <q-list bordered separator>
            <q-item-section class="q-pa-md">
              <q-item-label overline>COMMANDS</q-item-label>
              <q-item-label caption>{{ device.name }}</q-item-label>
            </q-item-section>

            <q-separator />

            <q-item
              v-for="(item, index) in commands"
              :key="index"
              :active="item.active"
              active-class="item-active"
              clickable
              v-ripple
              @click="onClick(item)"
            >
              <q-item-section avatar>
                <q-icon class="q-ml-sm" color="primary" :name="item.icon" />
                <!-- <q-avatar color="primary" text-color="white" :icon="item.icon" /> -->
              </q-item-section>
              <q-item-section>
                <q-item-label overline>{{ item.title.toUpperCase() }}</q-item-label>
                <q-item-label caption>{{ item.caption }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col" style="min-width: 450px">
          <q-list bordered separator>
            <q-item-section class="q-pa-md">
              <q-item-label overline>PREVIEW</q-item-label>
              <q-item-label caption>Screenshot</q-item-label>
            </q-item-section>
          </q-list>
          
          <div class="q-pa-md">
            <q-img
              :src="`https://cdn.amg.id/screenshots/${device.did}.jpg`"
              style="height: 100%; width: 100%"
            >
              <template v-slot:error>
                <div class="absolute-full flex flex-center bg-negative text-white">
                  No Screenshot
                </div>
              </template>
            </q-img>
          </div>
        </div>
      </div>
      
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-card-actions class="q-pa-none" align="right">
        <q-btn
          label="Close"
          color="primary"
          flat
          class="q-ml-sm"
          v-close-popup
        />
      </q-card-actions>
    </q-card-section>
  </q-card>

  <!-- <q-dialog v-model="showDialog">
    <q-card>
      <q-card-section>
        <div class="row items-center">
          <div class="col-1">
            <q-icon
              name="check_circle_outline"
              color="primary"
              style="font-size: 2.5rem"
            />
          </div>
          <div class="col-1 q-ma-sm"></div>
          <div class="col">
            <span>{{ message }}</span>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog> -->

</template>

<script>
import { useQuasar } from 'quasar';
// import { Notify } from 'quasar';
import { ref, reactive, toRefs, watch } from "vue";
import commands from "../config/commands";
import pushCommand from "api/pushCommand";

export default {
  props: {
    device: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const $q = useQuasar();
    // const { device } = toRefs(props);
    // const showDialog = ref(false);
    const message = ref("");

    const onClick = async (item) => {
      if (typeof item.active === "boolean") {
        item.active = !item.active;
      }
      // return console.log(typeof item.active, item);

      try {
        const response = await pushCommand(
          props.device.did,
          item.cmd,
          item.active
        );

        // console.log("response", response);

        if (!response.result) {
          // console.log(response.m);
          // message.value = response.payload;
          // showDialog.value = true;
          $q.notify({ position: 'top', color: 'negative', message: response.payload, icon: 'report_problem' },);
          
        } else {
          // message.value = "Command executed successfully";
          // showDialog.value = true;
          $q.notify({ position: 'top', color: 'positive', message: 'Command executed successfully', icon: 'info' },);
        }
      } catch (err) {
        // message.value = err.message;
        // showDialog.value = true;
        $q.notify({ position: 'top', color: 'negative', message: err.message, icon: 'report_problem' },);
      }

      // $q.notify({ position: 'top', color: 'negative', message: 'response.payload', icon: 'report_problem' },);
    };

    return {
      commands: reactive(JSON.parse(JSON.stringify(commands))),
      // showDialog,
      message,
      onClick,
    };
  },
};
</script>
