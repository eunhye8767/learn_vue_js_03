# 웹팩 시작하기

이 리포지토리는 인프런 웹팩 온라인 강의의 수업 리포지토리입니다.

## 개발 환경 설정

- [Chrome](https://www.google.com/intl/ko/chrome/)
- [Git](https://git-scm.com/downloads)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js LTS 버전(v12.x 이상)](https://nodejs.org/ko/)

## VSCode 유용한 플러그인 목록

- 색 테마 : [Night Owl](https://marketplace.visualstudio.com/items?itemName=sdras.night-owl)
- 파일 아이콘 테마 : [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)
- 문법 검사 : ESLint, [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
- 실습 환경 보조 : [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
- 기타 : [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [Project Manager](https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager), [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag), [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens), [Atom Keymap](https://marketplace.visualstudio.com/items?itemName=ms-vscode.atom-keybindings), [Jetbrains IDE Keymap](https://marketplace.visualstudio.com/items?itemName=isudox.vscode-jetbrains-keybindings) 등

<br /><br /><br />

***

## 1. Webpack   
### 1.1. 웹팩이란?
**웹팩이란 최신 프런트엔드 프레임워크에서 가장 많이 사용되는 모듈 번들러(Module Bundler)**.<br />
모듈 번들러란 웹 애플리케이션을 구성하는 자원(HTML, CSS, Javscript, Images 등)을 모두 각각의 모듈로 보고 
이를 조합해서 병합된 하나의 결과물을 만드는 도구를 의미한다.
<br /><br />

### 1.2. 모듈이란?
모듈이란 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위를 의미한다.<br />
자바스크립트로 치면 아래와 같은 코드가 모듈이다.    
  - export 코드는 ES6의 Modules 문법을 사용했다.<br />
  문법 참고사이트: https://babeljs.io/docs/en/learn#modules
```
  // math.js  
  function sum(a, b) {
  return a + b;
  }
  
  function substract(a, b) {
  return a - b;
  }
  
  const pi = 3.14;
  
  export { sum, substract, pi }
```
이 math.js 파일은 아래와 같이 3가지 기능을 갖고 있는 모듈이다.<br />
  1. 두 숫자의 합을 구하는 sum() 함수
  2. 두 숫자의 차를 구하는 substract() 함수
  3. 원주율 값을 갖는 pi 상수
이처럼 성격이 비슷한 기능들을 하나의 의미 있는 파일로 관리하면 모듈이 된다.
<br />

### 1.3. 웹팩에서의 모듈
**웹팩에서 지칭하는 모듈**이라는 개념은 위와 같이 자바스크립트 모듈에만 국한되지 않고 
**웹 애플리케이션을 구성하는 모든 자원을 의미**한다.<br />
웹 애플리케이션을 제작하려면 HTML, CSS, Javascript, Images, Font 등 많은 파일들이 필요하다.<br />
이 파일 하나하나가 모두 모듈이다.
<br /><br />

### 1.4. 모듈 번들링이란?
아래 그림과 같이 웹 애플리케이션을 구성하는 몇십, 몇백개의 자원들을 
하나의 파일로 병합 및 압축 해주는 동작을 모듈 번들링이라고 한다.<br />
  - 빌드, 번들링, 변환 이 세 단어 모두 같은 의미이다
![1-4-1](./_images/1-4-1.png)<br />

<br /><br /><br />

## 2. MOtivation
### 2.1. 웹팩이 필요한 이유
#### 2.1.1. 웹팩의 등장 배경
웹팩이 등장한 이유는 크게 3가지다.
  1. 파일 단위의 자바스크립트 모듈 관리의 필요성
  2. 웹 개발 작업 자동화 도구 (Web Task Manager)
  3. 웹 애플리케이션의 빠른 로딩 속도와 높은 성능
<br />

#### 2.1.2. 파일 단위의 자바스크립트 모듈 관리
입문자 관점에서 고안된 자바스크립트는 아래와 같이 편리한 유효 범위를 갖고 있다.
```
  var a = 10;
  console.log(a); // 10

  function logText() {
    console.log(a); // 10
  }
```
자바스크립트의 변수 유효 범위는 기본적으로 전역 범위를 갖는다.<br />
최대한 넓은 변수 범위를 갖기 때문에 어디에서도 접근하기가 편리하다.<br />
그런데 이러한 장점이 실제로 웹 애플리케이션을 개발할 때는 아래와 같은 문제점으로 변한다.
```
  <!-- index.html -->
  <html>
    <head>
      <!-- ... -->
    </head>
    <body>
      <!-- ... -->
      <script src="./app.js"></script>
      <script src="./main.js"></script>
    </body>
  </html>
```
```
  // app.js
  var num = 10;
  function getNum() {
    console.log(num);
  }
```
```
  // main.js
  var num = 20;
  function getNum() {
    console.log(num);
  }
```
위와 같이 index.html에서 두 자바스크립트 파일을 로딩하여 사용한다고 적용하고<br />
스크립트에 아래와 같이 코드를 실행하면 getNum() 값은 20.<br />
```
  <!-- index.html -->
  <html>
    <head>
      <!-- ... -->
    </head>
    <body>
      <!-- ... -->
      <script src="./app.js"></script>
      <script src="./main.js"></script>
      <script>
        getNum(); // 20
      </script>
    </body>
  </html>
```
app.js에서 선언한 num 변수는 main.js에서 다시 선언하고 20을 할당했기 때문이다.<br />
이러한 문제점은 실제로 복잡한 애플리케이션을 개발할 때 발생하며, <br />
변수의 이름을 모두 기억하지 않은 이상 변수를 중복 선언하거나 의도치 않은 값을 할당할 수 있다.<br />
이처럼 파일 단위로 변수를 관리하고 싶은 욕구, 자바스크립트 모듈화에 대한 욕구를 예전까진<br />
AMD, Common.js와 같은 라이브러리로 풀어왔다.
<br /><br />

#### 2.1.3. 웹 개발 작업 자동화 도구
이전부터 프런트엔드 개발 업무를 할 때 가장 많이 반복하는 작업은<br />
텍스트 편집기에서 코드를 수정하고 저장한 뒤 브라우저에서 새로 고침을 누르는 것이었다<br />
그래야 화면에 변경된 내용을 볼 수 있었다<br />
<br />
이외에도 웹 서비스를 개발하고 웹 서버에 배포할 때 아래와 같은 작업들을 한다

  - HTML, CSS, JS 압축
  - 이미지 압축
  - CSS 전처리기 변환

이러한 일들을 자동화 해주는 도구들이 필요했다.<br />
그래서 Grunt와 Gulp 같은 도구들이 등장했다.
<br /><br />

#### 2.1.4. 웹 애플리케이션의 빠른 로딩 속도와 높은 성능
일반적으로 특정 웹 사이트를 접근할 때 5초 이내로 웹 사이트가 표시되지 않으면 
대부분의 사용자들은 해당 사이트를 벗어나거나 집중력을 잃게 된다.<br />
그래서 웹 사이트의 로딩 속도를 높이기 위해 많은 노력들이 있다.<br /> 
그 중 대표적인 노력이 브라우저에서 서버로 요청하는 파일 숫자를 줄이는 것이다.<br /> 
이를 위해 앞에서 살펴본 웹 태스크 매니저를 이용해 파일들을 압축하고 병합하는 작업들을 진행했다.<br />
뿐만 아니라 초기 페이지 로딩 속도를 높이기 위해 <br />
나중에 필요한 자원들은 나중에 요청하는 레이지 로딩(Lazy Loading)이 등장했다.<br />
**웹팩은 기본적으로 필요한 자원은 미리 로딩하는게 아니라 그 때 그 때 요청하자는 철학을 갖고 있다**
<br /><br />

### 2.2. 웹팩으로 해결하려는 문제
웹팩의 등장 배경에서도 살펴봤지만 웹팩에서 해결하고자 하는 기존의 4가지의 문제점이 있다
  - 자바스크립트 변수 유효 범위
  - 브라우저별 HTTP 요청 숫자의 제약
  - 사용하지 않는 코드의 관리
  - Dynamic Loading & Lazy Loading 미지원
<br />

#### 2.2.1. 자바스크립트 변수 유효 범위 문제
- 웹팩은 변수 유효 범위의 문제점을 ES6의 Modules 문법과 웹팩의 모듈 번들링으로 해결한다.
- ES6의 Modules 문법 : https://babeljs.io/docs/en/learn#modules
<br />

#### 2.2.2. 브라우저별 HTTP 요청 숫자의 제약
TCP 스펙에 따라 브라우저에서 한 번에 서버로 보낼 수 있는 HTTP 요청 숫자는 제약되어 있다.<br />
아래의 표는 최신 브라우저 별 최대 HTTP 요청 횟수이다.<br />
![2-2-1](./_images/2-2-1.png)<br />
HTTP 요청 숫자를 줄이는 것이 웹 애플리케이션의 성능을 높여줄 뿐만 아니라 
사용자가 사이트를 조작하는 시간을 앞당겨 줄 수 있다.
  - 클라이언트에서 서버에 HTTP 요청을 보내기 위해서는 먼저 TCP/IP가 연결되어야 한다
웹팩을 이용해 여러 개의 파일을 하나로 합치면 위와 같은 브라우저별 HTTP 요청 숫자 제약을 피할 수 있다.
<br />

#### 2.2.3. Dynamic Loading & Lazy Loading 미지원
Require.js와 같은 라이브러리를 쓰지 않으면 동적으로 원하는 순간에 모듈을 로딩하는 것이 불가능 했다. 
그러나 이젠 웹팩의 **Code Splitting 기능을 이용하여 원하는 모듈을 원하는 타이밍에 로딩**할 수 있다.

<br /><br /><br />

## 3. Node.js와 NPM
웹팩을 사용하기 위해서는 Node.js와 NPM이 컴퓨터에서 설치되어 있어야 한다.<br />
그리고 이 도구들에 대해 어느 정도 배경 지식이 있으면 웹팩을 다루는데 도움이 된다.<br />
<br />

### 3.1. Node.js
- Node.js는 브라우저 밖에서도 자바스크립트를 실행할 수 있는 환경을 의미한다.
- Node.js가 나오기 전까지는 자바스크립트가 브라우저의 동작을 제어하는데 사용되었고 브라우저에서만 실행할 수 있었지만
이제는 **Node.js로 자바스크립트를 브라우저 밖에서도 실행**할 수 있게 되었다.
- node.js 파일은 **LTS 버전으로 설치**
<br />

### 3.2. NPM 소개
- NPM = Node Package Manager
- 공식문서 = https://www.npmjs.com
- npm은 자바스크립트 프로그래밍 언어를 위한 패키지 관리자<br />
(자바스크립트 라이브러리를 관리해주는 도구)
- NPM 사이트는 전세계 모든 자바스크립트 라이브러리(jQuery, tensorflow 등)들을 관리
  - 공개저장소
  - 검색해서 모든 자바스크립트 라이브러리를 확인할 수 있다
![3-2-1](./_images/3-2-1.png)<br />