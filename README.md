# react_todo

## 개발 환경 실행

```sh
npm i --legacy-peer-deps
npm start
```
react-virtualized <-> react18 호환성 문제로 npm install 시 --legacy-peer-deps 

## library

### 1. react-virtualized
  - windowing 라이브러리


### 2. craco
  - CRA에 config 설정을 덮어쓰기 위한 패키지 (절대경로 설정을 위해 사용)
    - ex) '../../../components/Test.tsx'; -> '@components/Test.tsx';


### 3. Redux
  - 상태 관리 라이브러리


### 4. Redux-Toolkit
  - 말그대로 Redux 개발을 위한 Toolkit
    - Redux 코드를 간단하게 작성할 수 있고, Redux 보다 훨씬 효율적이므로 사용을 공식적으로 강력히 권장

### 5. Mui
  - React UI라이브러리

## formatter, linter (extensions)

### 1. prettier (formatter)
  - 줄 바꿈, 공백, 들여 쓰기 등 에디터에서 '텍스트'를 일관되게 작성되도록 도와줌
    - 스타일 교정


### 2. eslint (linter)
  - 여러 방식의 코드 작성법이 있는데, 이러한 방식을 일관성 있는 방식으로 구현할 수 있도록 잡아줌


## 문제점
- 페이지와 컴포넌트의 경계가 모호합니다. 컴포넌트는 재사용을 통해 ui, ux의 일관성을 유지하기 위해 사용하는데, 컴포넌트의 크기가 크고 지엽적인 기능이 많은 문제가 있습니다.
