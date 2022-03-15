# Eigene-Front-Test

제출기한 : ~ 3/14 월 18:00   \
github 링크와 함께 꼭 회신

## 이름 : 윤성연


## 빌드 방법 :

Eigene-Front-Test/proxy-server 에서 $ yarn install 및    \
Eigene-Front-Test/shop-insite-data 에서 $ yarn install 해서 의존성 목록 패키지들을 설치합니다.

1. Eigene-Front-Test/shop-insite-data 에서 $ yarn build
2. Eigene-Front-Test/proxy-server 에서 $ yarn start 해서 proxy server 를 켭니다. (5000 port)
3. Eigene-Front-Test/proxy-server 에서 $ yarn start (빌드된 리액트 파일) 하거나,
4. Eigene-Front-Test/shop-insite-data 에서 $ yarn start (webpack dev server, 3000 port)

## 프로젝트 설명 :

#### 사용 스택

- React 함수형 컴포넌트, Redux
- Express (proxy)
- UI : Styled-components, Antd, Recharts
- Yarn, CRA, Webpack, CRACO
- Linter / Formatter : ESLint, Prettier
- Language : Typescript(부분적), Javascript
- package : Redux-Saga, Redux-Persist, Axios
- devtools : redux-devtools-extension

#### 설명

> components => UI component 폴더입니다. \
> containers => 스토어에서 상태가 변하면 UI component 에 바뀐 상태를 업데이트 해주는 component 입니다. \
> lib/api => Proxy 서버로의 API 요청입니다.  \
> modules => 리듀서 모듈 폴더입니다. modules/index.js 에서 root 리듀서를 정의합니다

주요 로직

> 각 input 과 select node 들에선 change 이벤트 발생시 key 와 value 를 받아와서 스토어에 등록합니다.   \
> 스토어에 있는 값을 useSelector 로 각 노드들에게 다시 주어, 조회 후 스토어를 비우면서 상태가 변했으니 각 노드도 초기화 됩니다.    \
> 조회전에 ages 배열에 값이 남아있으면, redux-persist 에 의해 모두 값이 로컬스토리지에 남아 있어 다시 불러오게 됩니다.

> 조회 버튼을 클릭하면, state.filter 에 있는 값을 redux-saga 를 통해 axios 로 프록시 서버에 post 요청을 합니다.   \
> 이때 .env 파일에 있는 client_id 값과 client_secret 값을 함께 보내줍니다.    \
> proxy-server 는 전달받은 payload를 naver open API 로 다시 post 요청 해줍니다 \
> 전달받은 client_id 값 들을 헤더에 씌워 보냅니다.  \
> 요청에 성공하면, 응답을 다시 클라이언트로 보냅니다. \
> redux-saga 제너레이터에 의해 응답이 들어오면 store 에 그 값을 저장합니다  \
> store 상태가 변했으므로, Chart 컴포넌트가 렌더링 됩니다.

> Chart.tsx : 네이버에서 응답한 데이터를 받아 recharts 에 그래프로 표현할수 있도록 데이터를 재가공 하는 로직이 있습니다   \
> period 에 따른 group(key) : ratio(value) 객체를 새로운 배열에 push 합니다.

ex)

```
[
    {
        period: "2021-10-01",
        20대: 13.03116,
        30대: 51.55807,
        40대: 19.83002
    },
    {
        period: "2021-10-03",
        20대: 10.76487,
        30대: 47.87535,
        40대: 20.96317
    }
]

```

> 동시에 차트의 line 컴포넌트의 map 기준이 되기위한 배열을 생성합니다.    \
> group 의 value 명으로 이루어진 배열로 이루어져 있습니다.

ex)

```

[
    '20대',
    '30대',
    '40대'
]

```

> 로직 구현부(Chart.tsx) 에 주석 처리가 되어 있습니다 !  \
> line 컴포넌트의 색상을 결정하기위해 커스텀 color 라이브러리를 사용했습니다.    \
> 컴포넌트가 map 함수에 들어가 새로운 컴포넌트들을 생성할때, index 값에따라 색상이 결정됩니다.

## 선택 구현 사항 체크:

- [x] Antd를 활용하여 화면을 꾸민다.
- [x] Redux-Saga를 활용하여 비동기 관련 처리를 한다.
- [x] Redux-Persist를 활용하여 새로고침 시, 연령별 트렌드 조회의 파라미터가 유지 되도록 한다.
- [ ] Custom Hook 에서 비즈니스 로직처리 및 상태관리, 비동기 처리를 한다.

## CORS Issue 해결 방법

CORS 는 브라우저 - 서버간 동일 출처 정책으로, 요청이 가능하려면 서버측에서 Acess-Control-Allow-Origin 을 헤더에 응답해줘야 합니다.   \
하지만 서버 - 서버간의 요청에는 이 정책이 적용되지 않으므로, 이를 이용하여 Open API 를 호출합니다.

Express 서버 (localhost:5000 port) 와 Webpack 개발서버 (localhost:3000 port) 간의 프록시 설정을 통해 Express 서버가 일종의 중계역할을 합니다.

1. 리액트 클라이언트(3000) -> 익스프레스 서버(5000) 로 '/api/naver' 와 함께 payload 로 요청할 값과 naver Client_id, Client_Secret 을 body 에 담아 POST Request
2. POST 요청을 받으면, 익스프레스 서버(5000) -> 네이버 Open API 서버(https://openapi.naver.com/v1/...) 로 Client_id, Client_Secret 을 header에 담고,
   나머지 값을 body 로 담아 POST Request
3. 네이버 Open API 서버(https://openapi.naver.com/v1/...) -> 익스프레스 서버(5000) 로 요청 정보대로 Response
4. 응답이 오면, 익스프레스 서버(5000) -> 리액트 클라이언트(3000) 으로 전달받은 data 를 그대로 Response, 통신 종료

빌드된 파일을 익스프레스 서버에서 사용하도록 하고, 개발 편의성을 위해 http-proxy-middleware 패키지 사용.

## 전체 구현 사항 체크 (메모):

- [x] CORS Issue 해결 및 해결 방법 작성
- [x] API KEY .env 사용 및 .gitignore 등록
- [x] 키워드 연령별 트렌드 조회
- [x] 연령별 트렌드 조회 파라미터를 사용자가 입력할수 있게 페이지 제작.
- [x] Chart Library (recharts 등)를 활용하여 조회 결과에 대한 그래프 보여줌.
- [x] 연령별 조회 파라미터 ages 를 다중 선택 하도록 구현
- [x] Antd를 활용하여 화면을 꾸민다.
- [x] Redux-Saga를 활용하여 비동기 관련 처리를 한다.
- [x] Redux-Persist를 활용하여 새로고침 시, 연령별 트렌드 조회의 파라미터가 유지 되도록 한다.
- [ ] Custom Hook 에서 비즈니스 로직처리 및 상태관리, 비동기 처리를 한다.
