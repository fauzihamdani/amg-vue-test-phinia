<template>
  <q-table
    :style="{ cursor: 'default' }"
    :title="title"
    :rows="devices"
    :columns="columns"
    :rows-per-page-options="[0, 10, 25, 50, 100]"
    :loading="loading"
    dense
    color="primary"
    row-key="did"
    selectionX="multiple"
    v-model:selectedX="selected"
    @row-click="
      (evt, row, index) => {
        onRowClick(row, index);
      }
    "
  >
    <template v-slot:top-right>
      <q-btn-toggle
        v-model="active"
        no-caps
        unelevated
        toggle-color="primary"
        color="white"
        text-color="primary"
        :options="[
          { attrs: { disabled: true }, label: 'Status:', value: '' },
          { label: '*', value: 'all' },
          { label: 'Activated', value: 'true' },
          { label: 'Deactivated', value: 'false' },
        ]"
      />
      <q-separator class="q-ml-md q-mr-md" vertical inset />
      <q-input dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      <!-- <div> -->
      <q-separator class="q-ml-md q-mr-md" vertical inset />
      <q-btn flat round dense icon="refresh" @click="getDeviceList" />
    </template>

    <!-- <template v-slot:body-cell-online="props">
      <q-td :props="props">
        <q-badge
          :color="props.value === 'Online' ? 'positive' : 'negative'"
          :label="props.value"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-active="props">
      <q-td :props="props">
        <q-badge
          :color="props.value === 'Activated' ? 'positive' : 'grey-6'"
          :label="props.value"
        />
      </q-td>
    </template> -->

    <template v-slot:body-cell-status="props">
      <q-td
        :props="props"
        classX="cursor-pointer"
        @click="
          (event) => {
            event.stopPropagation();
            onStatusClick(props.row, props.rowIndex);
          }
        "
      >
        <div>
          <q-badge
            :color="props.value.online ? 'positive' : 'negative'"
            :label="props.value.online ? 'Online' : 'Offline'"
          />
          <q-badge
            class="q-ml-xs"
            :color="props.value.active ? 'positive' : 'grey-6'"
            :label="props.value.active ? 'Activated' : 'Deactivated'"
          />
          <q-badge
            v-if="props.value.sync.master"
            class="q-ml-xs"
            color="primary"
            label="Master"
          />
          <q-badge
            v-if="props.value.sync.slave"
            class="q-ml-xs"
            color="dark"
            label="Slave"
          />
        </div>
      </q-td>
    </template>

    <!-- <template v-slot:body-cell-sync="props">
      <q-td :props="props">
        <q-badge v-if="props.value.master" color="primary" label="Master" />
        <q-badge
          v-if="props.value.slave"
          :class="{ 'q-ml-xs': props.value.master }"
          color="dark"
          label="Slave"
        />
      </q-td>
    </template> -->

    <template v-slot:body-cell-version="props">
      <q-td :props="props">
        <q-badge
          :color="props.value === 'OK' ? 'positive' : 'negative'"
          :label="props.value"
        />
      </q-td>
    </template>

    <template v-slot:body-cell-firmware="props">
      <q-td :props="props">
        <q-badge
          :color="props.row.ver ? 'primary' : 'grey'"
          :label="props.row.ver || '1.0'"
        />
        <q-badge
          class="q-ml-xs"
          :color="props.value === 'OK' ? 'positive' : 'negative'"
          :label="props.value"
        />
        <q-tooltip class="bg-dark text-caption">
          <div>Player: {{ Date.tryToTZString(props.row.firmware) }}</div>
          <div>
            Server: {{ new Date(props.row.firmware_server).toTZString() }}
          </div>
        </q-tooltip>
      </q-td>
    </template>
  </q-table>
</template>

<script>
import { ref } from "vue";
import useDeviceList from "composables/useDeviceList";

const columns = [
  {
    name: "status",
    align: "left",
    label: "Status",
    field: "online",
    format: (_, row) => ({
      online: row.online,
      active: row.active,
      sync: row.sync,
    }),
    sortable: true,
  },
  // {
  //   name: "online",
  //   align: "left",
  //   label: "Status",
  //   field: "online",
  //   format: (val) => `${val ? "Online" : "Offline"}`,
  //   sortable: true,
  // },
  // {
  //   name: "active",
  //   align: "left",
  //   label: "",
  //   field: "active",
  //   format: (val) => `${val ? "Activated" : "Deactivated"}`,
  //   sortable: true,
  // },
  // {
  //   name: "sync",
  //   align: "left",
  //   label: "Sync",
  //   field: "sync",
  //   // format: (val) => `${val}`,
  // },
  {
    name: "version",
    align: "left",
    label: "Content",
    field: "version",
    format: (val, row) =>
      `${row.version === row.version_server ? "OK" : "Outdated"}`,
  },
  {
    name: "firmware",
    align: "left",
    label: "Firmware",
    field: "firmware",
    format: (val, row) =>
      `${row.firmware === row.firmware_server ? "OK" : "Outdated"}`,
  },
  // {
  //   name: "did",
  //   required: true,
  //   label: "ID",
  //   align: "left",
  //   field: "did",
  //   // format: (val) => `${val}`,
  // },
  // {
  //   name: "ver",
  //   required: true,
  //   label: "Ver",
  //   align: "left",
  //   field: "ver",
  //   // format: (val) => `${val}`,
  //   sortable: true,
  //   format: (val, row) =>
  //     `${row.ver ? row.ver : "1.0"}`,
  // },
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name",
    // format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "mChannel",
    align: "left",
    label: "Channel",
    field: "mChannel",
    sortable: true,
  },
  {
    name: "channel",
    align: "left",
    label: "Location",
    field: "channel",
    sortable: true,
  },

  {
    name: "lastSeen",
    align: "left",
    label: "Last Seen",
    field: "lastSeen",
    format: (val) => `${new Date(val).timeDiff()}`,
    sortable: true,
  },
  // { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  // { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  // { name: 'protein', label: 'Protein (g)', field: 'protein' },
  // { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
];

export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "Device List",
    },
    onStatusClick: {
      type: Function,
      default: (row, index) => {},
    },
    onRowClick: {
      type: Function,
      default: (row, index) => {},
    },
  },
  setup(props) {
    const active = ref("true");
    const selected = ref([]);
    const { loading, getDeviceList, filter, devicesMatchingFilter } =
      useDeviceList(active);

    return {
      active,
      selected,
      columns,
      loading,
      devices: devicesMatchingFilter,
      getDeviceList,
      filter,
    };
  },
};
</script>
