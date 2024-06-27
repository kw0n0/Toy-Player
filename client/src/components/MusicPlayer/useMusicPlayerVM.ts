import { useEffect, useState } from 'react';
import { MusicInfo } from '../Main/Main';

export const PROGRESS_MAX_VALUE = 400;

export function useMusicPlayerVM({
  audioEl,
  info,
}: {
  audioEl: HTMLAudioElement;
  info: MusicInfo;
}) {
  const [curTime, setCurTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const curValue = Math.floor(
    (curTime / audioEl.duration) * PROGRESS_MAX_VALUE
  );

  const handleTimeUpdate = () => {
    setCurTime(audioEl.currentTime);
  };

  const handlePlay = () => {
    setIsPlaying(audioEl.paused);
  };

  const handleProgressBarClick = (
    event: React.MouseEvent<HTMLProgressElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;

    audioEl.currentTime = Math.floor(
      (offsetX * audioEl.duration) / PROGRESS_MAX_VALUE
    );
  };

  useEffect(() => {
    audioEl.addEventListener('timeupdate', handleTimeUpdate);
    audioEl.addEventListener('play', handlePlay);
    audioEl.addEventListener('pause', handlePlay);

    return () => {
      audioEl.removeEventListener('timeupdate', handleTimeUpdate);
      audioEl.addEventListener('play', handlePlay);
      audioEl.addEventListener('pause', handlePlay);
    };
  }, [info.id]);

  return {
    isPlaying,
    curTime,
    curValue,
    handleProgressBarClick,
  };
}
