// import { ChangeEvent, FormEventHandler, memo } from 'react';
// //img
// import backButton from '@icons/chevron-left-gold_UNUSED.svg';
// import CircleCheck from '@icons/circle-check-green.svg';
//
// //Components
// import { InputError } from '@components/inputError';
// import Link from 'next/link';
// import Image from 'next/image';
// import { Box, Text } from '@presets-ui/react';
//
// //types
// import { CSSProperties } from 'react';
// import { PasswordValidation } from '@components/user';
//
// interface PasswordResetProps {
//   passwordValidation: PasswordValidation;
//   stage: number;
//   swapToLogin: () => void;
//   submit: FormEventHandler<HTMLFormElement>;
//   warning: string | null;
//   setWarning: (warning: string | null) => void;
//   input: string;
//   inputChange: (e: ChangeEvent<HTMLInputElement>) => void;
// }
// export const PasswordReset = ({
//   passwordValidation,
//   stage,
//   swapToLogin,
//   submit,
//   warning,
//   setWarning,
//   input,
//   inputChange,
// }: PasswordResetProps) => {
//   const passwordBullets = [
//       passwordValidation.hasSixCharacters ? <Check /> : <>&#8226;</>,
//       passwordValidation.hasCorrectCase ? <Check /> : <>&#8226;</>,
//       passwordValidation.hasNumber ? <Check /> : <>&#8226;</>,
//     ],
//     passwordBulletsColors = [
//       passwordValidation.hasSixCharacters ? 'green' : 'black',
//       passwordValidation.hasCorrectCase ? 'green' : 'black',
//       passwordValidation.hasNumber ? 'green' : 'black',
//     ],
//     bulletSpanStyle: CSSProperties = {
//       display: 'inline-block',
//       width: '1.25rem',
//       textAlign: 'center',
//     };
//
//   return (
//     <form className={'h-full w-full py-[0.9375rem] px-[1.5625rem]'} onSubmit={submit}>
//       <Box display={stage === 2 ? 'none' : 'block'} fontSize={'1.875rem'} mb={'1.5625rem'} fontWeight={'500'}>
//         <Text fontSize={'1.25rem'} float={'right'} fontWeight={'bold'}>
//           <Link href={'#'} passHref>
//             <Box
//               textDecoration={'none'}
//               fontSize={'1.5rem'}
//               mb={'0.9375rem'}
//               fontWeight={'500'}
//               bgColor={'#e3af4a'}
//               bgImage={'linear-gradient(0deg, #e3af4a, #795b44)'}
//               bgSize={'100%'}
//               fill={'transparent'}
//               bgClip={'text'}
//               onClick={swapToLogin}
//               _hover={{ textDecoration: 'none' }}
//             >
//               <Image
//                 src={backButton}
//                 style={{
//                   height: '1rem',
//                   marginBottom: '0.1875rem',
//                 }}
//                 alt={'Back to Login'}
//               />
//             </Box>{' '}
//             Login
//           </Link>
//         </Text>
//       </Box>
//
//       <label htmlFor="reset-password-input">
//         <Text fontWeight={'bold'}>
//           {stage === 2 ? 'Enter your new password' : 'Enter your username or account email'}
//         </Text>
//       </label>
//       <br />
//       <InputError error={warning} setError={setWarning}>
//         <input
//           id={'reset-password-input'}
//           type={stage === 2 ? 'password' : 'text'}
//           placeholder={stage === 2 ? 'New Password' : 'Username or account email'}
//           name="email"
//           required
//           value={input}
//           onChange={inputChange}
//         />
//       </InputError>
//       <br />
//       <button id={'reset-password-button'} type="submit">
//         Request Reset
//       </button>
//
//       <div className={`reset-password-infobox ${stage === 2 ? '' : 'd-none'}`}>
//         Your Password must contain at least:
//         <br />
//         <span style={{ color: passwordBulletsColors[0] }}>
//           <span style={bulletSpanStyle}>{passwordBullets[0]}</span>6 characters
//         </span>
//         <br />
//         <span style={{ color: passwordBulletsColors[1] }}>
//           <span style={bulletSpanStyle}>{passwordBullets[1]}</span>1 upper and lower case letter
//         </span>
//         <br />
//         <span style={{ color: passwordBulletsColors[2] }}>
//           <span style={bulletSpanStyle}>{passwordBullets[2]}</span>1 number
//         </span>
//       </div>
//     </form>
//   );
// };
//
// const Check = memo(function Check() {
//   return (
//     <Box
//       style={{
//         height: '0.875rem',
//         width: '0.875rem',
//         position: 'relative',
//         bottom: '0.0625rem',
//       }}
//     >
//       <Image src={CircleCheck} alt={'check mark icon'} />
//     </Box>
//   );
// });
export {};
