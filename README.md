## client 폴더구조

클라이언트 측 폴더구조만 작성한 문서입니다.

```bash

src
 ┣ @types
 ┃ ┣ audios.d.ts
 ┃ ┗ images.d.ts
 ┣ assets
 ┃ ┗ images
 ┃ ┃ ┣ pause.svg
 ┃ ┃ ┣ play.svg
 ┃ ┃ ┗ ...
 ┣ common # 공통컴포넌트가 위치한 폴더
 ┃ ┗ Space # 요소간의 간격을 표시해주는 공통 스타일 컴포넌트
 ┃ ┃ ┗ Space.tsx
 ┣ components
 ┃ ┣ Main
 ┃ ┃ ┣ Main.tsx #플레이리스트 페이지 뷰
 ┃ ┃ ┗ useMainVM.ts #플레이리스트 페이지의 상태 및 비즈니스 로직
 ┃ ┣ MusicItem
 ┃ ┃ ┗ MusicItem.tsx #음원목록을 구성하는 하나의 음원(상태 및 비즈니스 로직 포함)
 ┃ ┗ MusicPlayer
 ┃ ┃ ┣ MusicPlayer.tsx #오디오 플레이어 뷰
 ┃ ┃ ┗ useMusicPlayerVM.ts #오디오 플레이어의 상태 및 비즈니스 로직
 ┣ services
 ┃ ┣ music-item-services #음원 재생 URL 조회 API 및 hooks
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ useGetMusicItem.ts
 ┃ ┃ ┗ music-item-service.ts
 ┃ ┗ music-list-services #음원 목록 조회 API 및 hooks
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ useGetMusicList.ts
 ┃ ┃ ┗ music-list-services.ts
 ┣ utils
 ┃ ┣  fetchData.ts #API 호출 시에 공통된 부분을 활용가능한 함수
 ┃ ┣  convertDate.ts #날짜 변환 util 함수
 ┃ ┗  convertSecond.ts #시간(초) 변환 util 함수
 ┣ App.test.tsx
 ┣ App.tsx
 ┣ index.css
 ┣ index.tsx
 ┣ react-app-env.d.ts
 ┣ reportWebVitals.ts
 ┗ setupTests.ts

```

## 해결 전략

UI 구성에 따라 컴포넌트를 나누었습니다.

- Main: 플레이리스트 페이지 컴포넌트
- MusicItem: 단일 음원 컴포넌트
- MusicPlayer: 오디오 플레이어 컴포넌트

### 1. API 통신

- API 오류 발생 시 react-query의 isError 값을 통해 '새로고침'을 부탁하는 텍스트 노출
- onError 옵션을 통해 에러 상세를 파악하고 대응할 수 있도록 세팅

- API 로딩 중에는 react-query의 isLoading 값을 통해 '로딩 중'에 해당하는 텍스트 노출
- 해당 상태를 활용하여 UI 상 버튼을 클릭할 수 없도록 css 변경

### 2. 플레이 리스트 페이지

- API를 통해 받아온 음원 목록을 각 음원별로 MusicItem에 연결
- 첫 렌더링 시 MusicItem마다 audio element를 가지고 있지만 내부에 source element는 없는 상태
- 재생버튼 클릭 시에

  - handleControlClick 호출
    - 이미 조작중인 음원을 재생/중지 하는 경우, 소스를 삽입할 필요가 없음
    - 새로운 음원을 요청하는 경우, API 요청하여 받은 음원 소스를 audio element에 삽입
  - (특정 음원이 재생 중인 상태인데, 다른 음원 재생버튼을 누른 경우만 예외적으로 분기하여 처리)
  - 현재 조작중인 상태의 음원 ID 업데이트

- sort 메소드를 활용해 날짜를 비교해서 최신 발매일 순으로 정렬
- date-fns 라이브러리를 사용해 yyyy.MM.dd 형태의 발매일 노출

### 3. 오디오 플레이어

- 현재 조작중인 상태의 음원 ID를 state로 등록해두고, 해당 state가 있는 경우에 노출
- 음원 목록에서 특정 음원을 재생하는 버튼 클릭 시에 해당 음원 정보 및 audio Element 전달
- audio Element 내부 상태정보를 활용해 현재 재생시간, 재생바, 재생버튼 UI 변경되도록 설정
- 재생바 내부 클릭 시에 요소의 좌표를 계산하여 해당 위치로 이동할 수 있도록 설정

- 사파리 내 재생바 색상이 제대로 보이지 않는 문제점 : css를 활용하여 해결

### 4. 최적화 및 관심사 분리

- data fetching과 비즈니스 로직을 뷰와 별도로 관리하여 관심사 분리
- 특정 음원을 클릭한 경우에만 해당 음원의 소스를 불러오도록 설정
- 특정 음원을 재생한 경우 react-query 내 캐싱되어 다시 재생하는 경우 별도의 통신없이 바로 재생가능
- select 옵션을 통해 최신순으로 리스트 데이터를 업데이트하는 로직을 화면 리렌더링과 분리
