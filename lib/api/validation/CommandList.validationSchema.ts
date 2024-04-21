import * as Yup from 'yup'

export const CommandListValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Too short!')
    .max(32, 'Too long!')
    .required('Required!'),
  description: Yup.string()
    .min(1, 'Too short!')
    .max(100, 'Too long!')
    .required('Required!'),
  options: Yup.array()
    .of(
      Yup.string()
        .min(1, 'Too short!')
        .max(255, 'Too long!')
        .required('Required!')
    )
    .required('Must have options!'),
})
