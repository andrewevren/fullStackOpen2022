import { createSlice } from "@reduxjs/toolkit"

const initialState = 'Page loaded'

const notificationSlice = createSlice({
  name: 'notification',
  initialState
})

export default notificationSlice.reducer