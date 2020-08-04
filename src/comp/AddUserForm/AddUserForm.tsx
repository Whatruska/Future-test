import React, { FunctionComponent } from 'react'
import * as Yup from 'yup'
import { withFormik, FormikProps, Field } from 'formik'
import { Form, FormGroup, Label } from 'reactstrap'
import { User } from '../../types/types'
const AddSchema = Yup.object().shape({
  id: Yup.number()
    .required('Required'),
  firstName: Yup.string()
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required(),
  phone: Yup.string()
    .max(12, 'Too Long!')
    .required()
})

interface Props {
    addUser: (user: User) => void
}
export const AddUserForm: FunctionComponent<Props> = ({ addUser }) => {
    interface FormValues {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        submit: (user: User) => void
    }

    const InnerForm = (props: FormikProps<FormValues>) => {
      const { touched, errors, isSubmitting, handleSubmit } = props
      return (
        <Form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
        }}>
          <Field type="number" name="id" />
          {touched.id && errors.id && <div>{errors.id}</div>}

          <Field type="text" name="firstName" />
          {touched.firstName && errors.firstName && <div>{errors.firstName}</div>}

          <Field type="text" name="lastName" />
          {touched.lastName && errors.lastName && <div>{errors.lastName}</div>}

          <Field type="email" name="email" />
          {touched.email && errors.email && <div>{errors.email}</div>}

          <Field type="phone" name="phone" />
          {touched.phone && errors.phone && <div>{errors.phone}</div>}

          <button disabled={isSubmitting}>
                    Submit
          </button>
        </Form>
      )
    }

    const MyForm = withFormik<Props, FormValues>({
      mapPropsToValues: props => {
        return {
          submit: props.addUser,
          id: 1001,
          firstName: '',
          lastName: '',
          email: '',
          phone: ''
        }
      },

      validationSchema: AddSchema,

      handleSubmit: values => {
        values.submit({
          id: values.id,
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
