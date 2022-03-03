import { fetchApi } from './fetchApi';

export default async function fetchMasterChannels() {
  return await fetchApi('https://cms.amg.id/api/master-channels/');
}
