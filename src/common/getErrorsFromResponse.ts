export interface ResponseError {
  response?: {
    data: {
      errors: string[]
    }
  }
  message: string
}

export const getErrorsFromResponse = (err: ResponseError): string[] => {
  if (err.response) {
    return err.response.data.errors
  }

  return [err.message]
}
