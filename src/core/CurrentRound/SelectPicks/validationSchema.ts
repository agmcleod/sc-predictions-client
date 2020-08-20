import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  answers: yup.array().of(yup.string().required()),
})
