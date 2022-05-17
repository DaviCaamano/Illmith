//hooks
import { AlertTemplate, useAlertSlice } from '@contexts/redux/alert.slice';
import { useDispatch } from 'react-redux';

//components
import { AlertBox, LoadingModal, Modal } from '@components/modal';
import { EmailNotificationPrompt } from '@components/modal';

//types
import { AlertState } from './index';
import { ReactNode } from 'react';

export const Alert = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const [{ height, width, loadingVisible, template, args, buttonInfo }, , closeModal] = useAlertSlice(dispatch);

  let content: JSX.Element | JSX.Element[] | ReactNode | string | undefined;
  switch (template) {
    case AlertTemplate.simple:
      content = args;
      break;
    case AlertTemplate.EmailNotificationPrompt:
      content = <EmailNotificationPrompt {...args} />;
      break;
  }
  return (
    <>
      {children}
      <Modal id={'alert-modal'} hide={closeModal} height={height} width={width}>
        {content && <AlertBox content={content} buttonInfo={buttonInfo} closeModal={closeModal} />}
      </Modal>
      <LoadingModal visible={loadingVisible} />
    </>
  );
};
