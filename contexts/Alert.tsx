//hooks
import { useAlertSlice } from '@contexts/redux/alert.slice';

//components
import { AlertBox, LoadingModal, Modal } from '@components/modal';

//types
import { AlertState } from './index';
import { useDispatch } from 'react-redux';

export const Alert = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const [{ height, width, visible, loadingVisible, content, buttonInfo }, setAlert, closeModal] =
    useAlertSlice(dispatch);

  const setVisible = (set: boolean) => {
    setAlert((prevState: AlertState) => ({
      ...prevState,
      visible: set,
    }));
  };

  const close = () => {
    setVisible(false);
  };
  return (
    <>
      {children}
      <Modal id={'alert-modal'} visible={visible} hide={closeModal} height={height} width={width}>
        <AlertBox content={content} buttonInfo={buttonInfo} close={close} />
      </Modal>
      <LoadingModal visible={loadingVisible} />
    </>
  );
};
