import styled from '@emotion/styled';
import MusicItem from '../MusicItem/MusicItem';
import { useMainVM } from './useMainVM';
import { MusicPlayer } from '../MusicPlayer/MusicPlayer';

export type MusicInfo = {
  id: string;
  title: string;
  genre: string;
  moods: string[];
  public_date: string;
  album_image: string;
};

export default function Main() {
  const {
    curControlId,
    listData,
    audioRef,
    handleControlClick,
    isItemDataLoading,
    isItemDataError,
    isListDataLoading,
    isListDataError,
  } = useMainVM();

  if (isListDataLoading) {
    return <NoticeText>로딩중입니다...</NoticeText>;
  }

  if (isListDataError) {
    return (
      <NoticeText>일시적인 오류입니다. 새로고침 부탁드리겠습니다.</NoticeText>
    );
  }

  return (
    <Container>
      {curControlId && (
        <MusicPlayer
          info={
            listData?.find(
              (item: MusicInfo) => item.id === curControlId
            ) as MusicInfo
          }
          audioEl={audioRef.current[curControlId]}
          totalMusicCnt={listData?.length as number}
          onClickPlayStatus={handleControlClick}
          onClickControl={handleControlClick}
          isLoading={isItemDataLoading}
          isError={isItemDataError}
        />
      )}
      <MusicListContainer>
        {listData?.map((item: MusicInfo) => {
          return (
            <MusicItem
              key={item.id}
              ref={audioRef}
              item={item}
              onClickControl={handleControlClick}
              isItemDataLoading={isItemDataLoading && Boolean(curControlId)}
              isCurPlaying={curControlId === item.id}
            />
          );
        })}
      </MusicListContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
`;

const MusicListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  font-weight: 500;
  padding: 0 0 120px;
  margin-top: 10%;

  span {
    font-size: 20px;
    font-weight: 900;
  }
`;

const NoticeText = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  font-size: 30px;
  align-items: center;
  justify-content: center;
`;
