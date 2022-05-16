import { Button } from '@chakra-ui/react';
import { useCallback } from 'react';

export interface AlertButtonProps {
  confirm?: () => void;
  cancel?: () => void;
  confirmText?: string | JSX.Element;
  cancelText?: string | JSX.Element;
  close: () => void;
}
/**
 @params
 modalContent: [text or JSX]:
 content to be displayed on Alert.
 type [any]:
 The following is a numbered list for the types of values you can enter for type
 Each focuses on changing the type of buttons that will display with the alert.
 (1)value: JSON: {
                confirm: [function],
                cancel: [function],
                confirmText:[string] (optional),
                cancelText: [string] (optional)
            }
 description: creates a modal with a pair of buttons, one representing confirm, the other cancel.
 Must be paired with "buttonInfo.confirm" and buttonInfo.cancel.
 (required) "buttonInfo.confirm" [function]:
 A function to run when the confirm button is clicked.
 (required) "buttonInfo.cancel" [function]
 A function to run when the cancel button is clicked.
 (optional) buttonInfo.confirmText [string]
 The text displayed on the confirm button.
 (optional) buttonInfo.cancelText [string]
 The text displayed on the cancel button.
 (2) value: null or undefined
 A single button will be created. The button will close the modal.
 Good for simple alert prompts.
 * @returns {JSX.Element}
 * @constructor
 */
export const AlertButton = ({ confirm, cancel, confirmText, cancelText, close }: AlertButtonProps) => {
  const confirmClick = useCallback(() => {
    if (confirm) {
      confirm();
    }
    close();
  }, [close, confirm]);
  const cancelClick = useCallback(() => {
    if (cancel) {
      cancel();
    }
    close();
  }, [cancel, close]);

  return (
    <div>
      <Button variant={'prompt_dark'} width={'auto'} onClick={confirmClick}>
        {confirmText || 'Okay'}
      </Button>
      {(cancel || cancelText) && (
        <Button variant={'prompt_dark'} width={'auto'} onClick={cancelClick}>
          {' '}
          {cancelText || 'Cancel'}
        </Button>
      )}
    </div>
  );
};
