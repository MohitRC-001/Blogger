import { createSlice } from "@reduxjs/toolkit"
import database from "../appwrite/database"

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
    },
    reducers: {
        updatePosts: (state, action) => {
            state.posts = action.payload.posts
        },
    },
})

export const { updatePosts } = postSlice.actions

export default postSlice.reducer
