import { createSlice } from "@reduxjs/toolkit"

const initialState = null

let timeout = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    writeNotification(state,action) {
      return action.payload
    },
    removeNotification(state,action) {
      return initialState
    }
  }
})

export const setNotification = (notification,time) => {
  return dispatch => {
    dispatch(writeNotification(notification))
    timeout && clearTimeout(timeout)
    timeout = setTimeout(()=>dispatch(removeNotification()),time*1000)
  }
}

export const { writeNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer