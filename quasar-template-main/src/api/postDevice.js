import { fetchApi } from './fetchApi';

export default async function postDevice(body) {
  return await fetchApi(`https://player.amg.id/api/register-player/update/${body.device_no}`, body);
}
