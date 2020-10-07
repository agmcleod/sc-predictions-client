import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  playerOne: yup.string().required(),
  playerTwo: yup.string().required(),
})
