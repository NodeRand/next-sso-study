// Redux Toolkit의 createSlice와 액션 타입을 import
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestInfoState {
  // testId를 전역으로 관리하기 위한 상태 타입
  testId: number; // 현재 선택된 test의 id
  testName: string;
}

const initialState: TestInfoState = {
  // testId의 초기값 설정
  testId: 0,
  testName: '',
};

const testInfoSlice = createSlice({
  name: 'testInfo', // slice의 이름
  initialState, // 초기 상태
  reducers: {
    setTestInfo(state, action: PayloadAction<TestInfoState>) {
      return action.payload;
    },
    // testId를 변경하는 액션
    setTestId(state, action: PayloadAction<number>) {
      state.testId = action.payload;
    },
    // testName을 변경하는 액션
    setTestName(state, action: PayloadAction<string>) {
      state.testName = action.payload;
    },
  },
});

// 액션과 리듀서 export
export const { setTestInfo, setTestId, setTestName } = testInfoSlice.actions; // testId를 변경하는 액션
export default testInfoSlice.reducer; // testInfo 상태를 관리하는 리듀서
