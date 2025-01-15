import { useEffect, useState } from "react"
import { Header } from "../components"
import { Outlet } from "react-router"
import { useDispatch } from "react-redux"
import { updatePosts } from "../store/postSlice"
import getPostData from "../api/updatePost"

function Layout() {
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const getData = async () => {
        const data = await getPostData()
        if (data) {
            dispatch(updatePosts({ posts: data }))
        }
    }

    useEffect(() => {
        getData()
        setLoading(false)
    }, [])

    return (
        <>
            <div className="box-border min-h-screen bg-gradient-to-tl from-teal-100 via-yellow-100 to-blue-200">
                {!loading ? (
                    <>
                        <div className="box-border flex min-h-screen flex-col">
                            <Header />
                            <div className="flex-center grow">
                                <Outlet />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="grow text-3xl">Loding...</div>
                )}
            </div>
        </>
    )
}

export default Layout
