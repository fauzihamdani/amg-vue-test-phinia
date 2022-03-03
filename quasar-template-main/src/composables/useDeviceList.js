import fetchDeviceList from 'api/fetchDeviceList'
import { ref, onMounted, watch, computed } from 'vue'

export default function useDeviceList(active) {
  const loading = ref(true)
  const devices = ref([])
  const filter = ref('')

  const getDeviceList = async () => {
    loading.value = true
    try {
      devices.value = await fetchDeviceList({ active: active.value })
    } finally {
      loading.value = false
    }
  }

  const devicesMatchingFilter = computed(() => {
    const filterValue = filter.value.toLowerCase()
    return devices.value.filter(device => {
      return (device.name || '').toLowerCase().includes(filterValue) || (device.channel || '').toLowerCase().includes(filterValue)
    })
  })

  onMounted(getDeviceList)

  watch(active, getDeviceList)

  return {
    loading,
    devices,
    getDeviceList,
    filter,
    devicesMatchingFilter
  }
}
