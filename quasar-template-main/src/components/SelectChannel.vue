<template>
  <q-select
    filled
    v-model="channelId"
    use-input
    input-debounce="0"
    label="Channel"
    :loading="loadingChannels"
    :options="channelsMatchingFilter"
    @filter="filterFn"
    emit-value
    map-options
    :rules="[(val) => (val && val.length > 0) || 'Please select Channel']"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey"> No results </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script>
import { toRefs, watch } from "vue";
import useChannels from "composables/useChannels";

export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { mChannelId } = toRefs(props.model);
    const { channelId } = toRefs(props.model);
    const {
      loadingChannels,
      getChannels,
      channelFilter,
      channelsMatchingFilter,
    } = useChannels(mChannelId);

    watch(mChannelId, () => {
      channelId.value = null;
      getChannels();
    });

    return {
      channelId,
      loadingChannels,
      channelsMatchingFilter,
      filterFn(val, update) {
        update(() => {
          channelFilter.value = val;
        });
      },
    };
  },
};
</script>
