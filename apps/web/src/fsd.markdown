// textmy-app/
// ├── app/ # Next.js app 폴더
// │ ├── layout.tsx
// │ ├── page.tsx
// │ └── ... (기타 라우팅 관련 파일)
// ├── src/ # 소스 코드 폴더
// │ ├── app/ # FSD app 폴더
// │ │ ├── providers/ # 앱 전역에서 사용하는 Provider
// │ │ ├── styles/ # 전역 스타일
// │ │ └── types/ # 전역 타입 선언
// │ ├── entities/ # 비즈니스 엔티티 (예: 사용자, 리뷰, 댓글 등)
// │ ├── features/ # 비즈니스 로직 기능 (예: 인증, 결제 등)
// │ ├── pages/ # FSD 페이지 폴더
// │ │ └── ... (각 페이지 별 폴더)
// │ ├── shared/ # 재사용 가능한 컴포넌트와 유틸리티
// │ │ ├── ui/ # 재사용 가능한 UI 컴포넌트
// │ │ ├── api/ # 백엔드와의 상호작용
// │ │ ├── config/ # 환경 변수
// │ │ └── utils/ # 유틸리티 함수
// │ ├── widgets/ # 독립적인 UI 컴포넌트 (예: 헤더, 푸터 등)
// │ └── ... (기타 필요한 폴더)
// └── public/ # 정적 파일 (이미지, 폰트 등)
