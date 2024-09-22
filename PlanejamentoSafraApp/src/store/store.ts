import { configureStore } from '@reduxjs/toolkit';
import financialReducer from './FinancialSlice';
import inputReducer from './inputSlice';
// Importe outros reducers conforme necessário

const store = configureStore({
  reducer: {
    financial: financialReducer,
    input: inputReducer,
    // Adicione outros reducers aqui
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
