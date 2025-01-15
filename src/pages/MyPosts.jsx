import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Post } from "../components"
import { Link } from "react-router"

function MyPosts() {
    const [message, setMessage] = useState("No Posts Yet")

    const posts = useSelector((state) => state.posts.posts)
    const userData = useSelector((state) => state.auth.userData)

    const myPosts = posts.filter((post) => post.userID === userData?.$id)

    return (
        <>
            {myPosts?.length !== 0 ? (
                <div className="flex flex-wrap justify-evenly gap-4 self-start p-4">
                    {myPosts.map((post) => (
                        <div key={post.$id}>
                            <Link to={`/post/${post.$id}/${post.slug}`}>
                                <Post
                                    title={post.title}
                                    featuredImage={post.featuredImage}
                                    content={post.content}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-3xl">{message}</div>
            )}
        </>
    )
}

export default MyPosts
