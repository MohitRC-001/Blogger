import React, { useState, useEffect } from "react"
import { Post } from "../components"
import { Link } from "react-router"
import { useSelector } from "react-redux"

function Home() {
    const [message, setMessage] = useState("Loading...")

    const posts = useSelector((state) => state.posts.posts)

    return (
        <>
            {posts?.length !== 0 ? (
                <div className="flex flex-wrap justify-evenly gap-4 self-start p-4">
                    {posts.map((post) => (
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

export default Home
