import React from "react"
import { useDispatch } from "react-redux"
import { logoutUser } from "../store/accountSlice"
import userAccount from "../appwrite/account"
import { useNavigate } from "react-router"

function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        userAccount.logout().then((response) => {
            if (response) {
                dispatch(logoutUser())
                navigate("/")
            }
        })
    }

    return (
        <button
            onClick={handleLogout}
            className={`rounded-xl border-2 border-transparent bg-red-600 px-4 py-2 font-semibold text-white shadow-sm shadow-black hover:border-orange-400 hover:shadow-md hover:shadow-black active:shadow-none`}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
