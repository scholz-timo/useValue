import React, { FunctionComponent } from "react";
import { WithAdvancedFormType, WithFormType } from './types';



function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function withFormSimplification<Type, FormType extends WithFormType<Type>>(
  OldComponent: FunctionComponent<FormType>
): FunctionComponent<WithAdvancedFormType<Type, FormType>> {
  const newComponent: FunctionComponent<WithAdvancedFormType<Type, FormType>> = (props) => {

    if (props.form) {

      const mergedTypes = {
        ...props,
        value: props.form.value,
        onChange: props.form.onChange,
        isValid: props.form.isValid,
        isPristine: props.form.isPristine
      }

      return (<OldComponent {...mergedTypes as any} />);
    } else {
      return (<OldComponent {...props as any} />);
    }
  }

  newComponent.displayName = `useFormSimplification(${getDisplayName(OldComponent)})`

  return newComponent;
}

export default withFormSimplification;
