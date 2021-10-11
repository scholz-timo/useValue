import { ReactNode, useCallback } from "react";

function Matches<T>(value: T) {
  return useCallback((message: ReactNode) => {
    return (inValue: T) => ({ isValid: JSON.stringify(inValue) === JSON.stringify(value), message });
  }, [value]);
}

export default Matches;
