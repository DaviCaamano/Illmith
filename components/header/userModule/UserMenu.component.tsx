//components
import Link from 'next/link';
import { Box, Text } from '@chakra-ui/react';

//types
interface UserMenuItemProps {
  to: string;
  text: string;
  onClick: (...args: any[]) => any;
}
export const UserMenu = ({ items, visible }: { items: UserMenuItemProps[]; visible: boolean }) => {
  let keyIndex = 0;
  return (
    <Box
      style={{ display: visible ? 'block' : 'none' }}
      border={'1px black'}
      background-color={'#282c34'}
      padding={'0.1875rem 0.625rem'}
      display={'block'}
      transform={'translateY(-0.3125rem)'}
      filter={'drop-shadow(0px 4px 6px black)'}
      width={'5vw'}
      left={'unset'}
      right={'-0.3125rem'}
      _hover={{ cursor: 'pointer' }}
    >
      {items
        ? items.map(({ to, text, onClick }: UserMenuItemProps) => (
            <UserMenuItem key={keyIndex++} to={to} onClick={onClick} text={text} />
          ))
        : null}
    </Box>
  );
};

const UserMenuItem = ({ to, text, onClick }: UserMenuItemProps) => {
  const onTextClick = (...args: any[]) => {
    onClick(...args);
  };
  return (
    <Link href={to} passHref>
      <Text color={'white'} onClick={onTextClick} _hover={{ bgColor: '#4e5564' }}>
        <Box
          width={'full'}
          padding={'0.3125rem'}
          border-top={'1px lightgray'}
          border-bottom={'1px lightgray'}
          color={'gray'}
          _hover={{
            bgColor: '#282c34',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {text}
        </Box>
      </Text>
    </Link>
  );
};
