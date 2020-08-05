import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
import React from 'react'
interface Props {
    field: any
    form: {
        touched: any,
        errors: any
    }
    id: string,
    label: string
}
export const FormInput: React.FunctionComponent<Props> = ({ field, form: { touched, errors }, ...props }) => {
  const { name } = field
  return (
    <FormGroup>
      <Label for={props.id}>
        {props.label}
      </Label>
      <Input
        {...field}
        {...props}
        invalid={touched[name] && errors[name]}
        valid={touched[name] && !errors[name]}
      />
      {touched[name] && errors[name] && <FormFeedback>{errors[name]}</FormFeedback>}
    </FormGroup>
  )
}
