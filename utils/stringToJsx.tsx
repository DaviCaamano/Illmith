import { Box } from '@chakra-ui/react';

export const stringToJsx = (message: string | string[], key: string) => {
  const messageArray: JSX.Element[] = [];
  if (Array.isArray(message)) {
    message.forEach((line: string, index: number) => {
      if (index > 0) {
        messageArray.push(<br key={key + '-br-' + index} />);
      }
      messageArray.push(<Box key={key + '-' + index}>{line}</Box>);
    });
  } else {
    messageArray.push(<Box key={key}>{message}</Box>);
  }
  return messageArray;
};
