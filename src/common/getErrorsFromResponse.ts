export interface ResponseError {
  response: {
    data: {
      errors: string[]
    }
  }
}

export const getErrorsFromResponse = (err: ResponseError) => {
  return err.response.data.errors
}
