import { createSlice } from '@reduxjs/toolkit';
import { stateSetter } from '@utils/stateSetter.redux';

//hooks
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

//types
import { StateSetter } from '@utils/stateSetter.redux';
import { RootState } from '@contexts/redux/store';
import { ButtonInfo } from '@interface/alert/ButtonInfo';
import { Dispatch, PayloadAction } from '@reduxjs/toolkit';

export enum AlertTemplate {
  none,
  simple,
  EmailNotificationPrompt,
}
export interface AlertState {
  template: AlertTemplate;
  args?: any;
  height: string;
  width: string;
  loadingVisible: boolean;
  buttonInfo: ButtonInfo;
}

interface AlertConfirmFuncProps {
  template?: AlertTemplate;
  args?: any;
  confirm?: () => any;
  cancel?: () => any;
  height?: string;
  width?: string;
  confirmText?: string | JSX.Element;
  cancelText?: string | JSX.Element;
}
export type AlertConfirmFunc = (args: AlertConfirmFuncProps) => void;

const initialState: AlertState = {
  height: '',
  width: '',
  loadingVisible: false,
  template: AlertTemplate.none,
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
