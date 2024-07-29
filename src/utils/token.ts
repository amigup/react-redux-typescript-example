import { API_ENDPOINT } from "./endpoint";

export async function getToken(){
  const res = await fetch(`${API_ENDPOINT}/token`, {
    method: 'get',
    headers: {
      Accept: 'application/json'
    },
  })
  return res.json();
}
