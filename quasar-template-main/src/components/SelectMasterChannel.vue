<template>
  <q-select
    filled
    v-model="mChannelId"
    use-input
    input-debounce="0"
    label="Master Channel"
    :loading="loadingMasterChannels"
    :options="masterChannelsMatchingFilter"
    @filter="filterFn"
    emit-value
    map-options
    lazy-rules
    :rules="[
      (val) => (val && val.length > 0) || 'Please select Master Channel',
    ]"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { toRefs } from "vue";
import useMasterChannels from "composables/useMasterChannels";

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { mChannelId } = toRefs(props.model);
    const {
      loadingMasterChannels,
      masterChannelFilter,
      masterChannelsMatchingFilter,
    } = useMasterChannels();

    return {
      mChannelId,
      loadingMasterChannels,
      masterChannelsMatchingFilter,
      filterFn(val, update) {
        update(() => {
          masterChannelFilter.value = val;
        });
      },
    };
  },
};
</script>
