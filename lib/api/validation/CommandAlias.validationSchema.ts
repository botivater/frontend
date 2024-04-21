import * as Yup from 'yup'

export const options = [
  'ping',
  'dev',
  'toneindicator',
  'vindeenvriendje',
  'help',
  'set-birthday',
  'report',
  'generate-login',
  'couple-login',
  'q-and-a',
  'ask-ai',
  'chat-ai-reply',
  'ask-anonymously',
  'abbreviation',
]

export const CommandAliasValidationSchema = Yup.object().shape({
  commandName: Yup.string()
    .min(1, 'Too short!')
    .max(32, 'Too long!')
    .required('Required!'),
  internalName: Yup.string()
    .min(1, 'Too short!')
    .max(32, 'Too long!')
    .required('Required!')
    .oneOf(options, 'Invalid command!'),
})
