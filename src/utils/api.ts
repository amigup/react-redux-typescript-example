import { getToken } from "./token";

let token: string | null = null;

export async function callApi(method: string, url: string, path: string, data?: any) {

  if (!token) {
    token = await getToken();
  }

  const res = await fetch(`${url}${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  return res.json()
}
