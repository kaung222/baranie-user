'use client'
import Link from 'next/link'
import React from 'react'

type Props = {}

const LoginLayout = (props: Props) => {
    return (
        <Link href={'/login'} className=" px-4 py-2 border rounded-lg hover:bg-brandColorLight/40 ">Login</Link>
    )
}

export default LoginLayout