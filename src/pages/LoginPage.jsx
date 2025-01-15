import React, { useEffect, useRef } from "react"
import { Input, Button } from "../components"
import { useDispatch } from "react-redux"
import { loginUser } from "../store/accountSlice"
import { useNavigate } from "react-router"
import userAccount from "../appwrite/account"

function LoginPage() {
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        userAccount
            .login({
                email: inputRef1.current.value,
                password: inputRef2.current.value,
            })
            .then((loggedIn) => {
                if (loggedIn) {
                    userAccount.getCurrentUser().then((userData) => {
                        if (useDispatch) {
                            dispatch(loginUser(userData))
                            navigate("/")
                        }
                    })
                }
            })
    }

    return (
        <div className="flex flex-col items-center justify-evenly gap-4 rounded-xl border-2 border-slate-400 bg-white p-4">
            <h2 className="text-xl font-bold">Login to Blogger</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-start gap-4">
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter Your Email"
                        ref={inputRef1}
                    />
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter Your Password"
                        ref={inputRef2}
                    />
                    <Button text="Submit" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default LoginPage
