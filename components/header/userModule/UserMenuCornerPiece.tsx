import { Dispatch, RefObject, SetStateAction } from 'react';
import { Box } from '@chakra-ui/react';

export const UserMenuCornerPiece = ({
  hover,
  setHover,
  setAntiHover,
  setMenuVisible,
  MenuCornerRef,
}: {
  hover: boolean;
  setHover: Dispatch<SetStateAction<boolean>>;
  setAntiHover: Dispatch<SetStateAction<boolean>>;
  setMenuVisible: Dispatch<SetStateAction<boolean>>;
  MenuCornerRef: RefObject<HTMLDivElement>;
}) => (
  <Box id={'corner-border-box-top-right'} w={'full'} h={'full'} pos={'absolute'}>
    <Box w={'full'} h={'full'} pos={'relative'}>
      <Box
        id={'header-user-menu-corner-piece-top-left'}
        h={'38px'}
        w={'38px'}
        top={'-16px'}
        left={'-24px'}
        overflow={'hidden'}
        pos={'absolute'}
        py={'0.4375rem'}
      >
        <Box
          pos={'absolute'}
          right={'14px'}
          top={'5px'}
          h={'40px'}
          w={'40px'}
          overflow={'hidden'}
          bg={hover ? '#2f343a' : '#282d33'}
          transition={'all 0.5s'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => setMenuVisible((prevState: boolean) => !prevState)}
          pointerEvents={'none'}
          cursor={'default'}
        >
          <Box
            id={'user-menu-corner-tip'}
            pos={'absolute'}
            h={'34px'}
            w={'32px'}
            top={'8px'}
            left={'8px'}
            borderRadius={'0 25px 0  0 '}
            boxShadow={
              hover
                ? 'inset 0 0 3px 3px rgba(255, 255, 255, 0.1), inset 0 0 3px 3px rgba(255, 255, 255, 0.025), ' +
                  'inset 0 0 3px 3px rgba(255, 255, 255, 0.05), inset 0 0 3px 3px rgba(255, 255, 255, 0.05)'
                : 'inset 0 0 2px 3px rgba(255, 255, 255, 0.05), inset 0 0 2px 3px rgba(255, 255, 255, 0.0125), ' +
                  'inset 0 0 2px 3px rgba(255, 255, 255, 0.0125), inset 0 0 2px 3px rgba(255, 255, 255, 0.0125)'
            }
            bg={'#20252b'}
            zIndex={2}
            onMouseEnter={() => setAntiHover(true)}
            onMouseLeave={() => setAntiHover(false)}
            transition={'all 0.5s'}
            cursor={'pointer'}
            ref={MenuCornerRef}
          />
        </Box>
      </Box>
    </Box>
  </Box>
);
