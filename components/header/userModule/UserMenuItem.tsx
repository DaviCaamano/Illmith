import { memo, useCallback, useState } from 'react';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';

export interface UserMenuItemProps {
  visible: boolean;
  to: string;
  text: string;
  onClick: (...args: any[]) => any;
  delay: number;
}

export const UserMenuItem = memo(({ to, text, onClick }: UserMenuItemProps): JSX.Element => {
  const [hover, setHover] = useState<boolean>(false);

  const onTextClick = useCallback(
    (...args: any[]) => {
      onClick(...args);
    },
    [onClick]
  );
  return (
    <Link href={to} passHref>
      <Box
        className={'user-menu-item'}
        width={'full'}
        border-top={'1px lightgray'}
        border-bottom={'1px lightgray'}
        color={'white'}
        px={'0.1875rem '}
        fontSize={'1.125rem'}
        onClick={onTextClick}
        cursor={'pointer'}
        transition={'all 0.25s'}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Box px={4} h={'full'} bgColor={hover ? '#191919' : '#282c34'} padding={'0.3125rem 1rem'}>
          {text}
        </Box>
      </Box>
    </Link>
  );
});
UserMenuItem.displayName = 'UserMenuItem';
