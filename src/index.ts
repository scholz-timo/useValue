import useValue from './useValue';
import useValidator from './useValidator';
import useFormSimplification from './useFormSimplification';

import EMailValidator from './validator/EMail';
import MatchesValidator from './validator/Matches';
import MinLengthValidator from './validator/MinLength';
import RequiredValidator from './validator/Required';

export default useValue;
export {
  useValidator,
  useFormSimplification,
  EMailValidator,
  MatchesValidator,
  MinLengthValidator,
  RequiredValidator
};
