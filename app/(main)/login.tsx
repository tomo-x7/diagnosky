"use client"

export function Logincomp() {
    return (<>
        <div id="background" className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-black opacity-50 text-white text-center">background</div>
        <div className="relative bg-white z-50">
            <h2>Login with Bluesky account</h2>
            <input type="text" />
            <input type="password" />
        </div>
    </>)
}