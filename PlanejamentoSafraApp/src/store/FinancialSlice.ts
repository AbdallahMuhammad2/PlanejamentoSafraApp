import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FinancialEntry {
  id: string;
  type: 'entrada' | 'saida';
  category: string;
  amount: number;
  date: string;
  description?: string;
}

interface FinancialState {
  entries: FinancialEntry[];
}

const initialState: FinancialState = {
  entries: [],
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    addEntry: (state, action: PayloadAction<FinancialEntry>) => {
      state.entries.push(action.payload);
    },
    removeEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
    // Adicione outras ações conforme necessário
  },
});

export const { addEntry, removeEntry } = financialSlice.actions;
export default financialSlice.reducer;
