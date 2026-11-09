# Sakutto

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/mhlbjjijfkoghmcjndgdimhdlfkhadfl?logo=googlechrome&logoColor=white&label=Chrome%20Web%20Store)](https://chrome.google.com/webstore/detail/mhlbjjijfkoghmcjndgdimhdlfkhadfl)
[![Chrome Web Store users](https://img.shields.io/chrome-web-store/users/mhlbjjijfkoghmcjndgdimhdlfkhadfl?label=users)](https://chrome.google.com/webstore/detail/mhlbjjijfkoghmcjndgdimhdlfkhadfl)
[![GitHub stars](https://img.shields.io/github/stars/jammaru/sakutto?style=flat&logo=github)](https://github.com/jammaru/sakutto/stargazers)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Discord](https://img.shields.io/badge/Discord-join-5865F2?logo=discord&logoColor=white)](https://discord.gg/pdSRBaSr38)
[![Last commit](https://img.shields.io/github/last-commit/jammaru/sakutto)](https://github.com/jammaru/sakutto/commits/main)

Sakutto는 웹 페이지를 기기 안에서 한국어와 영어로 번역하는 비공식 Chrome 확장 프로그램입니다. [PLaMo 3 Translate](https://huggingface.co/pfnet/plamo-3-translate-0.8b-GGUF)를 고정한 [wllama](https://github.com/ngxson/wllama) 빌드로 실행합니다. 번역된 모든 줄은 PLaMo가 씁니다. 모델이 준비되기 전에는 다른 엔진의 초안을 보여 주지 않고 원문을 그대로 둡니다. 한국어와 영어는 그 모델에 남습니다. Preferred Networks, Inc.와는 관계가 없습니다. Built with PLaMo.

이 확장 프로그램은 무료 오픈 소스(MIT)입니다. 광고도 유료 기능도 없습니다. 모델 가중치는 이 저장소에도 확장 프로그램 패키지에도 들어 있지 않습니다.

## 설치

Chrome 웹 스토어에서 Sakutto를 설치합니다.

https://chrome.google.com/webstore/detail/mhlbjjijfkoghmcjndgdimhdlfkhadfl

직접 빌드해서 불러오려면:

1. Node.js 24와 pnpm 12를 설치합니다.
2. 이 저장소를 복제하고 `pnpm install`을 실행합니다.
3. 번역 런타임과 확장 프로그램을 빌드합니다 ([빌드](#빌드)를 보세요).
4. `chrome://extensions`를 엽니다.
5. **개발자 모드**를 켭니다.
6. **압축해제된 확장 프로그램을 로드합니다**를 고릅니다.
7. 이 저장소의 `.output/chrome-mv3` 디렉터리를 선택합니다.

## 단축키

| 동작                                  | Windows / Linux | Mac          |
| ------------------------------------- | --------------- | ------------ |
| 페이지를 번역하거나 원문으로 되돌리기 | Alt+A           | Option (⌥)+A |
| 바꿔 넣기와 원문 병기 사이를 전환하기 | Alt+B           | Option (⌥)+B |
| 선택한 글 번역하기                    | Alt+S           | Option (⌥)+S |
| 입력 중인 글 번역하기                 | Alt+T           | Option (⌥)+T |
| 입력한 글 번역하기 (입력 번역 페이지) | Ctrl+Enter      | ⌘+Enter      |

같은 동작은 도구 모음 팝업과 오른쪽 클릭 메뉴에도 있습니다. 키는 Chrome이 보관하므로 Chrome 자신의 편집기에서 바꿉니다. 설정 페이지의 **키보드 단축키**와 팝업의 **단축키 변경**이 모두 `chrome://extensions/shortcuts`를 엽니다. 팝업의 키 목록과 번역 버튼의 힌트는 그곳에 묶은 키를 따릅니다. Chrome은 확장 프로그램 단축키의 Alt를 Mac에서 Option으로 읽으므로 글자는 같습니다. Alt+D는 Windows와 Linux의 Chrome이 주소 표시줄에 쓰므로 기본값이 아닙니다.

## 입력 중인 글

메시지 상자, 텍스트 영역, 그 밖의 편집 가능한 칸에 포커스가 있으면 Alt+T(Mac에서는 Option+T) 또는 칸 옆의 한A 버튼이 입력 중인 글의 기기 내 번역을 미리 봅니다. 같은 단축키를 다시 누르거나 Ctrl+Enter(Mac에서는 ⌘+Enter)로 바꿉니다. 원래대로는 초안을 되돌립니다. 미리보기에 언어 메뉴가 있고, 설정에서 미리보기를 생략하면 단축키 한 번에 번역하고 바꿉니다. 한국어 초안은 영어로 가고(대상이 한국어가 아니면 저장한 대상으로), 그 외는 저장한 대상을 쓰다가 다른 언어를 고르면 그 언어로 갑니다. 비밀번호 칸과 번역하지 않도록 한 사이트는 그대로 둡니다. 한A 버튼은 설정에서 숨길 수 있습니다. Chrome이 명령에 키를 주지 않아도, Sakutto에서 그 단축키를 끄지 않으면 페이지에서는 기본 키가 동작합니다. 페이지 번역과 같은 PLaMo 모델을 쓰며, 내장 번역기는 쓰지 않습니다.

팝업에 **입력한 글 번역** 버튼이 있고, 옵션 페이지에도 같은 버튼이 있습니다. 원문 칸과 결과 칸이 있는 작은 확장 프로그램 페이지를 열어서, 페이지를 건드리지 않고 문단을 입력하거나 붙여 넣어 번역합니다. 페이지 번역과 같은 PLaMo 모델, 같은 라이선스 동의, 같은 불러오기 절차를 쓰고, 방향도 같은 대상 언어 설정을 따릅니다. 그곳에서는 내장 번역기를 쓰지 않습니다. 입력한 글은 PLaMo만 번역하고, PLaMo가 지원하지 않는 언어는 Chrome에 조용히 넘기지 않고 그 페이지에서 거절합니다. 결과에는 복사 버튼이 있습니다.

## 언어

이 포크는 한국어와 영어를 번역합니다. 원문 언어는 페이지에서 판정합니다. 기본 대상은 브라우저 UI가 한국어이면 한국어이고, 그 외에는 영어입니다. 페이지가 이미 그 언어이면 대상은 쌍의 다른쪽으로 바뀝니다. 팝업에서 현재 사이트의 대상을 한국어 또는 영어로 정할 수 있습니다.

PLaMo 3 Translate는 53개 언어를 번역할 수 있습니다. 설정에서 고를 수 있는 언어는 한국어와 영어뿐이라, 다른 언어의 페이지도 그 둘 중 하나로 번역됩니다. 한국어와 영어에는 Chrome 내장 번역기를 쓰지 않습니다.

화면 문구 자체는 14개 언어로 번역되어 있습니다. 영어, 일본어, 한국어, 중국어(간체와 번체), 스페인어, 포르투갈어(브라질), 프랑스어, 독일어, 이탈리아어, 러시아어, 베트남어, 태국어, 인도네시아어입니다. Chrome은 브라우저 UI 언어에 맞는 카탈로그를 고르고, 없으면 영어로 돌아갑니다. 언어를 추가하려면 [docs/TRANSLATING.md](docs/TRANSLATING.md)를 보세요.

## 개인정보

번역은 기기 안에서 실행됩니다. 확장 프로그램은 페이지 본문, 선택 영역, 용어집, 번역문을 개발자나 번역 서버로 보내지 않으며, 계정, 광고, 원격 측정도 없습니다. 확장 프로그램 자신의 네트워크 요청은 Hugging Face에서 모델을 받는 것뿐입니다. 정책은 [PRIVACY.md](PRIVACY.md) 또는 https://jammaru.com/sakutto/privacy/ 에 있습니다.

## 빌드

```bash
pnpm install
pnpm build:wllama   # once, with Docker; see docs/BUILDING.md
pnpm verify:wllama
pnpm build          # production build in .output/chrome-mv3
pnpm zip            # Chrome Web Store zip in .output
```

`pnpm build:wllama`는 고정한 wllama 커밋 `d275dac`를 `emscripten/emsdk:4.0.20` 컨테이너 안에서 컴파일합니다. wasm, 워커, 모델 가중치는 커밋하지 않습니다. `pnpm build`와 `pnpm zip`은 그 빌드가 확인되기 전에는 실행을 거절합니다. `pnpm zip`은 패키지에 런타임과 라이선스 문구가 들어 있는지, 모델 가중치, 소스 맵, 설치 시점의 호스트 권한이 없는지도 확인합니다.

```bash
pnpm dev            # development build
pnpm lint
pnpm typecheck
pnpm test
pnpm test:e2e       # local fixtures; does not download the model
```

`pnpm test:e2e`는 페이지 안에서 번역하는 테스트 패키지를 빌드합니다. 그 패키지는 릴리스 빌드가 아닙니다. 릴리스 빌드에는 테스트용 번역기가 들어 있지 않습니다.

`pnpm bench`는 빌드한 확장 프로그램을 헤드리스 Chromium(Playwright의 Chrome for Testing 빌드. 브랜드 Chrome은 `--load-extension`을 거절합니다)에 불러와, 실제 0.8B 모델로 고정된 로컬 페이지 네 개를 번역합니다. 긴 기사, 뉴스 기사, 문서 페이지, 클라이언트에서 그리는 페이지입니다. 첫 토큰까지의 시간과 출력 속도를 보는 짧은 엔진 프로브도 실행합니다. `--pages-only`, `--engine-only`, `--sweep`(스레드, 컨텍스트, 배치 크기)를 넘길 수 있습니다. 모델은 SHA-256 확인 뒤에 `bench/.cache/`에 캐시됩니다. 하네스가 로컬 페이지를 스크립트로 다루려면 먼저 `SAKUTTO_E2E_REAL=1 pnpm build`로 빌드합니다. 결과는 `bench/results/`에 씁니다.

`pnpm bench:mock`과 `pnpm bench:live`는 읽는 사람이 기다리는 시간으로 페이지 전체를 잽니다. [bench/pages](bench/pages)의 아홉 개 픽스처가 각각 다른 비용을 가릅니다(긴 기사, 짧은 첫 문단과 긴 나머지, 짧은 카드 여러 개, 매우 긴 문단 하나, 사이드바, 섞인 UI, 기사 헤더 안의 제목, 영어로 향하는 한국어 기사, 늦게 붙는 내용). 영어 페이지 여덟 개는 한국어로 향합니다. 새 실측은 예전 영어에서 일본어로 가던 기록과 비교하지 않습니다. 실행할 때마다 `bench/history/pages.jsonl`에 이어 붙으므로, 나중 커밋을 같은 페이지에서 이전 커밋과 견줄 수 있습니다. `pnpm bench:serve`는 그 픽스처를 자신의 브라우저에서 엽니다. 지표, 모크와 실모델의 차이, 픽스처를 추가하는 방법은 [bench/README.md](bench/README.md)에 있습니다.

`pnpm icons`는 `scripts/generate-icons.mjs`에서 PNG 아이콘을 다시 만듭니다.

`pnpm i18n:check`는 `public/_locales`의 모든 카탈로그를 영어와 비교해 빠진 키, 자리 표시자 토큰, 빈 메시지를 찾습니다. `pnpm i18n:draft <catalog> <language>`는 확장 프로그램이 실어 나르는 같은 PLaMo 모델로 영어에서 카탈로그 초안을 만듭니다. 둘 다 [docs/TRANSLATING.md](docs/TRANSLATING.md)에 설명되어 있습니다.

## 권한

| 권한               | 요청하는 이유                                                |
| ------------------ | ------------------------------------------------------------ |
| `storage`          | 대상 언어, 읽기 방식, 그 밖의 설정을 저장합니다.             |
| `unlimitedStorage` | 받은 모델과 번역 캐시를 기기에 유지합니다.                   |
| `offscreen`        | 서비스 워커보다 오래 사는 문서에서 번역 런타임을 실행합니다. |
| `activeTab`        | 팝업을 열거나 명령을 쓴 뒤에 현재 페이지를 읽습니다.         |
| `scripting`        | 번역을 요청한 뒤 활성 탭에 콘텐츠 스크립트를 넣습니다.       |
| `contextMenus`     | 오른쪽 클릭 메뉴에 페이지 번역과 선택 번역을 넣습니다.       |

선택적 호스트 권한(`https://*/*`와 `http://*/*`)은 어떤 사이트의 자동 번역을 켤 때만 요청합니다. 설치 시점에 모든 사이트를 요청하지는 않습니다.

## 지원

Sakutto에는 수익을 내는 지점이 없습니다. 광고도 유료 기능도 없이 완전히 무료입니다.

이런 번역 확장 프로그램이 필요해서 만들었고, 예상보다 많은 사람에게 필요해서 공개했습니다. 요금을 받거나 광고를 넣을 계획은 없습니다.

개발을 이어 가는 데는 시간과 돈이 들기 때문에 GitHub Sponsors를 열었습니다. Sakutto가 마음에 들면 지원해 주시면 기쁩니다.

- **한 달에 $5 (Supporter)**: Sakutto의 개발을 응원하는 플랜입니다.
- **한 달에 $10 (Backer)**: 더 밀어 주고 싶을 때의 플랜입니다. 금액은 소프트웨어를 바꾸지 않습니다.
- **한 번**: 구독이 부담이면 원하는 금액을 한 번만 냅니다.

어느 등급도 제한된 기능이나 우선 지원을 더하지 않습니다. 돈은 새 기능, 번역 품질과 속도, 유지 보수에 씁니다. 후원하든 하지 않든 Sakutto는 완전히 무료인 오픈 소스로 남습니다. https://github.com/sponsors/jammaru

## 기여

먼저 [이슈](https://github.com/jammaru/sakutto/issues)를 열고, 할 수 있으면 그 이슈에 대한 풀 리퀘스트를 보냅니다. 그 길은 언제든 환영합니다. 풀 리퀘스트는 매우 필요하고, 이슈만으로도 충분합니다. 이슈 양식을 쓰고, 사적인 페이지 내용을 붙여 넣지 마세요. 질문은 [Discord](https://discord.gg/pdSRBaSr38)가 더 빠른 경우가 많습니다.

- [CONTRIBUTING.md](CONTRIBUTING.md) (日本語: [CONTRIBUTING.ja.md](CONTRIBUTING.ja.md))
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)

## 라이선스

- 프로젝트 코드: MIT. [LICENSE](LICENSE)를 보세요. Copyright 2026 jammaru.
- PLaMo 3 Translate: PLaMo Community License. 문구는 `licenses/PLaMo-Community-License-ja.txt`와 `licenses/PLaMo-Community-License-en.txt`에 있고, 같은 사본이 확장 프로그램에 들어갑니다. 개인 사용과 학술 사용은 등록이 필요 없습니다. 제3조에서 모델 라이선스는, PFN 양식(https://forms.gle/mTL8tBLrMYXKNZD56)에 미리 등록하고 본인 또는 관계자의 최근 회계연도 소득이나 매출이 10억 엔 이하일 때만 상업적 사용을 허용합니다. 그렇지 않으면 PFN의 별도 상업 라이선스가 필요합니다. 이 저장소의 MIT 라이선스는 Sakutto 자신의 코드를 다루며, 모델 가중치는 다루지 않습니다.
- llama.cpp, wllama, Emscripten 런타임, Dawn WebGPU 라이브러리, Svelte: [NOTICE](NOTICE)와 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)를 보세요.
- `scripts/bench/fixtures/kyoto.html`은 CC BY-SA 4.0 위키백과 2차 저작물입니다. MIT 라이선스가 적용되지 않으며 확장 프로그램 패키지에 들어 있지 않습니다.

영어 문서: [README.md](README.md). 일본어 문서: [README.ja.md](README.ja.md).
