import { ReactNode, useCallback } from "react";

const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;

const EMail = (message: ReactNode) => {
  return useCallback((value: string) => ({ isValid: regex.test(value), message }), [message]);
};

export default EMail;
