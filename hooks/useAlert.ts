//hooks
import { useAlertSlice } from '@contexts/redux/alert.slice';
import { useCallback } from 'react';

//types
import { AlertConfirmFunc, AlertFunc, AlertState } from '@contexts';
import { Dispatch, SetStateAction } from 'react';
import { Dispatch as ReduxDispatch } from '@reduxjs/toolkit';
import { ButtonInfo } from '@interface/alert/ButtonInfo';

export interface AlertHookProps {
  closeAlert: () => void;
  setVisible: (visible?: boolean) => void;
  visible: boolean;
  stopLoading: () => void;
  loadingVisible: boolean;
  startLoading: () => void;
  width: string;
  buttonInfo: ButtonInfo;
  raiseAlert: (
    content: string | JSX.Element,
    height?: string,
    width?: string,
    buttonText?: string | JSX.Element
  ) => void;
  prompt: AlertConfirmFunc;
  content: string | JSX.Element;
  height: string;
  setAlert: Dispatch<SetStateAction<AlertState>>;
}
export const useAlert = (dispatch: ReduxDispatch): AlertHookProps => {
  const [{ height, width, visible, loadingVisible, content, buttonInfo }, setAlert, closeAlert] =
    useAlertSlice(dispatch);

  /**
   * A confirmation prompt which accepts functions for confirm and cancel.
   * These functions are required.
   * @param content: Displayed in the alert modal.
   * @param confirm Runs on confirm button click. Closes modal after pressed.
   * @param cancel Runs on cancel button click. Closes modal after pressed.
   * @param height - Fixed height of the modal.
   * @param width - Fixed width of the modal.
   * @param confirmText (Optional): Replaces 'Okay' on confirm button. If null text display okay.
   * @param cancelText (Optional): Replaces 'Cancel' on cancel button. If null text display okay.
   */
  const prompt: AlertConfirmFunc = useCallback(
    (
      content: string | JSX.Element,
      confirm?: () => any,
      cancel?: () => any,
      height?: string,
      width?: string,
      confirmText?: string | JSX.Element,
      cancelText?: string | JSX.Element
    ): void => {
      const setter: SetStateAction<AlertState> = (prevState: AlertState): AlertState => {
        const newState = {
          ...prevState,
          buttonInfo: {
            confirm,
            cancel,
            confirmText,
            cancelText,
          },
          content,
          visible: true,
          height: height || prevState.height,
          width: height || prevState.width,
        };
        return { ...newState };
      };
      setAlert(setter);
    },
    [setAlert]
  );

  /**
   * A simply prompt with a single button labeled "dismiss".
   * @param content: Displayed in the alert modal.
   * @param height - Fixed height of the modal.
   * @param width - Fixed width of the modal.
   * @param buttonText - Replaces the 'Dismiss' on the button text
   */
  const raiseAlert: AlertFunc = useCallback(
    (content: string | JSX.Element, height?: string, width?: string, buttonText?: string | JSX.Element) => {
      setAlert((prevState: AlertState) => {
        const newState: AlertState = {
          ...prevState,
          buttonInfo: { confirmText: buttonText || 'Dismiss' },
          content,
          visible: true,
        };
        if (height) newState.height = height;
        if (width) newState.width = width;
        return newState;
      });
    },
    [setAlert]
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

  const setVisible = useCallback(
    (visible = true) => {
      setAlert((prevState: AlertState) => ({
        ...prevState,
        visible,
      }));
    },
    [setAlert]
  );

  return {
    height,
    width,
    visible,
    loadingVisible,
    content,
    buttonInfo,
    setAlert,
    closeAlert,
    raiseAlert,
    prompt,
    startLoading,
    stopLoading,
    setVisible,
  };
};
