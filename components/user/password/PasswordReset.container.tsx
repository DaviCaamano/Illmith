// import axios from 'axios';
// import { clientCodes, errorCodes, getCode } from '@error';
//
// //hooks
// import { useState } from 'react';
// import { useRouter } from 'next/router';
//
// //Components
// import { Modal } from '@components/modal';
// import { PasswordReset } from '@components/user';
//
// //types
// import { ChangeEvent, FormEvent, FormEventHandler } from 'react';
// import { AlertFunc } from '@contexts/redux';
//
// export interface PasswordValidation {
//   hasSixCharacters: boolean;
//   hasCorrectCase: boolean;
//   hasNumber: boolean;
// }
// interface PasswordResetContainerState {
//   input: string;
//   warning: string | null;
//   passwordValidation: PasswordValidation;
// }
//
// const initialState = {
//   input: '',
//   warning: null,
//   passwordValidation: {
//     hasSixCharacters: false,
//     hasCorrectCase: false,
//     hasNumber: false,
//   },
// };
//
// interface PasswordResetContainerProps {
//   setLoginModalVisible: (set: boolean) => void;
//   setModalVisible: (set: boolean) => void;
//   stage: number;
//   token: string;
//   modalVisible: boolean;
//   alert: AlertFunc;
// }
//
// export const PasswordResetContainer = ({
//   setLoginModalVisible,
//   setModalVisible,
//   stage,
//   token,
//   modalVisible,
//   alert,
// }: PasswordResetContainerProps) => {
//   const router = useRouter();
//   const [{ input, warning, passwordValidation }, setInputs] = useState<PasswordResetContainerState>(initialState);
//
//   const validatePassword = () => {
//     const hasEnoughLetters = new RegExp('(?=.{6,})').test(input);
//     const hasNumber = new RegExp('(?=.*[0-9])').test(input);
//     const hasLowercase = new RegExp('(?=.*[a-z])').test(input);
//     const hasUppercase = new RegExp('(?=.*[A-Z])').test(input);
//
//     setInputs((prevState: PasswordResetContainerState) => ({
//       ...prevState,
//       passwordValidation: {
//         hasSixCharacters: hasEnoughLetters,
//         hasCorrectCase: hasLowercase && hasUppercase,
//         hasNumber: hasNumber,
//       },
//     }));
//   };
//
//   const passwordIsValidated = (validations = passwordValidation) =>
//     validations.hasSixCharacters && validations.hasCorrectCase && validations.hasNumber;
//
//   const swapToLogin = () => {
//     setModalVisible(false);
//     setLoginModalVisible(true);
//   };
//
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (stage === 2) validatePassword();
//     setInputs((prevState: PasswordResetContainerState) => ({
//       ...prevState,
//       input: e.target.value,
//     }));
//   };
//
//   const handleInitialRequest: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//
//     axios({
//       method: 'get',
//       url: process.env.REACT_APP_API_URL + '/users/resetPassword',
//       params: { user: input },
//     })
//       .then(() => {
//         setInputs((prevState: PasswordResetContainerState) => ({
//           ...prevState,
//           input: '',
//         }));
//         swapToLogin();
//         alert(clientCodes.ResetPassword.emailSent.message);
//       })
//       .catch((err) => {
//         if (err && err.response && err.response.data) {
//           //Invalid Login Information
//           if (err.response.data.code) {
//             const { message } = getCode(err.response.data.code);
//             alert(message);
//           }
//         } else {
//           alert(errorCodes.ResetPassword.generic.message);
//         }
//       });
//   };
//
//   const setWarning = (warning: string | null) => {
//     setInputs((prevState: PasswordResetContainerState) => ({
//       ...prevState,
//       warning,
//     }));
//   };
//
//   const handleFinalRequest: FormEventHandler<HTMLFormElement> = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (passwordIsValidated()) {
//       axios({
//         method: 'post',
//         url: process.env.REACT_APP_API_URL + '/users/resetPassword',
//         data: {
//           password: input,
//           token: token,
//         },
//       })
//         .then(() => {
//           setInputs(initialState);
//           setModalVisible(false);
//           router.push('/').then();
//           alert(clientCodes.ResetPassword.success.message);
//         })
//         .catch((err) => {
//           if (err && err.response && err.response.data) {
//             //Invalid Login Information
//             if (err.response.data.code) {
//               const { message } = getCode(err.response.data.code);
//               alert(message);
//             }
//           } else {
//             alert(errorCodes.ResetPassword.generic.message);
//           }
//         });
//     } else {
//       setWarning(errorCodes.ResetPassword.invalidPassword.message);
//     }
//   };
//   const onBackdropClick = () => false;
//   return (
//     <Modal
//       visible={modalVisible}
//       setVisible={setModalVisible}
//       height={stage === 1 ? '300px' : '450px'}
//       width={'700px'}
//       onBackdropClick={onBackdropClick}
//     >
//       <PasswordReset
//         stage={stage}
//         submit={stage === 1 ? handleInitialRequest : handleFinalRequest}
//         input={input}
//         inputChange={handleInputChange}
//         swapToLogin={swapToLogin}
//         passwordValidation={passwordValidation}
//         warning={warning}
//         setWarning={setWarning}
//       />
//     </Modal>
//   );
// };
export {};
