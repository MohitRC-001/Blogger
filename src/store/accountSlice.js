import { createSlice } from "@reduxjs/toolkit"

const accountSlice = createSlice({
    name: "account",
    initialState: {
        status: false,
        userData: null,
    },
    reducers: {
        loginUser: (state, action) => {
            state.status = true
            state.userData = action.payload
        },
        logoutUser: (state, action) => {
            state.status = false
            state.userData = null
        },
    },
})

export const { loginUser, logoutUser } = accountSlice.actions

export default accountSlice.reducer
