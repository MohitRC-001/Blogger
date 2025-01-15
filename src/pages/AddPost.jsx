import React, { useRef, useState } from "react"
import { Input, Button } from "../components"
import database from "../appwrite/database"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import getPostData from "../api/updatePost"
import { updatePosts } from "../store/postSlice"

function AddPost() {
    const titleRef = useRef()
    const contentRef = useRef()
    const imageRef = useRef()
    const slugRef = useRef()

    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth.userData)
    const dispatch = useDispatch()

    const getData = async () => {
        const data = await getPostData()
        if (data) {
            dispatch(updatePosts({ posts: data }))
        }
    }

    const handleSubmit = (e) => {
        setError(null)
        e.preventDefault()
        if (!titleRef.current.value) {
            setError("Enter the Title")
            return
        } else if (!imageRef.current.value) {
            setError("Upload an Image")
            return
        }

        database
            .addImage({ file: imageRef.current.files[0] })
            .then((image) => {
                if (image) {
                    database
                        .addPost({
                            title: titleRef.current.value,
                            content: contentRef.current.value,
                            userID: userData.$id,
                            featuredImage: image.$id,
                            slug: slugRef.current.value,
                        })
                        .then((post) => {
                            if (post) {
                                getData()
                                navigate("/")
                            }
                        })
                        .catch((e) => {
                            setError(e)
                        })
                }
            })
            .catch((e) => {
                setError(e)
            })
    }

    const makeSlug = (e) => {
        slugRef.current.value = titleRef.current.value
            .toLowerCase()
            .trim()
            .replaceAll(" ", "-")
    }

    return (
        <div className="flex flex-col items-center justify-evenly gap-4 rounded-xl border-2 border-slate-400 bg-gray-200 bg-opacity-20 p-4 shadow-md shadow-black backdrop-blur-md">
            <h2 className="text-xl font-bold">Add New Post</h2>
            {error && (
                <p className="text-lg font-semibold text-red-600">{error}</p>
            )}
            <form onSubmit={handleSubmit} className="text-center">
                <div className="flex gap-4">
                    <div className="flex flex-col justify-start gap-4 text-left">
                        <Input
                            type="text"
                            label="Title"
                            placeholder="Enter Title"
                            className="border border-black shadow-sm shadow-black duration-200 focus:shadow-md focus:shadow-black"
                            onChange={makeSlug}
                            ref={titleRef}
                        />
                        <Input
                            type="text"
                            label="Slug"
                            placeholder="Slug"
                            className="border border-black shadow-sm shadow-black duration-200 focus:shadow-md focus:shadow-black"
                            readOnly
                            ref={slugRef}
                        />
                        <Input
                            type="file"
                            label="File"
                            placeholder="File"
                            className="w-[13rem] border border-black shadow-sm shadow-black duration-200 focus:shadow-md focus:shadow-black"
                            accept="image/*,.pdf"
                            ref={imageRef}
                        />
                    </div>
                    <div>
                        <div>
                            <label
                                htmlFor="content"
                                className="pr-4 font-semibold"
                            >
                                Description
                            </label>
                        </div>
                        <textarea
                            ref={contentRef}
                            id="content"
                            className="rounded-xl border border-black bg-transparent p-4 shadow-sm shadow-black duration-200 focus:bg-slate-300 focus:shadow-md focus:shadow-black"
                            placeholder="Enter Description"
                            rows="6"
                        ></textarea>
                    </div>
                </div>
                <Button
                    text="Add Post"
                    className="mt-4 shadow-sm shadow-black duration-200 hover:shadow-md hover:shadow-black active:shadow-none"
                    type="submit"
                />
            </form>
        </div>
    )
}

export default AddPost
