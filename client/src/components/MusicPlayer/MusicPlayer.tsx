import styled from '@emotion/styled';
import play from '../../assets/images/play.svg';
import pause from '../../assets/images/pause.svg';
import prev from '../../assets/images/prev.svg';
import prev_gray from '../../assets/images/prev_gray.svg';
import next from '../../assets/images/next.svg';
import next_gray from '../../assets/images/next_gray.svg';
import { Space } from '../../common/Space/Space';
import { MusicInfo } from '../Main/Main';
import { PROGRESS_MAX_VALUE, useMusicPlayerVM } from './useMusicPlayerVM';
import { convertSecond } from '../../utils/convertSecond';

type MusicPlayerProps = {
  info: MusicInfo;
  audioEl: HTMLAudioElement;
  totalMusicCnt: number;
  onClickPlayStatus: (id: string) => void;
  onClickControl: (id: string) => void;
  isLoading: boolean;
  isError: boolean;
};

export function MusicPlayer({
  info,
  audioEl,
  totalMusicCnt,
  onClickPlayStatus,
  onClickControl,
  isLoading,
  isError,
}: MusicPlayerProps) {
  const { isPlaying, curTime, curValue, handleProgressBarClick } =
    useMusicPlayerVM({ info, audioEl });

  if (isError) {
    return (
      <Container>일시적인 오류입니다. 새로고침 부탁드리겠습니다.</Container>
    );
  }

  if (isLoading || !curValue) {
    return <Container>로딩중입니다...</Container>;
  }

  return (
    <Container>
      <img
        src={info.id === '0' ? prev_gray : prev}
        width={30}
        height={25}
        alt={'prev'}
        onClick={() => {
          if (info.id === '0') return;

          onClickControl(`${Number(info.id) - 1}`);
        }}
      />
      <Space right={'20px'} />
      <img
        src={isPlaying ? play : pause}
        width={25}
        height={25}
        alt={isPlaying ? 'play' : 'paused'}
        onClick={() => onClickPlayStatus(info.id)}
      />
      <Space right={'20px'} />
      <img
        src={info.id === `${totalMusicCnt - 1}` ? next_gray : next}
        width={30}
        height={25}
        alt={'next'}
        onClick={() => {
          if (info.id === `${totalMusicCnt - 1}`) return;

          onClickControl(`${Number(info.id) + 1}`);
        }}
      />
      <Space right={'40px'} />
      {info.title}
      <Space right={'40px'} />
      {convertSecond(curTime)}
      <Space right={'40px'} />
      <MusicProgressBar
        curValue={curValue}
        handleProgressBarClick={handleProgressBarClick}
      />
      <Space right={'40px'} />
      {convertSecond(audioEl.duration)}
    </Container>
  );
}

const Container = styled.div`
  width: 80%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 3px solid tomato;
  box-sizing: border-box;
  border-radius: 20px;
  margin-top: 10%;
  padding: 0 20px;

  img {
    cursor: pointer;
  }
`;

const ProgreesBar = styled.progress<{ width: number; height: number }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background-color: white;

  &::-webkit-progress-bar {
    background-color: white;
  }
  &::-webkit-progress-value {
    background-color: tomato;
  }
  &::-moz-progress-bar {
    background-color: tomato;
  }
`;

const MusicProgressBar = ({
  curValue,
  handleProgressBarClick,
}: {
  curValue: number;
  handleProgressBarClick: (
    event: React.MouseEvent<HTMLProgressElement>
  ) => void;
}) => {
  return (
    <ProgreesBar
      value={curValue}
      max={PROGRESS_MAX_VALUE}
      width={PROGRESS_MAX_VALUE}
      height={15}
      onClick={handleProgressBarClick}
    />
  );
};
