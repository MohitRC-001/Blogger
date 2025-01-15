import React, { useState, useEffect } from "react"
import { Button, Logo, LogoutBtn } from "./index"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, NavLink } from "react-router"
import { loginUser } from "../store/accountSlice"
import userAccount from "../appwrite/account"

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isUserLoggedIn = useSelector((state) => state.auth.status)

    useEffect(() => {
        userAccount.getCurrentUser().then((userData) => {
            if (userData) {
                dispatch(loginUser(userData))
                navigate("/")
            }
        })
    }, [])

    const navItems = [
        {
            title: "Home",
            slug: "/",
            active: true,
        },
        {
            title: "My Posts",
            slug: "/my-posts",
            active: isUserLoggedIn,
        },
        {
            title: "Add Post",
            slug: "/add-post",
            active: isUserLoggedIn,
        },
        {
            title: "Log In",
            slug: "/login",
            active: !isUserLoggedIn,
        },
        {
            title: "Sign Up",
            slug: "/signup",
            active: !isUserLoggedIn,
        },
    ]

    return (
        <>
            <div className="sticky top-0 box-border flex min-h-28 items-center justify-between gap-4 border-b-2 border-gray-500 bg-slate-500 bg-opacity-40 p-4 backdrop-blur-sm">
                <div>
                    <Logo />
                </div>
                <div className="flex gap-4">
                    {navItems.map((item) =>
                        item.active ? (
                            <div key={item.title}>
                                <NavLink to={item.slug}>
                                    <Button
                                        text={item.title}
                                        slug={item.slug}
                                        className={`${window.location.pathname === item.slug ? "border-orange-400 shadow-md" : ""}`}
                                    />
                                </NavLink>
                            </div>
                        ) : null,
                    )}
                    {isUserLoggedIn ? (
                        <div>
                            <LogoutBtn />
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    )
}

export default Header
