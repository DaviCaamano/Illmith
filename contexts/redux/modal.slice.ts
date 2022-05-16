import { createSlice } from '@reduxjs/toolkit';
import { stateSetter } from '@utils/stateSetter.redux';

//hooks
import { useSelector } from 'react-redux';

//types
import { RootState } from '@contexts/redux/store';
import { StateSetter } from '@utils/stateSetter.redux';
import { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@prisma/client';

export enum UserScreen {
  none = 'NONE',
  login = 'LOGIN_USER',
  register = 'REGISTER_USER',
  password = 'PASSWORD_RESET_USER',
  password_reset_new = 'PASSWORD_RESET_NEW',
}

export interface ModalState {
  screen: UserScreen;
}

const initialState: ModalState = {
  screen: UserScreen.none,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    set: (state: ModalState, action: PayloadAction<ModalState>) => {
      return action.payload;
    },
    reset: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set: setModalAction, reset: resetModalAction } = modalSlice.actions;
export const { reducer: modalReducer } = modalSlice;

export type ModalSliceHookProps = [ModalState, (screen?: UserScreen) => void, () => void];
export const useModalSlice = (dispatch: Dispatch): ModalSliceHookProps => {
  const modal: ModalState = useSelector((state: RootState) => state.modal);
  const modalSetter: StateSetter<ModalState> = stateSetter<ModalState>(dispatch, setModalAction, modal);
  const setModal = (screen = UserScreen.none) => {
    modalSetter({ screen });
  };
  const closeModal = () => {
    dispatch(resetModalAction());
  };
  return [modal, setModal, closeModal];
};

export const useGetModal = (): ModalState => {
  return useSelector((state: RootState) => state.modal);
};
