import React from "react"
import { Post, DeletePostBtn } from "../components"
import { useParams } from "react-router"
import { useSelector } from "react-redux"

function PostPage() {
    const { postID, slug } = useParams()
    const userData = useSelector((state) => state.auth.userData)
    const posts = useSelector((state) => state.posts.posts)

    const post = posts.find((post) => post.$id === postID)

    return (
        <>
            {post ? (
                <div className="text-center">
                    <Post
                        size=" size-[50rem] m-4"
                        title={post?.title}
                        content={post?.content}
                        featuredImage={post?.featuredImage}
                    />
                    {userData?.$id === post.userID && (
                        <DeletePostBtn
                            postId={post.$id}
                            imageId={post.featuredImage}
                        />
                    )}
                </div>
            ) : (
                <div className="text-3xl">Loading..</div>
            )}
        </>
    )
}

export default PostPage
