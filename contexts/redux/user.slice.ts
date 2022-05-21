import { createSlice } from '@reduxjs/toolkit';
import { stateSetter } from '@utils/stateSetter.redux';

//hooks
import { useSelector } from 'react-redux';

//types
import { RootState } from '@contexts/redux/store';
import { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { StateSetter } from '@utils/stateSetter.redux';

export interface UserState {
  username: string | null;
  email: string | null;
  onLoadFlag: boolean;
  admin?: boolean;
}

const initialState: UserState = {
  username: '',
  email: '',
  onLoadFlag: false,
  admin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state: UserState, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set: setUserAction, reset: resetUserAction } = userSlice.actions;
export const { reducer: userReducer } = userSlice;

export type UserSliceHookProps = [UserState, StateSetter<UserState>, () => void];
export const useUserSlice = (dispatch: Dispatch): UserSliceHookProps => {
  const user = useSelector((state: RootState) => state.user);
  const setUser = stateSetter<UserState>(dispatch, setUserAction, user);
  const resetUser = () => {
    dispatch(resetUserAction());
  };
  return [user, setUser, resetUser];
};

export const useGetUser = (): UserState => {
  return useSelector((state: RootState) => state.user);
};
