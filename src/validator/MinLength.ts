import { ReactNode, useCallback } from "react";

interface LengthLike {
  length: number;
}

const MinLength = (length: number) => {
  return useCallback((message: ReactNode) => (value: LengthLike) => ({ isValid: value.length >= length, message }), [ length ]);
}

export default MinLength;
