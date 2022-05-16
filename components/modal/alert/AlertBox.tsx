//components
import { Box, Button, Flex } from '@chakra-ui/react';
import { colors } from '@colors';
//types
import { ButtonInfo } from '@interface/alert/ButtonInfo';

interface AlertProps {
  content: JSX.Element | string;
  close: () => void;
  buttonInfo: ButtonInfo;
}
export const AlertBox = ({ content, close, buttonInfo: { confirm, cancel, confirmText, cancelText } }: AlertProps) => (
  <Flex p={'2rem'} flexDir={'column'} bg={colors.box.mainBg}>
    <Box textAlign={'center'} p={'0 0.625rem'} fontSize={'1.125rem'} flex={1}>
      {content}
    </Box>
    <Box display={'inline-block'} textAlign={'center'} width={'100%'} pt={'1.5rem'}>
      <Button
        variant={'prompt_dark'}
        w={'full'}
        maxW={'10rem'}
        onClick={() => {
          if (confirm) confirm();
          close();
        }}
      >
        {confirmText || 'Okay'}
      </Button>
      {cancel && (
        <Button
          variant={'prompt_dark'}
          w={'full'}
          maxW={'10rem'}
          onClick={() => {
            if (cancel) cancel();
            close();
          }}
        >
          {cancelText || 'Cancel'}
        </Button>
      )}
    </Box>
  </Flex>
);
