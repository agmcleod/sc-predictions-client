import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  answers: yup.array().of(
    yup
      .object()
      .shape({
        id: yup.number().required(),
        value: yup.string().required(),
      })
      .required(),
  ),
})
