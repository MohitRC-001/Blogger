import React, { useRef } from "react"
import { Input, Button } from "../components"
import { useDispatch } from "react-redux"
import { loginUser } from "../store/accountSlice"
import userAccount from "../appwrite/account"
import { useNavigate } from "react-router"

function SignupPage() {
    const inputRef1 = useRef(null)
    const inputRef2 = useRef(null)
    const inputRef3 = useRef(null)
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()

        userAccount
            .createAccount({
                email: inputRef2.current.value,
                password: inputRef3.current.value,
                name: inputRef1.current.value,
            })
            .then((userData) => {
                if (userData) {
                    dispatch(loginUser(userData))
                    navigate("/")
                }
            })
    }

    return (
        <div className="flex flex-col items-center justify-evenly gap-4 rounded-xl border-2 border-slate-400 bg-white p-4">
            <h2 className="text-xl font-bold">SignUp to Blogger</h2>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-start gap-4">
                    <Input
                        type="text"
                        label="Name"
                        placeholder="Enter Your Name"
                        ref={inputRef1}
                    />
                    <Input
                        type="email"
                        label="Email"
                        placeholder="Enter Your Email"
                        ref={inputRef2}
                    />
                    <Input
                        type="password"
                        label="Password"
                        placeholder="Enter Your Password"
                        ref={inputRef3}
                    />
                    <Button text="Submit" type="submit" />
                </div>
            </form>
        </div>
    )
}

export default SignupPage
