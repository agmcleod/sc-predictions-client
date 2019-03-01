import { createSlice } from 'redux-starter-kit'

export const currentUser = createSlice({
  slice: 'currentUser',
  initialState: {
    uuid: ''
  },
  reducers: {
    setUUID: (state, action) => ({
      uuid: action.payload
    })
  }
})
