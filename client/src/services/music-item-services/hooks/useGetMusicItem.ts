import { useQuery } from '@tanstack/react-query';
import { getMusicItem } from '../music-item-service';

export function useGetMusicItem({ id }: { id?: string }) {
  return useQuery<{ url: string }>(
    ['/musics/:musicId', id],
    () => getMusicItem({ id }),
    {
      enabled: id !== undefined,
      onError: (err) => {
        // 에러상세 파악 후 조치
      },
    }
  );
}
