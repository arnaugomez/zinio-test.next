const api = "http://localhost:8080";

export async function fetchFromApi<Data>(route: string): Promise<Data> {
  const res = await fetch(api + route);
  return await res.json()
}
