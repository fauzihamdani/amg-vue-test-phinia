import { fetchApi } from './fetchApi';

export default async function fetchChannels(mChannel) {
  return await fetchApi(`https://cms.amg.id/api/channels/mchannel/${mChannel}`);
}
