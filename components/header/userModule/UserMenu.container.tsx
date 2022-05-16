import { useState, useEffect, useRef } from 'react';

//components
import { UserMenu, UserMenuBox } from './index';
import { Box } from '@chakra-ui/react';

interface UserMenuItems {
  to: string;
  onClick: (...args: any[]) => any;
  text: string;
}

interface UserMenuContainerProps {
  handleLogout: (...args: any[]) => any;
  name: string | null;
}
export const UserMenuContainer = ({ handleLogout, name }: UserMenuContainerProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const menuItems: UserMenuItems[] = [
    {
      to: '#',
      onClick: handleLogout,
      text: 'logout',
    },
  ];

  const [visible, setVisible] = useState(false);

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && event.target && !menuRef.current?.contains(event.target as Node)) {
      setVisible(false);
    }
  }

  // eslint-disable-next-line
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  const toggleVisible = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <Box
      id={'user-menu-container'}
      h={'100%'}
      w={'12.5rem'}
      display={'flex'}
      flexDir={'row'}
      justifyContent={'flex-end'}
      overflow={'hidden'}
      marginRight={'0.9375rem'}
      ref={menuRef}
      _hover={{ cursor: 'pointer' }}
    >
      <UserMenuBox name={capitalize(name)} toggleVisible={toggleVisible} />
      <UserMenu visible={visible} items={menuItems} />
    </Box>
  );
};

const capitalize = (s?: string | null) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
