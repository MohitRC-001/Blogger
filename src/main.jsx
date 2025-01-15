import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import { createBrowserRouter, RouterProvider } from "react-router"
import {
    AddPost,
    Home,
    Layout,
    LoginPage,
    PostPage,
    MyPosts,
    SignupPage,
} from "./pages"
import { Provider } from "react-redux"
import store from "./store/store.js"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/signup",
                element: <SignupPage />,
            },
            {
                path: "/my-posts",
                element: <MyPosts />,
            },
            {
                path: "/add-post",
                element: <AddPost />,
            },
            {
                path: "/post/:postID/:slug",
                element: <PostPage />,
            },
        ],
    },
])

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
)
