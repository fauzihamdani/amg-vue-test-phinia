import fetchMasterChannels from "api/fetchMasterChannels";
import { ref, onMounted, computed } from 'vue'

export default function useMasterChannels() {
  const loadingMasterChannels = ref(true);
  const masterChannels = ref([]);
  const masterChannelFilter = ref('');

  const getMasterChannels = async () => {
    loadingMasterChannels.value = true;
    try {
      masterChannels.value = (await fetchMasterChannels()).map(item => ({ label: item.name, value: item._id }));
    } finally {
      loadingMasterChannels.value = false;
    }
  }

  const masterChannelsMatchingFilter = computed(() => {
    const filterValue = masterChannelFilter.value.toLowerCase();
    return masterChannels.value.filter(item => {
      return item.label.toLowerCase().includes(filterValue);
    })
  })

  onMounted(getMasterChannels);

  return {
    loadingMasterChannels,
    masterChannels,
    getMasterChannels,
    masterChannelFilter,
    masterChannelsMatchingFilter
  }
}
