import axios from 'axios';

export async function fetchData({ url }: { url: string }) {
  const { data } = await axios({
    method: 'GET',
    url: `http://localhost:8000${url}`,
    headers: { 'Content-Type': 'application/json' },
  });

  return data;
}
