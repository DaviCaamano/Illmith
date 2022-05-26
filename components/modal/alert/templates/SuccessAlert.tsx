import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';
import { colors } from '@colors';
import { stringToJsx } from '@utils/stringToJsx';
export const SuccessAlert = ({
  message,
  subMessage,
}: {
  message: string | string[];
  subMessage?: string | string[];
}) => (
  <Flex className={'email-notification-prompt'} w={'full'} maxW={'18rem'} flexDir={'column'}>
    <Flex w={'full'} justify={'center'} align={'center'}>
      <Box pos={'relative'} w={'4.6875rem'}>
        <Image height={80} width={75} src={'/icons/approve.svg'} alt={'Success!'} />
      </Box>
      <Flex flex={1} color={colors.text.defaultDark} mx={'1.25rem'}>
        {stringToJsx(message, 'success-alert')}
      </Flex>
    </Flex>
    {subMessage && (
      <Flex
        justify={'center'}
        align={'center'}
        mt={6}
        mb={2}
        fontSize={'1rem'}
        w={'full'}
        color={colors.text.defaultDark}
      >
        {stringToJsx(subMessage, 'success-sub-alert')}
      </Flex>
    )}
  </Flex>
);
