import { useState, useCallback } from 'react';

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);
  const handler = useCallback((e) => {
    const { value } = e.target;
    setValue(value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
