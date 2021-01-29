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
- 참고(강의샘) : https://joshua1988.github.io/webpack-guide/
<br /><br />

### 1.2. 모듈이란?
모듈이란 프로그래밍 관점에서 특정 기능을 갖는 작은 코드 단위를 의미한다.<br />
자바스크립트로 치면 아래와 같은 코드가 모듈이다.    
  - export 코드는 ES6의 Modules 문법을 사용했다.<br />
  문법 참고사이트: https://babeljs.io/docs/en/learn#modules
```javascript
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
```javascript
var a = 10;
console.log(a); // 10

function logText() {
  console.log(a); // 10
}
```
자바스크립트의 변수 유효 범위는 기본적으로 전역 범위를 갖는다.<br />
최대한 넓은 변수 범위를 갖기 때문에 어디에서도 접근하기가 편리하다.<br />
그런데 이러한 장점이 실제로 웹 애플리케이션을 개발할 때는 아래와 같은 문제점으로 변한다.
```html
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
```javascript
// app.js
var num = 10;
function getNum() {
  console.log(num);
}

// main.js
var num = 20;
function getNum() {
  console.log(num);
}
```
위와 같이 index.html에서 두 자바스크립트 파일을 로딩하여 사용한다고 적용하고<br />
스크립트에 아래와 같이 코드를 실행하면 getNum() 값은 20.<br />
```html
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
<br /><br /><br />

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
- Node.js가 나오기 전까지는 자바스크립트가 브라우저의 동작을 제어하는데 사용되었고 브라우저에서만 실행할 수 있었지만 이제는 **Node.js로 자바스크립트를 브라우저 밖에서도 실행**할 수 있게 되었다.
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
<br />

### 3.3. NPM 시작하기
1. 터미널 창에서 node 버전과 npm 버전을 명령어를 입력하여 확인
	```
	node -v    // node 버전
	npm -v     // npm 버전
	```
	![3-3-1](./_images/3-3-1.png)<br />
	<br />
2. powersell 로 되어 있을 경우, 해당 버전 확인이 안 되는 경우가 있다.<br />
(https://github.com/eunhye8767/learn_vue_js_01 - 10.3번 참고)

3. npm 폴더를 만들고 open in Terminal 클릭<br />
	![3-3-2](./_images/3-3-2.png)<br />

4. 터미널에서 경로가 해당 npm 폴더로 바뀐 것을 확인할 수 있다<br />
	![3-3-3](./_images/3-3-3.png)<br />

5. [ 터미널 ] npm init 명령어 실행
<br />

### 3.4. NPM 초기화 명령어 - init
1. [ 터미널 ] npm init 명령어 실행
2. 1번 영역 참고, package name(프로젝트 이름 등), version, decription 등 항목별로 입력하라는 메세지가 보여진다<br />2번 영역 참고, 입력한 값이 맞는 지 한 번더 명시해준다.<br />3번 영역 참고, 이대로 진행할 건지 마지막으로 물어본다.<br />
	![3-4-1](./_images/3-4-1.png)<br />

3. 물음에 답을 하면 생성한 npm 폴더 안에 package.json 파일이 생성되고 그 안에 내가 입력한 값(2번 영역)들이 기재되어 있다.<br />
	![3-4-2](./_images/3-4-2.png)<br />
	![3-4-3](./_images/3-4-3.png)<br />

4. 생성된 package.json 파일을 삭제한다
5. [ 터미널 ] npm init -y 명령어를 입력한다
	- npm init -y 명령어는 package name, version 등 항목별로 입력하는 란을 기본값으로 지정한 후 자동으로 package.json 파일까지 생성한다.<br />
	![3-4-4](./_images/3-4-4.png)<br />
	<br />

### 3.5 NPM 설치 명령어 - install
1. jquery 를 설치해본다
2. [ 터미널 ] npm install jquery 명령어 입력
	- 설치 명령어 : npm install *** 
3. npm 폴더 안에 nodo_modules/jquery 폴더가 생성되었다<br />
	![3-5-1](./_images/3-5-1.png)<br />
4. 일반적으로 특정 라이브러리가 설치되었을 때에는 nodo_modulex 폴더 아래에 jquery 처럼 해당 폴더가 생성이 되고 그 폴더 아래에 파일들이 저장되어 있다
	- 설치된 라이브러리 폴더 안에 dist 폴더 안에서 파일이 확인이 된다
	- 설치 예시 : jquery/dist/jquery.js 
		- jquery.js 파일을 열면 버전 등의 정보 코드들을 확인할 수 있다<br />
			![3-5-2](./_images/3-5-2.png)<br />
		- **npm/package.json** 파일에서 설치된 **jquery 버전도 확인**할 수 있다<br />
			![3-5-3](./_images/3-5-3.png)<br />
<br />

### 3.6. NPM을 사용하는 이유
1. npm/package.json : **각각의 라이브러리 목록과 버전을 확인**할 수 있다.<br />
	- 각각의 라이브리별 버전 관리가 용이하다.<br />
	![3-6-1](./_images/3-6-1.png)<br />
2. 특정 라이브러리 검색하여 cdn 주소를 불러오지 않아도 **간편하게 명령어를 입력하여 해당 라이브러리 설치**가 가능하다.
	- 예: npm install jquery-ui / npm install jquery
<br />

## 4. NPM(Node Package Manager)
### 4.1. NPM 지역 설치 명령어와 제거 명령어 - uninstall
1. npm install gulp 명령어를 입력하여 gulp를 설치한다
	- npm/package.json 파일에 해당 라이브러리가 설치된 것을 확인할 수 있다<br />
	![4-1-1](./_images/4-1-1.png)<br />
2. 설치가 완료된 후에 npm uninstall gulp 명령어를 입력하여 삭제한다
	- npm/package.json 파일에서 해당 라이브러리가 삭제된 것을 확인할 수 있다<br />
	![4-1-2](./_images/4-1-2.png)<br />
	<br />

### 4.2. NPM 전역 설치 명령어 - install --global
1. install 뒤에 설치옵션(실행옵션) --global 을 넣어본다
	```
	npm install gulp --global
	```
2. permission 에러로 설치가 안되면 sudo 를 추가하여 명령어를 입력한다
	```
	sudo npm install gulp --global
	```
3. 설치가 완료되면 **라이브러리명@버전**을 확인할 수 있다.
	- 스펠링을 잘못기재하여 전혀 다른 라이브러리를 설치할 수 있으니 해당 부분을 확인한다
	- 쓰이지 않는 라이브러리의 경우 버전이 낮기 때문에 해당 부분을 확인한다
	![4-2-1](./_images/4-2-1.png)<br />
4. npm install gulp 로 설치했을 때엔 npm/node_modules 폴더에 해당 설치된 라이브러리의 폴더가 자동 생성되었었는데 **--global 옵션으로 설치했을 때앤 node_modules 폴더에 해당 라이브러리의 폴더가 생성되지 않는다.**
5. 설치가 완료된 gulp 명령어를 입력한다
	- 시스템 상에서 명령어를 인식할 수 있게 제공하는 라이브러리들이 몇 개 있는데 그 중에 하나가 gulp 이다.
	```
	gulp
	```
	![4-2-2](./_images/4-2-2.png)<br />
<br />

### 4.3. 전역으로 설치된 라이브러리 경로 확인
1. NPM 전역 설치 경로
	- --global 옵션 명령어로 설치된 라이브러리는 OS에 따라 해당 폴더 경로에 설치된다
	```
	# window
	%USERPROFILE%\AppData\Roaming\npm\node_modules

	# mac
	/usr/local/lib/node_modules
	```
	![4-3-1](./_images/4-3-1.png)<br />
2. 시스템에서 그 라이브러리를 제공하는 CLI, 명령어 인식 기능들을 활용하기 위해서 --global를 설치한다.
<br />