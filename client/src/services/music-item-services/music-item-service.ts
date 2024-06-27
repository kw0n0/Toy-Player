import { fetchData } from "../../utils/fetchData";

export async function getMusicItem({ id }: { id?: string }) {
  const res = await fetchData({ url: `/musics/${id}` });
  return res;
}
