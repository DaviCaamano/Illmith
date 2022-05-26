import { ChangeEvent, Dispatch, KeyboardEventHandler, KeyboardEvent, SetStateAction } from 'react';

export const handleInputChange = <T>(setState: Dispatch<SetStateAction<T>>) => {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    setState((prevState: T) => ({
      ...prevState,
      [name]: value,
    }));
  };
};

export const handleEnterPress = (callBack: Function): KeyboardEventHandler<HTMLInputElement> => {
  return (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      callBack();
    }
  };
};

export const simpleStateSetter = <T, S>(setState: Dispatch<SetStateAction<T>>) => {
  return (name: string, value: S) => {
    setState((prevState: T) => ({
      ...prevState,
      [name]: value,
    }));
  };
};

export const stateSetter = <T, S>(name: keyof T, setState: Dispatch<SetStateAction<T>>) => {
  return (value: S) => {
    setState((prevState: T) => ({
      ...prevState,
      [name]: value,
    }));
  };
};
