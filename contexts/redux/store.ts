import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@contexts/redux/user.slice';
import { alertReducer } from '@contexts/redux/alert.slice';
import { modalReducer } from '@contexts/redux/modal.slice';

export const store = configureStore({
  reducer: { user: userReducer, alert: alertReducer, modal: modalReducer },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
