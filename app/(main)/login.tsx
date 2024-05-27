"use client"

export function Login() {
    return (<>
        <div id="background" className="fixed top-0 right-0 bottom-0 left-0 z-[100] bg-black bg-opacity-60" />
        <div>
            <h2>Login with Bluesky account</h2>
            <input type="text" />
            <input type="password" />
        </div>
    </>)
}