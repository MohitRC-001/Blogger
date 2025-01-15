import { configureStore } from "@reduxjs/toolkit"
import accountSlice from "./accountSlice"
import postSlice from "./postSlice"

const store = configureStore({
    reducer: {
        auth: accountSlice,
        posts: postSlice,
    },
})

export default store
