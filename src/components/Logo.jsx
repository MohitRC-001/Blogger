import React from "react"
import { Link } from "react-router"

function Logo() {
    return (
        <Link to={`/`}>
            <div className="text-6xl font-semibold italic text-yellow-300 drop-shadow-[3px_3px_5px_rgba(55,55,0,1)]">
                BLOGGER
            </div>
        </Link>
    )
}

export default Logo
