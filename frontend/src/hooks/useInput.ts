import { useState } from 'react';

const useInput = (key: string, initValue: string) => {
  const [value, setValue] = useState<string>(initValue);

  const reset = () => setValue(initValue);

  const inputAttributes = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
  };

  return [value, reset, inputAttributes] as const;
};

export default useInput;