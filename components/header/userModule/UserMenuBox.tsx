import { Text } from '@chakra-ui/react';

interface UserMenuBoxProps {
  toggleVisible: () => void;
  name: string | null;
}
export const UserMenuBox = ({ toggleVisible, name }: UserMenuBoxProps) => {
  return (
    <div id="logged-user" onClick={toggleVisible}>
      <Text
        display={'block'}
        text-overflow={'ellipsis'}
        white-space={'nowrap'}
        overflow={'hidden'}
        text-align={'left'}
        marginTop={'0.1875rem'}
      >
        Welcome,
      </Text>
      <Text
        display={'block'}
        text-overflow={'ellipsis'}
        white-space={'nowrap'}
        overflow={'hidden'}
        text-align={'left'}
        marginTop={'-0.5rem'}
      >
        &nbsp; &nbsp; {name}
      </Text>
    </div>
  );
};
