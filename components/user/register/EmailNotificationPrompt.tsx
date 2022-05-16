import { Box, Flex } from '@chakra-ui/react';
import MailIcon from '@icons/mail-prompt.svg';
import { colors } from '@colors';

export const EmailNotificationPrompt = ({ message }: { message: string }) => (
  <Flex w={'full'} maxW={'18rem'} mb={4}>
    <Box pos={'relative'} w={'5.875rem'}>
      <Box pos={'absolute'} h={'full'}>
        <MailIcon />
      </Box>
    </Box>
    <Box px={2} flex={1} color={colors.text.default}>
      {message}
    </Box>
  </Flex>
);
