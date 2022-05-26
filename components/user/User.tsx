//hooks
import {
  LoginState,
  RegisterUserState,
  ResetPasswordProps,
  useAlert,
  useLoginForm,
  useResetPassword,
  userModalErrors,
  UserRegistrationProps,
  useUserApi,
  useUserModalAnimations,
  useUserRegistration,
} from '@hooks';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

//Components
import { Modal } from '@components/modal';
import { LoginScreen, PasswordResetScreen, RegisterUserScreen } from '@components/user/screens';
import { AnimatePresence, motion } from 'framer-motion';
//types
import { AlertTemplate, ModalSliceHookProps, useModalSlice, UserScreen } from '@contexts';
import { Dispatch, SetStateAction } from 'react';
import { NewPasswordScreen } from '@components/user/screens/NewPasswordScreen';

const MotionDiv = motion.div;

enum ModalHeight {
  'LOGIN' = '25rem',
  'REGISTER' = '25rem',
  'PASSWORD_RESET' = '19.5rem',
  'NEW_PASSWORD' = '25rem',
}

export const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const modal: ModalSliceHookProps = useModalSlice(dispatch);
  const { prompt } = useAlert(dispatch);
  const [{ screen }, setModal, closeModal] = modal;
  const { login, handleLogout, saveUser } = useUserApi(dispatch, router, prompt);

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
    resetPasswordForm,
    newPasswordForm,
    handleResetPasswordSubmit,
    handleNewPasswordSubmit,
    handleResetPasswordInput,
    handleNewPasswordInput,
    setResetPasswordError,
    setNewPasswordError,
  }: ResetPasswordProps = useResetPassword(dispatch, router, setModal, handleLogout);

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

  const height = ModalHeight[screen as keyof typeof ModalHeight];
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
          {screen === UserScreen.password && (
            <MotionDiv key={UserScreen.password} {...animation}>
              <PasswordResetScreen
                form={resetPasswordForm}
                setResetPasswordError={setResetPasswordError}
                setModal={setModal}
                handleResetPasswordSubmit={handleResetPasswordSubmit}
                handleResetPasswordInput={handleResetPasswordInput}
              />
            </MotionDiv>
          )}
          {screen === UserScreen.new_password && (
            <MotionDiv key={UserScreen.new_password} {...animation}>
              <NewPasswordScreen
                form={newPasswordForm}
                setNewPasswordError={setNewPasswordError}
                setModal={setModal}
                handleNewPasswordSubmit={handleNewPasswordSubmit}
                handleNewPasswordInput={handleNewPasswordInput}
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
