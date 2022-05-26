import { colors } from '@colors';
import { Box, Flex } from '@chakra-ui/react';

interface BaseAlertTemplateProps {
  message: string;
  subMessage?: string;
  children: JSX.Element;
}
export const BaseAlertTemplate = ({ message, subMessage, children }: BaseAlertTemplateProps) => (
  <Flex className={'email-notification-prompt'} w={'full'} maxW={'18rem'} flexDir={'column'}>
    <Flex w={'full'} mb={4}>
      {children && (
        <Box pos={'relative'} w={'5.875rem'}>
          <Box pos={'absolute'} h={'full'}>
            {children}
          </Box>
        </Box>
      )}
      <Box flex={1} color={colors.text.defaultDark}>
        {message}
      </Box>
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
        {subMessage}
      </Flex>
    )}
  </Flex>
);
