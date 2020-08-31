import { FormikErrors } from 'formik'

export const getErrorMessageFromArray = <T = any>(
  error: string | string[] | FormikErrors<T>[] | undefined,
  index: number,
): string | undefined => {
  if (typeof error === 'string') {
    return error
  } else if (Array.isArray(error)) {
    const errorForIndex = error[index]
    if (typeof errorForIndex === 'string') {
      return errorForIndex
    } else if (typeof errorForIndex === 'object') {
      return Object.values(errorForIndex).join(', ')
    }
  }
}
