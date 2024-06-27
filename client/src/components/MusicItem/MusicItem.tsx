import { forwardRef, useState } from 'react';
import play from '../../assets/images/play.svg';
import pause from '../../assets/images/pause.svg';
import styled from '@emotion/styled';
import { Space } from '../../common/Space/Space';
import { MusicInfo } from '../Main/Main';
import { convertDate } from '../../utils/convertDate';

type MusicItemProps = {
  item: MusicInfo;
  onClickControl: (id: string) => void;
  isItemDataLoading: boolean;
  isCurPlaying: boolean;
};

const MusicItem = forwardRef(
  (
    { item, onClickControl, isItemDataLoading, isCurPlaying }: MusicItemProps,
    ref: any
  ) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const handleAudioStatusChange = () => {
      setIsPlaying(!ref.current[item.id].paused);
    };

    return (
      <Container
        key={item.id}
        onClick={() => onClickControl(item.id)}
        isCurPlaying={isCurPlaying}
      >
        {isCurPlaying && (
          <img
            width={15}
            height={15}
            src={isPlaying ? play : pause}
            alt={''}
            onClick={() => handleAudioStatusChange()}
          />
        )}
        <LeftSide isLoading={isItemDataLoading}>
          <img
            width={55}
            height={55}
            src={item.album_image}
            alt="album image"
          />
          <Space right={'35px'} />
          <div>{item.title}</div>
        </LeftSide>
        <RightSide>
          <Space right={'35px'} />
          <div>{`${item.genre}`}</div>
          <Space right={'35px'} />
          <div>{convertDate(item.public_date)}</div>
          <audio ref={(el) => (ref.current[item.id] = el)}></audio>
        </RightSide>
      </Container>
    );
  }
);

const Container = styled.div<{ isCurPlaying: boolean }>`
  display: flex;
  position: relative;
  justify-content: space-between;
  height: 70px;
  align-items: center;
  border-radius: 15px;
  padding: 0 20px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  transition: transform 0.3s ease-in-out, margin 0.3s ease-in-out;
  z-index: ${({ isCurPlaying }) => (isCurPlaying ? 2 : 1)};
  overflow: visible;
  transform: ${({ isCurPlaying }) => isCurPlaying && 'scale(1.4)'};
  margin: ${({ isCurPlaying }) => isCurPlaying && '30px 0'};
  cursor: pointer;

  :hover {
    transform: scale(1.4);
    z-index: 2;
    margin: 30px 0;
    background-color: rgb(255, 99, 71, 0.5);
  }

  > img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: -30px;
  }
`;

const LeftSide = styled.div<{ isLoading: boolean }>`
  display: flex;
  align-items: center;

  > img {
    border-radius: 50%;
  }
`;

const RightSide = styled.div`
  display: flex;
`;

export default MusicItem;
