import React from "react"
import database from "../appwrite/database"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { updatePosts } from "../store/postSlice"
import getPostData from "../api/updatePost"

function DeletePostBtn({ postId, imageId }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const getData = async () => {
        const data = await getPostData()
        if (data) {
            dispatch(updatePosts({ posts: data }))
        }
    }

    const handleDeletePost = (e) => {
        database.deletePost(postId, imageId).then((res) => {
            if (res.message === "") {
                getData()
                navigate("/")
            }
        })
    }

    return (
        <div>
            <button
                onClick={handleDeletePost}
                className="rounded-lg bg-red-500 px-4 py-2 text-xl font-semibold text-white shadow-md shadow-black duration-200 active:shadow-sm active:shadow-black"
            >
                Delete
            </button>
        </div>
    )
}

export default DeletePostBtn
