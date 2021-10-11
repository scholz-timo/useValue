import React, { useCallback, useEffect, useMemo, useState } from "react"
import useValidator from "./useValidator";
import { UseFormResultValue, ValidatorType } from './types';

function useValue<T>(defaultValue: T, validators: ValidatorType<T>[], updators: Array<any>) {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  const validatorResults = useValidator(validators, updators);
  
  const {
    isValid,
    validate,
    results,
    isPristine,
    isValidating
  } = validatorResults;

  useEffect(() => {
    validate(internalValue);
  },
  // Disable eslint for next line (only update this when validators dependencyies have updated)
  // eslint-disable-next-line react-hooks/exhaustive-deps 
  updators);


  const setExternalValue = useCallback((value: React.SetStateAction<T>) => {
    if (typeof value === "function") {
      setInternalValue((givenValue) => {
        const result = (value as any)(givenValue);
        validate(result);
        return result;
      })
    } else {
      setInternalValue(value);
      validate(value);
    }
  }, [ validate ]);

  const onChange = useCallback((value: T, event: React.SyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setExternalValue(value);
  }, [ setExternalValue ]);

  const validateExternal = useCallback(async () => {
    const isValid = await validate(internalValue);

    if (!isValid) {
      throw new Error("Validation failed");
    }
    return internalValue;
  }, [ internalValue, validate ]);

  const formStructure = {
    isValid,
    isPristine,
    isValidating,
    onChange,
    value: internalValue,
    results
  };

  return useMemo(() => [
    formStructure, 
    validateExternal, 
    internalValue, 
    setExternalValue
  ] as [
    UseFormResultValue<T>, 
    () => Promise<T>, 
    T, 
    React.Dispatch<React.SetStateAction<T>>
  ],
  // Disable eslint for next line (only update this when validators dependencyies have updated)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [ internalValue, validatorResults ]
  );
}

export default useValue;
