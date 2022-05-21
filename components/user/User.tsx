//hooks
import {
  LoginState,
  RegisterUserState,
  useAlert,
  useLoginForm,
  userModalErrors,
  UserRegistrationProps,
  useUserApi,
  useUserModalAnimations,
  useUserRegistration,
} from '@hooks';
import { useDispatch } from 'react-redux';

//types
import { AlertTemplate, ModalSliceHookProps, useModalSlice, UserScreen } from '@contexts';

//Components
import { LoginScreen } from '@components/user/login';
import { Modal } from '@components/modal';
import { RegisterUserScreen } from '@components/user/register';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';

const MotionDiv = motion.div;

enum ModalHeight {
  'LOGIN_USER' = '25rem',
  'register' = '25rem',
}
export const User = () => {
  const dispatch = useDispatch();
  const modal: ModalSliceHookProps = useModalSlice(dispatch);
  const { prompt } = useAlert(dispatch);
  const [{ screen }, setModal, closeModal] = modal;
  const { login, saveUser } = useUserApi(dispatch, prompt);

  const {
    form: loginForm,
    setForm: setLoginForm,
    handleUser: handleLoginUser,
    handlePassword: handleLoginPassword,
    handleLogin: handleLoginLogin,
  } = useLoginForm(dispatch, modal, login, saveUser);

  const {
    form: registrationForm,
    setForm: setRegistrationForm,
    handleUserRegistration,
    inputHandlers: UserRegistrationInputHandlers,
    validators: RegisterUserValidators,
  }: UserRegistrationProps = useUserRegistration(dispatch, setModal);

  const {
    username,
    email,
    password,
    error: { warning: registerError },
  } = registrationForm;
  const { error: loginError } = loginForm;
  const [animation, warning] = useUserModalAnimations(
    screen,
    getUserAnimationArgs(loginError, registerError, setLoginForm, setRegistrationForm)
  );

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
    <Modal id={'user-modal'} hide={hide} height={height ?? '100%'} width={'44.5rem'} zIndex={9998} warning={warning}>
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
                form={registrationForm}
                setForm={setRegistrationForm}
                setModal={setModal}
                handleUserRegistration={handleUserRegistration}
                inputHandlers={UserRegistrationInputHandlers}
                validators={RegisterUserValidators}
                screen={screen}
              />
            </MotionDiv>
          )}
        </AnimatePresence>
      )}
    </Modal>
  );
};

const getUserAnimationArgs = (
  loginError: string,
  registerError: string,
  setLoginForm: Dispatch<SetStateAction<LoginState>>,
  setRegistrationForm: Dispatch<SetStateAction<RegisterUserState>>
): userModalErrors => ({
  loginError,
  registerError,
  setLoginError: (error: string) => setLoginForm((prevState: LoginState) => ({ ...prevState, error })),
  setRegisterError: (error: string) =>
    setRegistrationForm((prevState: RegisterUserState) => ({
      ...prevState,
      error: {
        ...prevState.error,
        warning: error,
      },
    })),
});
