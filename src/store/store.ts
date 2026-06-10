import { configureStore } from '@reduxjs/toolkit';
import agentListReducer from './slices/agentListSlice';

export const store = configureStore({
  reducer: {
    agentList: agentListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
