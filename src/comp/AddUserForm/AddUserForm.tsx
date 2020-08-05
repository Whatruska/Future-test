import React, { FunctionComponent } from 'react'
import * as Yup from 'yup'
import { withFormik, FormikProps, Field } from 'formik'
import { Button, Form } from 'reactstrap'
import { User } from '../../types/types'
import { FormInput } from './FormInput/FormInput'
const AddSchema = Yup.object().shape({
  id: Yup.number()
    .required('Id is required'),
  firstName: Yup.string()
    .max(50, 'Too Long!')
    .required('First name is required'),
  lastName: Yup.string()
    .max(50, 'Last name is too long')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  phone: Yup.string()
    .max(12, 'Phone is too long')
    .required('Phone is required')
})

interface Props {
    addUser: (user: User) => void
}
export const AddUserForm: FunctionComponent<Props> = ({ addUser }) => {
    interface FormValues {
        id: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        submit: (user: User) => void
    }

    const InnerForm = (props: FormikProps<FormValues>) => {
      const { isSubmitting, handleSubmit, isValid } = props
      const disabled = isSubmitting || !isValid
      return (
        <Form onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}>
          <Field type="number" name="id" label={'ID'} id={'id'} component={FormInput}/>

          <Field type="text" name="firstName" label={'First name'} id={'firstName'} component={FormInput}/>

          <Field type="text" name="lastName" label={'Last name'} id={'lastName'} component={FormInput}/>

          <Field type="email" name="email" label={'Email'} id={'email'} component={FormInput}/>

          <Field type="phone" name="phone" label={'Phone'} id={'phone'} component={FormInput}/>

          <Button color={disabled ? 'secondary' : 'success'} disabled={disabled}>
                    Submit
          </Button>
        </Form>
      )
    }

    const MyForm = withFormik<Props, FormValues>({
      mapPropsToValues: props => {
        return {
          submit: props.addUser,
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        }
      },

      validationSchema: AddSchema,

      handleSubmit: values => {
        values.submit({
          id: Number(values.id),
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone
        })
      }
    })(InnerForm)

    // Use <MyForm /> wherevs
    return (
      <div>
        <MyForm addUser={addUser}/>
      </div>
    )
}
