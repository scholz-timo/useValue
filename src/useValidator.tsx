import { useMemo, useState } from "react";
import { useAsyncCallback } from "react-use-async-callback";
import { ValidatorResult, ValidatorType } from "./types";

function useValidator<T>(validators: ValidatorType<T>[], updators: Array<any>) {

  const [isPristine, setIsPristine] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [validatorState, setValidatorState] = useState<Array<ValidatorResult>>([]);

  const [validate, {
    isExecuting
  }] = useAsyncCallback(async (value: T) => {
    const validationResults = await Promise.all(validators.map((validator) => validator(value)));
    const isValid = validationResults.find(({ isValid }) => !isValid) === undefined;

    setValidatorState(validationResults);
    setIsValid(isValid);
    setIsPristine(false);
    return isValid;
  },
    // Disable eslint for next line (only update this when validators dependencyies have updated)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    updators)
    ;

  return useMemo(() => ({
    isPristine,
    isValid,
    results: validatorState,
    validate,
    isValidating: isExecuting
  }),
    // Disable eslint for next line (only update this when validators dependencyies have updated)
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    [isPristine, isValid, validatorState, isExecuting]
  );
}

export default useValidator;
