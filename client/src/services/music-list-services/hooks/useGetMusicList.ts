import { useQuery } from '@tanstack/react-query';
import { getMusicList } from '../music-list-services';
import { MusicInfo } from '../../../components/Main/Main';

export function useGetMusicList() {
  return useQuery(['/musics'], getMusicList, {
    onError: (err) => {
      // 에러상세 파악 후 조치
    },
    select: (data: MusicInfo[]) => {
      data.sort(
        (a, b) => Date.parse(b.public_date) - Date.parse(a.public_date)
      );

      return data;
    },
  });
}
