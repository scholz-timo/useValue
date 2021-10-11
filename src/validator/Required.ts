import { ReactNode, useCallback } from "react";

const Required = (message: ReactNode) => {
  return useCallback((value: any) => ({ isValid: Boolean(value), message }), [message]);
};

export default Required;
