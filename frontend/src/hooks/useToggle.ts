import { useState, Dispatch, SetStateAction, ChangeEvent } from 'react';
import useLocalStorage from './useLocalStorage';

type UseToggleResult = [boolean, (event?: ChangeEvent<HTMLInputElement> | boolean) => void];

const useToggle = (key: string, initValue: boolean): UseToggleResult => {
  const [value, setValue] = useLocalStorage<boolean>(key, initValue);

  const toggle = (event?: ChangeEvent<HTMLInputElement> | boolean) => {
    if (event && typeof event === 'boolean') {
      setValue(event);
    } else if (event && 'target' in event && 'checked' in event.target) {
      setValue(event.target.checked);
    } else {
      setValue((prev: boolean) => !prev);
    }
  };

  return [value, toggle];
};

export default useToggle;