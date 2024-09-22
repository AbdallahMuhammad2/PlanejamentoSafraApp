import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Input {
  id: string;
  name: string;
  quantity: number;
  date: string;
}

interface InputState {
  inputs: Input[];
}

const initialState: InputState = {
  inputs: [],
};

const inputSlice = createSlice({
  name: 'input',
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<Input>) => {
      state.inputs.push(action.payload);
    },
    removeInput: (state, action: PayloadAction<string>) => {
      state.inputs = state.inputs.filter(input => input.id !== action.payload);
    },
    // Adicione outras ações conforme necessário
  },
});

export const { addInput, removeInput } = inputSlice.actions;
export default inputSlice.reducer;
