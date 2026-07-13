# TODAY.

오늘의 할 일과 감정을 함께 기록하는 데일리 투두 & 무드 트래커입니다.
단순히 할 일을 체크하는 앱이 아니라, 하루의 생산성과 감정 상태를 같은 날짜 기준으로 연결해 기록할 수 있도록 만들었습니다.

기존에 제작했던 Todo앱을 리뉴얼하며 TypeScript, TanStack Query, Zustand, Supabase를 적용하여
날짜별 Todo 관리와 Mood Tracker 기능을 추가했습니다.

## 배포 링크
- Demo: 준비 중
- GitHub: 준비 중

## 주요 기능

- 사용자 이름 기반으로 개인 기록 관리
- 날짜별 할 일 추가, 수정, 완료, 삭제
- 완료 / 미완료 / 전체 필터링
- 드래그 앤 드롭을 통한 할 일 순서 변경
- 완료된 할 일은 자동으로 하단 정렬
- 날짜별 기분 선택 및 메모 작성
- 캘린더에서 날짜별 감정 기록 확인
- 로딩 / 에러 상태 처리 및 재시도 UI
- 다크 모드 대응 UI

## 기술 스택

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Zustand
- TanStack Query

### Backend / Database
- Supabase

### UI / Interaction
- dnd-kit
- DayPicker
- dayjs
- react-icons

## 구현 포인트

### 서버 상태와 클라이언트 상태 분리

할 일과 기분 기록은 Supabase에서 관리하고, 서버 상태는 TanStack Query로 관리했습니다.  
사용자 이름과 선택 날짜처럼 여러 화면에서 공유되는 UI 상태는 Zustand로 분리했습니다.

이를 통해 데이터 요청, 캐싱, 재요청 로직과 전역 UI 상태를 명확히 나누었습니다.

### 날짜 중심의 데이터 구조

투두와 무드 데이터를 모두 `user_name`과 `date` 기준으로 조회하도록 구성했습니다.  
사용자는 날짜를 이동하면서 해당 날짜의 할 일과 감정 기록을 확인할 수 있습니다.

### 할 일 정렬 UX

할 일을 완료하면 미완료 항목은 위로, 완료 항목은 아래로 자동 정렬되도록 구현했습니다.  
또한 정렬 모드에서는 dnd-kit을 사용해 미완료 항목의 순서를 직접 변경할 수 있게 했습니다.

### 에러와 로딩 상태 처리

데이터를 불러오는 동안 로딩 문구를 보여주고, 요청 실패 시 다시 시도할 수 있는 UI를 제공했습니다.  
단순 CRUD 구현에서 끝나지 않고 실제 사용 흐름에서 발생할 수 있는 상태를 화면에 반영했습니다.

## 폴더 구조

```txt
src
├─ components
│  ├─ todo
│  └─ mood
├─ hooks
├─ pages
├─ services
├─ store
├─ types
└─ utils