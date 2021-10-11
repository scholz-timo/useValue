import { ReactNode, SyntheticEvent } from 'react';

export type ValidatorResult = {
  isValid: boolean;
  message: ReactNode;
}

export type ValidatorType<T> = (value: T) => ValidatorResult;

// eslint-disable-next-line
export type UseValidatorResultValue<Type> = {
  isValid: boolean;
  isPristine: boolean;
  isValidating: boolean;
  results: Array<ValidatorResult>;
}

export type UseFormResultValue<Type> = {
  value: Type;
  onChange: (value: Type, event: SyntheticEvent) => void;
} & UseValidatorResultValue<Type>;

export type WithFormType<Type> = {
  value: Type;
  onChange: (value: Type, event: SyntheticEvent) => void;
  isPristine?: boolean;
  isValid?: boolean;
}

export type WithoutFormType<OldFormType, Type> = Exclude<OldFormType, WithFormType<Type>>;

export type WithAdvancedFormType<Type, OldFormType extends WithFormType<Type>> = Omit<Omit<OldFormType, 'onChange'>, 'value'> &
  Partial<WithFormType<Type>> &
{ form?: UseFormResultValue<Type> }
