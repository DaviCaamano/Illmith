export interface ButtonInfo {
  /** callback function to run when the confirm button is pressed */
  confirm?: () => boolean | void;
  /** callback function to run when the cancel button is pressed */
  cancel?: () => boolean | void;
  /** text to display on confirm button */
  confirmText?: string | JSX.Element;
  /** text to display on cancel button */
  cancelText?: string | JSX.Element;
}
