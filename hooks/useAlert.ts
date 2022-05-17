//hooks
import { useAlertSlice } from '@contexts/redux/alert.slice';
import { useCallback } from 'react';

//types
import { AlertConfirmFunc, AlertState } from '@contexts';
import { Dispatch, SetStateAction } from 'react';
import { Dispatch as ReduxDispatch } from '@reduxjs/toolkit';
import { ButtonInfo } from '@interface/alert/ButtonInfo';
import { AlertTemplate } from '@contexts/redux/alert.slice';

export interface AlertHookProps {
  closeAlert: () => void;
  stopLoading: () => void;
  loadingVisible: boolean;
  startLoading: () => void;
  width: string;
  buttonInfo: ButtonInfo;
  prompt: AlertConfirmFunc;
  template: AlertTemplate;
  args?: any;
  height: string;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}
export const useAlert = (dispatch: ReduxDispatch): AlertHookProps => {
  const [{ height, width, loadingVisible, template, args, buttonInfo }, setAlert, closeAlert] = useAlertSlice(dispatch);

  /**
   * A confirmation prompt which accepts functions for confirm and cancel.
   * These functions are required.
   * @param template: enum which determines which JSX Element will be displayed as the modal content.
   * @param args: A JSON containing the property args for the JSX element.
   * @param confirm Runs on confirm button click. Closes modal after pressed.
   * @param cancel Runs on cancel button click. Closes modal after pressed.
   * @param height - Fixed height of the modal.
   * @param width - Fixed width of the modal.
   * @param confirmText (Optional): Replaces 'Okay' on confirm button. If null text display okay.
   * @param cancelText (Optional): Replaces 'Cancel' on cancel button. If null text display okay.
   */
  const prompt: AlertConfirmFunc = useCallback(
    ({ template, args, confirm, cancel, height, width, confirmText, cancelText }): void => {
      setAlert(
        (prevState: AlertState): AlertState => ({
          ...prevState,
          buttonInfo: {
            confirm: confirm || prevState.buttonInfo.confirm,
            cancel: cancel || prevState.buttonInfo.cancel,
            confirmText: confirmText || prevState.buttonInfo.confirmText,
            cancelText: cancelText || prevState.buttonInfo.cancelText,
          },
          template: template || prevState.template,
          args: args || prevState.args,
          height: height || prevState.height,
          width: width || prevState.width,
        })
      );
    },
    []
  );

  /** Loading Screen Functions */
  const startLoading = useCallback(() => {
    setAlert((prevState: AlertState) => ({
      ...prevState,
      loadingVisible: true,
    }));
  }, [setAlert]);

  const stopLoading = useCallback(() => {
    setAlert((prevState: AlertState) => ({
      ...prevState,
      loadingVisible: false,
    }));
  }, [setAlert]);

  return {
    height,
    width,
    loadingVisible,
    template,
    args,
    buttonInfo,
    setAlert,
    closeAlert,
    prompt,
    startLoading,
    stopLoading,
  };
};
