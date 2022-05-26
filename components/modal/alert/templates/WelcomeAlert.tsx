import { Box, Flex } from '@chakra-ui/react';
import { colors } from '@colors';
import { Span } from '@components/shared';
import Image from 'next/image';
import { memo } from 'react';
import { stringToJsx } from '@utils/stringToJsx';

export const WelcomeAlert = memo(({ message }: { message: string | string[] }) => {
  return (
    <Flex className={'email-notification-prompt'} flexDir={'column'} p={'3rem 2rem'}>
      <Flex w={'full'} mb={4} flexDir={'column'} h={14} justify={'center'} align={'center'}>
        <Box flex={1} color={colors.text.defaultDark} fontSize={'3rem'}>
          Welc
          <Span pos={'relative'} top={'0.4375rem'}>
            <Image src={'/icons/mems.svg'} height={40} width={40} alt={'Welcome!'} />
          </Span>
          me
        </Box>
        <Box flex={1} color={colors.text.defaultDark} fontSize={'1.5rem'}>
          {stringToJsx(message, 'welcome-alert')}
        </Box>
      </Flex>
    </Flex>
  );
});
WelcomeAlert.displayName = 'WelcomeAlert';
