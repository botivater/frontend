import { Field, FieldProps } from 'formik'

export const ErrorMessage = ({ name }: { name: string }) => (
  <Field name={name}>
    {({ meta }: FieldProps) => {
      return meta.touched && meta.error ? (
        <small className="formError">{meta.error}</small>
      ) : null
    }}
  </Field>
)
