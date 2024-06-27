import { useEffect, useRef, useState } from 'react';
import { useGetMusicList } from '../../services/music-list-services/hooks/useGetMusicList';
import { useGetMusicItem } from '../../services/music-item-services/hooks/useGetMusicItem';

export function useMainVM() {
  const [curControlId, setCurControlId] = useState<string>();

  const audioRef = useRef<Record<string, HTMLAudioElement>>({});
  const prevControlIdRef = useRef<string | null>(null);

  const {
    data: listData,
    isLoading: isListDataLoading,
    isError: isListDataError,
  } = useGetMusicList();
  const {
    data: itemData,
    isLoading: isItemDataLoading,
    isError: isItemDataError,
  } = useGetMusicItem({
    id: curControlId,
  });

  const addSource = (id: string) => {
    if (!itemData) return;

    const source = document.createElement('source');
    source.src = itemData.url;
    source.type = 'audio/mp3';
    audioRef.current[id].appendChild(source);
  };

  const changeAudioStatus = (id: string) => {
    const prevControlId = prevControlIdRef.current;

    const curTarget = audioRef.current[id];
    const prevTarget = prevControlId && audioRef.current[prevControlId];

    //멈춤 상태인 경우
    if (curTarget.paused) {
      //새로운 음원의 경우 추가적인 처리(1. 기존 음원 중지 2. 현재 음원 0부터 시작)
      if (prevControlIdRef.current !== id && prevTarget) {
        prevTarget.pause();
        curTarget.currentTime = 0;
      }

      curTarget.play();
      prevControlIdRef.current = id;
      return;
    }

    //재생 중인 경우
    if (curTarget.paused === false) {
      curTarget.pause();
      prevControlIdRef.current = id;
      return;
    }
  };

  const handleControlClick = (id: string) => {
    if (prevControlIdRef.current === id) {
      //이미 조작중인 음원을 재생/중지 하는 경우, 소스를 삽입할 필요가 없음
      changeAudioStatus(id);
      return;
    }

    //새로운 음원을 요청하는 경우, API 요청하여 받은 음원 소스를 audio element에 삽입
    setCurControlId(id);
  };

  useEffect(() => {
    if (curControlId === undefined || isItemDataLoading || isItemDataError)
      return;

    addSource(curControlId);
    changeAudioStatus(curControlId);
  }, [curControlId, isItemDataLoading, isItemDataError]);

  return {
    isListDataLoading,
    isListDataError,
    listData,
    audioRef,
    handleControlClick,
    isItemDataLoading,
    curControlId,
    isItemDataError,
  };
}
