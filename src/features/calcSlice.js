import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  input: '',
  result: '',
  lastOp: '',
  lastNum: ''
};

const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    appendInput(state, action) {
      state.input = state.input + action.payload;
      state.result = '';
    },
    setInput(state, action) {
      state.input = action.payload;
    },
    setResult(state, action) {
      state.result = action.payload;
    },
    setLast(state, action) {
      state.lastOp = action.payload.op;
      state.lastNum = action.payload.num;
    },
    clearAll(state) {
      state.input = '';
      state.result = '';
      state.lastOp = '';
      state.lastNum = '';
    }
  }
});

export const { appendInput, setInput, setResult, setLast, clearAll } = calcSlice.actions;
export default calcSlice.reducer;
