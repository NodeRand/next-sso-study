// Redux 스토어를 생성하는 함수와 festivalInfo 리듀서를 import
import { configureStore } from '@reduxjs/toolkit';
import testInfoReducer from './test-slice';

// Redux 전역 상태 저장소(store) 생성
export const store = configureStore({
  reducer: {
    testInfo: testInfoReducer, // testInfo slice를 전역 상태에 등록
  },
});

// RootState: 전체 Redux 상태의 타입
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch: dispatch 함수의 타입
export type AppDispatch = typeof store.dispatch;
