import fetchChannels from "api/fetchChannels";
import { ref, onMounted, computed } from 'vue'

export default function useChannels(mChannelId) {
  const loadingChannels = ref(true);
  const channels = ref([]);
  const channelFilter = ref('');

  const getChannels = async () => {
    loadingChannels.value = true;
    try {
      channels.value = (await fetchChannels(mChannelId.value)).map(item => ({ label: item.name, value: item._id })); 
    } finally {
      loadingChannels.value = false;
    }
  }

  const channelsMatchingFilter = computed(() => {
    const filterValue = channelFilter.value.toLowerCase();
    return channels.value.filter(item => {
      return item.label.toLowerCase().includes(filterValue);
    })
  })

  onMounted(getChannels);
  
  return {
    loadingChannels,
    channels,
    getChannels,
    channelFilter,
    channelsMatchingFilter
  }
}
