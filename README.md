# WI-FINE TECH — GitHub 배포용 홈페이지

2026-10-21 / 최신 반영 버전: 27
원본 커밋: 565f1bebea5a0d58c23604de774ee5bd40cb9572

청주 본사·예산공장 홈페이지의 HTML, CSS, JavaScript, 이미지와 A2Z 웹폰트를 포함합니다.
별도 빌드나 npm 설치가 필요 없는 정적 웹사이트입니다. 기존 ChatGPT 사이트는 변경하지 않습니다.

## 1. 압축 풀기

ZIP을 다운로드한 뒤 Windows에서 마우스 오른쪽 버튼 → 모두 압축 풀기를 선택합니다.
압축이 풀린 폴더 안에서 index.html, cheongju.html, yesan.html, assets 폴더가 보이는지 확인합니다.
ZIP 파일 자체를 GitHub에 올리는 것만으로는 홈페이지가 열리지 않습니다. 압축을 푼 파일을 올려야 합니다.

## 2. GitHub Desktop으로 업로드하기

파일이 100개를 넘으므로 웹브라우저에서 한 번에 올리는 대신 GitHub Desktop을 이용하는 방법입니다.

1. https://desktop.github.com/ 에서 Windows용 GitHub Desktop을 설치합니다.
2. GitHub 계정으로 로그인합니다.
3. GitHub Desktop 메뉴에서 File → New repository를 선택합니다.
4. Name에 wifinetech-website 를 입력합니다. 이미 사용 중인 이름이라면 다른 이름을 선택합니다.
5. Local path에는 문서 폴더 등 기억하기 쉬운 위치를 선택합니다. Create repository를 클릭합니다.
6. Repository → Show in Explorer로 생성된 저장소 폴더를 엽니다.
7. 압축을 푼 폴더의 **내용물 전체**를 저장소 폴더에 복사합니다. 저장소 폴더 바로 안에 index.html이 있어야 합니다. 압축 해제 폴더 자체를 한 겹 더 넣지 마세요.
8. .nojekyll과 .gitignore도 복사합니다. 보이지 않으면 탐색기의 숨긴 항목 표시를 켭니다. 기존 저장소의 .git 폴더는 건드리지 않습니다.
9. GitHub Desktop으로 돌아오면 변경 파일이 표시됩니다. Summary에 'Upload Wifinetech website'를 입력합니다.
10. Commit to main을 클릭합니다. 저장소의 기본 브랜치 이름이 다르면 해당 브랜치로 표시됩니다.
11. Publish repository를 클릭합니다.
12. 'Keep this code private' 체크 여부를 결정합니다. 체크를 해제하면 소스와 포함된 이미지가 공개됩니다. 회사 정책에 맞게 선택하세요. 비공개 저장소의 Pages 이용 가능 여부는 계정 플랜에 따라 다릅니다.
13. Publish repository를 클릭해 업로드합니다.

이 작업은 GitHub에 파일을 저장하는 단계입니다. 아래 Pages 설정까지 해야 웹사이트 주소가 생깁니다.

## 3. GitHub Pages 켜기

1. 브라우저에서 방금 업로드한 GitHub 저장소를 엽니다.
2. Settings → 왼쪽 메뉴 Pages로 이동합니다.
3. Build and deployment의 Source에서 Deploy from a branch를 선택합니다.
4. Branch에서 main, 폴더에서 /(root)를 선택합니다. 기본 브랜치가 다른 경우 파일을 업로드한 브랜치를 선택합니다.
5. Save를 클릭합니다.
6. 배포가 끝나면 Pages 화면에 표시되는 Visit site를 클릭합니다. 주소가 표시될 때까지 잠시 기다린 뒤 새로고침합니다.

일반적인 프로젝트 주소 형식: https://사용자명.github.io/wifinetech-website/
실제 주소는 Pages 화면에 표시되는 값을 사용하세요.

첫 화면은 index.html이며, 청주 본사·예산공장 선택 화면입니다.
청주 본사: cheongju.html / 예산공장: yesan.html
GitHub Pages에서는 .html이 붙은 링크를 사용하세요. 기존 서비스의 /cheongju 같은 확장자 없는 주소 자동 처리는 포함하지 않습니다.

## 4. 반드시 확인할 항목

- 로그아웃 또는 시크릿 창에서 첫 화면 접속
- 청주·예산 이동과 메뉴 클릭
- 한국어·영어·중국어 변경
- 모바일 화면과 제품 이미지 확대
- 지도·전화·이메일 링크
- 상담문의 버튼: 이메일 앱이 열리고 사용자가 앱에서 발송해야 접수됩니다. 서버 전송/문의 저장 기능은 없습니다.

현재 디자인은 보고·검토용 프로토타입입니다. 정식 회사 홈페이지로 운영하기 전 제품 설명·규격·인증·번역과 이미지·웹폰트 사용권을 회사 담당자가 최종 확인하세요. 생성된 공장 이미지는 콘셉트 이미지이며 실제 시설 사진이 아닙니다.

## 5. 이후 수정하는 방법

수정된 파일을 같은 저장소 폴더에 덮어쓴 뒤 GitHub Desktop에서 변경 내용 확인 → Commit → Push origin을 누릅니다. Pages는 설정한 브랜치의 변경본을 다시 배포합니다.
삭제된 파일은 함께 제거해야 합니다. 현재 패키지는 회사 도메인 연결이나 기존 호스팅 전환을 실행하지 않습니다.
GitHub에 업로드한 뒤 Work의 기존 사이트와 자동으로 양방향 동기화되지는 않습니다.

## 구성

- index.html 및 15개 상세 HTML: 홈페이지 화면
- assets/: 디자인, 동작, 이미지, 폰트
- .nojekyll: 별도 Jekyll 처리 없이 정적 파일 제공
- .gitignore: 환경 파일·임시 압축파일 제외
- README.md: 이 안내문
- RELEASE.json: 버전·파일 출처

## 참고 공식 문서

- https://docs.github.com/en/desktop/overview/creating-your-first-repository-using-github-desktop
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository

GitHub 웹브라우저 업로드는 한 번에 최대 100개 파일, 파일당 25 MiB 제한이 있으므로 이 패키지는 Desktop 업로드를 안내합니다.
