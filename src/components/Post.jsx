import React, { useEffect, useState } from "react"
import database from "../appwrite/database"

function Post({ title, featuredImage, content = "", size = " size-80" }) {
    const [image, setImage] = useState(null)

    useEffect(() => {
        setImage(database.getPreview(featuredImage))
    }, [])

    return (
        <div
            className={` ${size} overflow-hidden rounded-3xl border-2 border-black/50 bg-white duration-200 hover:border-orange-400`}
        >
            <div className="h-3/4 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full object-cover object-top"
                />
            </div>
            <div className="p-4">
                <p className="text-lg font-bold">{title}</p>
                {content && <p>{content}</p>}
            </div>
        </div>
    )
}

export default Post
