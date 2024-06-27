import { fetchData } from "../../utils/fetchData";

export async function getMusicList() {
  const res = await fetchData({ url: `/musics` });

  return res.items;
}
