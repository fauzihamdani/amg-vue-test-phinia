import { fetchApi } from './fetchApi';

export default async function fetchDeviceList({ active }) {
  return await fetchApi(`https://message.amg.id/monitor/device.json?active=${active}`);
}