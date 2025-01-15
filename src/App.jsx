import { useEffect, useState } from "react"

function App() {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(false)
    }, [])

    return (
        <>
            <div className="flex-center min-h-screen w-screen bg-slate-400">
                {!loading ? (
                    <div>YOOO</div>
                ) : (
                    <div className="text-3xl">Loding...</div>
                )}
            </div>
        </>
    )
}

export default App
