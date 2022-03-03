import { fetchApi } from './fetchApi';

export default async function pushCommand(target, command, active) {
  return await fetchApi('https://message.amg.id/api/push', {
    method: "command",
    payload: {
      target,
      cmd: {
        [command]: typeof active === 'boolean' ? active : true
      }
    }
  })
}
