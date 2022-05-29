import { memo, useCallback, useState } from 'react';
import Link from 'next/link';
import { Box } from '@chakra-ui/react';

export interface UserMenuItemProps {
  to: string;
  text: string;
  onClick: (...args: any[]) => any;
  firstItem?: boolean;
  lastItem?: boolean;
}

export const UserMenuItem = memo(
  ({ to, text, onClick, firstItem = true, lastItem = false }: UserMenuItemProps): JSX.Element => {
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
          fontSize={'1.125rem'}
          onClick={onTextClick}
          cursor={'pointer'}
          transition={'all 0.25s'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          p={'4px 4px 4px 6px'}
        >
          <Box
            px={4}
            h={'full'}
            padding={'0.3125rem 1rem'}
            bgColor={hover ? '#3b3b3b' : '#282c34'}
            borderTopRightRadius={firstItem ? '10000px' : 0}
            borderBottomLeftRadius={lastItem ? '10000px' : 0}
          >
            {text}
          </Box>
        </Box>
      </Link>
    );
  }
);
UserMenuItem.displayName = 'UserMenuItem';
