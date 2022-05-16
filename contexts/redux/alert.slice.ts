import { createSlice } from '@reduxjs/toolkit';
import { stateSetter } from '@utils/stateSetter.redux';

//hooks
import { useSelector } from 'react-redux';

//types
import { StateSetter } from '@utils/stateSetter.redux';
import { RootState } from '@contexts/redux/store';
import { ButtonInfo } from '@interface/alert/ButtonInfo';
import { Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { useCallback } from 'react';

export interface AlertState {
  height: string;
  width: string;
  visible: boolean;
  loadingVisible: boolean;
  content: string | JSX.Element;
  buttonInfo: ButtonInfo;
}

export type AlertFunc = (
  content: string | JSX.Element,
  height?: string,
  width?: string,
  buttonText?: string | JSX.Element
) => void;

export type AlertConfirmFunc = (
  content: string | JSX.Element,
  confirm?: () => any,
  cancel?: () => any,
  height?: string,
  width?: string,
  confirmText?: string | JSX.Element,
  cancelText?: string | JSX.Element
) => void;

const initialState: AlertState = {
  height: '',
  width: '',
  visible: false,
  loadingVisible: false,
  content: '',
  buttonInfo: {},
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    set: (state: AlertState, action: PayloadAction<AlertState>) => {
      return { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { set: setAlertAction, reset: resetAlertAction } = alertSlice.actions;
export const { reducer: alertReducer } = alertSlice;

export type AlertSliceHookProps = [AlertState, StateSetter<AlertState>, () => void];
export const useAlertSlice = (dispatch: Dispatch): AlertSliceHookProps => {
  const alert = useSelector((state: RootState) => state.alert);
  const setAlert = stateSetter<AlertState>(dispatch, setAlertAction, alert);
  const closeModal = useCallback(() => {
    dispatch(resetAlertAction());
  }, [dispatch]);
  return [alert, setAlert, closeModal];
};
