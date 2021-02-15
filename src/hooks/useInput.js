import { useState, useCallback, useEffect } from 'react';

const useInput = (initValue) => {
  const [value, setValue] = useState(initValue);
  useEffect(() => setValue(initValue), [initValue]);
  const handler = useCallback((e) => {
    const { value } = e.target;
    setValue(value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
