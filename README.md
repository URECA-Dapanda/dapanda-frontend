## 🐼 모두가 참여할 수 있는 무선데이터 공유 플랫폼, DAPANDA
<img width="1920" height="1080" alt="readme-main" src="https://github.com/user-attachments/assets/6a41d719-2ad2-4bd3-af70-8654296c6d69" />

### 🧾 프로젝트 개요

- **프로젝트 명**: **DaPanDa**
- **팀명**: 다판다
- **개발 기간**: 2025.06.30 (월) ~ 2025.08.08 (금)

DaPanDa는 무선 데이터를 개인 간에 자유롭게 사고팔 수 있도록 설계된 디지털 거래 플랫폼입니다.  
**기본 거래 / 자투리 구매 / 분할 판매** 등 다양한 거래 방식과,  
**지도 기반 Wi-Fi 거래**, **실시간 채팅**, **FCM 알림**, **결제 시스템**까지 통합되어 있습니다.

###  🚀 배포 링크

- 🌐 **서비스 바로가기**: [https://dapanda.org](https://dapanda.org)

### ✨ 핵심 기능 요약

- **소셜 로그인 및 마이페이지 기반 인증/인가 시스템**
- **데이터 / 와이파이 상품 등록 및 실시간 거래**
- **실시간 채팅 기능 및 거래 알림 시스템**
- **PG 연동 결제 시스템 + 캐시 충전 및 환불**
- **리뷰 등록 / 신고 접수 / 관리자 제재 시스템**
<br/>

## ⚙️ 기술 스택

| Category         | Technologies |
|------------------|--------------|
| **Frontend**     | ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=radixui&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-EF4444?style=for-the-badge&logo=framer&logoColor=white) ![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white) |
| **State Management** | ![Zustand](https://img.shields.io/badge/Zustand-F59563?style=for-the-badge&logo=zoo&logoColor=white) ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) |
| **Data Handling** | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white) ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white) |
| **Performance**   | ![TanStack Virtual](https://img.shields.io/badge/@tanstack/react--virtual-3178C6?style=for-the-badge&logo=react&logoColor=white) ![Dynamic Import](https://img.shields.io/badge/Dynamic_Import-000000?style=for-the-badge&logo=javascript&logoColor=white) ![Code Splitting](https://img.shields.io/badge/Code_Splitting-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) |
| **Styling & UI** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![Shadcn UI](https://img.shields.io/badge/Shadcn_UI-000000?style=for-the-badge&logo=radixui&logoColor=white) ![Lucide](https://img.shields.io/badge/Lucide-000000?style=for-the-badge&logo=lucide&logoColor=white) |
| **Testing**       | ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) ![RTL](https://img.shields.io/badge/React_Testing_Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white) ![MSW](https://img.shields.io/badge/MSW-FF6A33?style=for-the-badge&logo=msw&logoColor=white) |
| **CI/CD**         | ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) |
| **PWA / Push**    | ![Firebase Cloud Messaging](https://img.shields.io/badge/FCM-FFCA28?style=for-the-badge&logo=firebase&logoColor=black) ![Web Push API](https://img.shields.io/badge/Web_Push_API-2D9ED6?style=for-the-badge&logo=pushbullet&logoColor=white) |
| **Analytics**     | ![Hotjar](https://img.shields.io/badge/Hotjar-FF3C2E?style=for-the-badge&logo=hotjar&logoColor=white) ![Vercel Analytics](https://img.shields.io/badge/Vercel_Analytics-000000?style=for-the-badge&logo=vercel&logoColor=white) |
| **Collaboration** | ![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white) ![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) |


## 📁 프로젝트 디렉토리 구조

```
dapanda-frontend/
├── 📄 commitlint.config.js         # 💬 커밋 메시지 린트 설정
├── 📄 components.json              # 🧩 컴포넌트 관련 설정 파일
├── 📄 eslint.config.mjs            # 🔧 ESLint 설정
├── 📄 jest.config.ts               # 🧪 Jest 설정 파일
├── 📄 next.config.ts               # ⚙️ Next.js 설정 파일
├── 📄 package.json                 # 📦 프로젝트 의존성 및 스크립트 정의
├── 📄 package-lock.json            # 📌 의존성 버전 고정 파일
├── 📄 postcss.config.js            # 🎨 PostCSS 설정
├── 📄 setupTests.ts                # 🧪 테스트 환경 초기 설정 (예: MSW, RTL 등)
├── 📁 public/                      # 🖼️ 정적 파일(이미지, 아이콘 등)
├── 📄 README.md                    # 📘 프로젝트 소개 및 설명
├── 📁 src/                         # 💡 소스 코드 디렉토리
│   ├── 📁 apis/                    # 🌐 API 요청 관련 함수
│   ├── 📁 app/                     # 🧭 Next.js 앱 라우트 및 글로벌 설정
│   │   ├── 📁 (home)/              # 🏠 홈(메인) 페이지
│   │   ├── 📁 chat/                # 💬 채팅 페이지
│   │   ├── 📁 data/                # 📊 데이터 관련 페이지
│   │   ├── 📁 map/                 # 🗺️ 지도 관련 페이지
│   │   ├── 📄 globals.css          # 🎨 전역 스타일
│   │   ├── 📄 layout.tsx           # 📐 전체 레이아웃 컴포넌트
│   ├── 📁 components/              # 🧱 공통 UI 컴포넌트
│   │   ├── 📁 common/              # 🛠️ 범용 공통 컴포넌트 (버튼, 카드, 모달 등)
│   │   ├── 📁 ui/                  # 🧩 UI 라이브러리 래핑 컴포넌트
│   ├── 📁 constrants/              # 🔒 전역 상수 정의
│   ├── 📁 feature/                 # 🧠 도메인별 비즈니스 로직 및 컴포넌트
│   │   ├── 📁 chat/                # 💬 채팅 관련
│   │   ├── 📁 data/                # 📊 데이터 관련
│   │   │   ├── 📁 api/             # 🌐 데이터 관련 API 요청 함수
│   │   │   ├── 📁 components/      # 🧱 데이터 페이지 UI 컴포넌트
│   │   │   │   └── 📁 sections/    # 🔳 UI 세부 섹션별 컴포넌트 (필터, 상품 등)
│   │   │   ├── 📁 constrants/      # 🔒 데이터 도메인 상수
│   │   │   ├── 📁 hooks/           # 🪝 데이터 도메인 커스텀 훅
│   │   │   ├── 📁 stores/          # 🗂️ 데이터 도메인 전역 상태 관리 (Zustand 등)
│   │   │   ├── 📁 types/           # 📝 데이터 도메인 타입 정의
│   │   ├── 📁 home/                # 🏠 홈 관련
│   │   ├── 📁 landing/             # 🚀 랜딩 페이지 관련
│   │   ├── 📁 map/                 # 🗺️ 지도 관련
│   │   ├── 📁 mypage/              # 👤 마이페이지 관련
│   │   ├── 📁 profile/             # 🧑 프로필 관련
│   ├── 📁 hooks/                   # 🪝 전역 커스텀 훅 모음
│   ├── 📁 lib/                     # ⚙️ 유틸리티 함수 및 라이브러리
│   ├── 📁 stores/                  # 🗂️ 전역 상태 관리 (Zustand 등)
│   ├── 📁 styles/                  # 🎨 스타일 관련 파일
│   ├── 📁 types/                   # 📝 타입스크립트 전역 타입 정의
│   ├── 📁 __tests__/               # 🧪 테스트 코드 디렉토리 (단위 테스트, 통합 테스트)
│   │   ├── 📄 example.test.tsx     # 🔍 테스트 예시 파일
│   ├── 📁 mocks/                   # 🧪 Mock 서버 관련 (예: MSW 핸들러, 서버)
│   │   ├── 📄 server.ts            # 🧪 MSW 서버 설정
│   │   ├── 📄 handlers.ts          # 🧪 API 핸들러 정의
├── 📄 tailwind.config.js           # 💅 TailwindCSS 설정
├── 📄 tsconfig.json                # 🧾 타입스크립트 설정
```


## [📚 Github Wiki]

더 상세한 내용은 GitHub 위키(📖 Wiki)에 정리되어 있습니다!
👉 [📖 위키 바로가기](https://github.com/URECA-Dapanda/dapanda-frontend/wiki)

## 📌 역할 분담

<table style="width:100%; max-width:800px; table-layout:fixed; text-align:center; margin:auto;">
  <tr>
    <td style="width:25%; padding:10px;">
      <a href="https://github.com/6v6DS">
        <img src="https://avatars.githubusercontent.com/u/142214903?v=4" width="100%" />
      </a>
    </td>
    <td style="width:25%; padding:10px;">
      <a href="https://github.com/Jetty-Lee">
        <img src="https://avatars.githubusercontent.com/u/125029488?v=4" width="100%" />
      </a>
    </td>
    <td style="width:25%; padding:10px;">
      <a href="https://github.com/yunhyuk-choi">
        <img src="https://avatars.githubusercontent.com/u/194174257?v=4" width="100%" />
      </a>
    </td>
    <td style="width:25%; padding:10px;">
      <a href="https://github.com/illustermin">
        <img src="https://avatars.githubusercontent.com/u/134802163?v=4" width="100%" />
      </a>
    </td>
  </tr>
  <tr>
    <td>
      <strong>김다슬<br><code>(FE)</code></strong><br/>
      Figma Design<br/>
      지도 기능 구현<br/>
      와이파이 부분 구현
    </td>
    <td>
      <strong>이주희<br><code>(FE)</code></strong><br/>
      Figma Design<br/>
	    결제 기능 구현 <br/>
	    일반/분할/자투리 구매 부분 구현<br/>
	    FCM 푸시 알림 기능 구현<br/>
	  </td>
    <td>
      <strong>최윤혁<br><code>(FE)</code></strong><br/>
      Frontend 개발 환경 구성<br/>
      Jira 구성<br/>
      회원 기능 구현<br/>
      마이페이지 구현
    </td>
    <td>
      <strong>홍민주<br><code>(FE)</code></strong><br/>
      Figma Design<br/>
      채팅 기능 구현<br/>
      온보딩 구현<br/>
    </td>
  </tr>
</table>

## 📌 시작하기

### 1. 패키지 설치

```bash
npm install
````


### 2. 실행 방법

#### 2.1 개발 환경 실행

```bash
npm run dev
```

#### 2.2 프로덕션 빌드 및 실행

```bash
npm run build
# 빌드 완료 후 실행
npm start
```


### 3. 접속

아래 주소로 접속:

[http://localhost:3000](http://localhost:3000)

[https://dapanda.org](https://dapanda.org)

<br/>
