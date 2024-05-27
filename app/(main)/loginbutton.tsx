"use client"
import { Logincomp } from "./login"
import { useState } from 'react'

export function LoginButton() {
    const [Login,setLogin]=useState(<></>)
    return (
        <>
            <button onClick={setLogin(<Logincomp />)}>login</button>
            {Login}
        </>
    )
}