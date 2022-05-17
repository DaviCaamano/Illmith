//hooks
import { useAlert, useLoginForm, useUserApi, useUserModalAnimations, useUserRegistration } from '@hooks';
import { useDispatch } from 'react-redux';
import { AlertTemplate, useModalSlice } from '@contexts';

//Components
import { LoginScreen } from '@components/user/login';
import { Modal } from '@components/modal';
import { RegisterUserScreen } from '@components/user/register';
import { AnimatePresence, motion } from 'framer-motion';
const MotionDiv = motion.div;

//types
import { ModalSliceHookProps, UserScreen } from '@contexts';
import { UserRegistrationProps } from '@hooks';
enum ModalHeight {
  'LOGIN_USER' = '25rem',
  'register' = '25rem',
}
export const User = () => {
  const dispatch = useDispatch();
  const modal: ModalSliceHookProps = useModalSlice(dispatch);
  const { prompt } = useAlert(dispatch);
  const [{ screen }, setModal, closeModal] = modal;
  const { login, saveUser } = useUserApi(dispatch);

  const {
    form: loginForm,
    setForm: setLoginForm,
    handleUser: handleLoginUser,
    handlePassword: handleLoginPassword,
    handleLogin: handleLoginLogin,
  } = useLoginForm(dispatch, modal, login, saveUser);

  const {
    form: registrationInputs,
    setForm: setRegistrationInputs,
    handleUserRegistration,
    handleRegistrationInput,
    handleUserRegistrationPasswordInput,
  }: UserRegistrationProps = useUserRegistration(dispatch, setModal);

  const { username, email, password } = registrationInputs;

  const animation = useUserModalAnimations(screen);

  const hide = () => {
    if (screen === UserScreen.register) {
      if (username || email || password) {
        prompt({
          template: AlertTemplate.simple,
          args: 'Are you sure you want to exit the user registration?',
          confirm: () => closeModal(),
        });
      } else {
        closeModal();
      }
    } else {
      closeModal();
    }
  };
  // @ts-ignore TODO REMOVE WHEN ALL OF THE SCREEN HEIGHTS HAVE BEEN DEFINED
  const height = ModalHeight[screen] || ModalHeight.LOGIN_USER;
  return (
    <Modal id={'user-modal'} hide={hide} height={height ?? '100%'} width={'44.5rem'} zIndex={9998}>
      {screen !== UserScreen.none && (
        <AnimatePresence>
          {screen === UserScreen.login && (
            <MotionDiv key={UserScreen.login} {...animation}>
              <LoginScreen
                form={loginForm}
                setForm={setLoginForm}
                handleUserInput={handleLoginUser}
                handlePasswordInput={handleLoginPassword}
                setModal={setModal}
                submit={handleLoginLogin}
              />
            </MotionDiv>
          )}
          {screen === UserScreen.register && (
            <MotionDiv key={UserScreen.register} {...animation}>
              <RegisterUserScreen
                form={registrationInputs}
                setForm={setRegistrationInputs}
                setModal={setModal}
                handleUserRegistration={handleUserRegistration}
                handleInput={handleRegistrationInput}
                handleUserRegistrationPasswordInput={handleUserRegistrationPasswordInput}
                screen={screen}
              />
            </MotionDiv>
          )}
        </AnimatePresence>
      )}
    </Modal>
  );
};
