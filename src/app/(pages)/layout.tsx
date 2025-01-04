'use client'
import AppGuard from '@/components/providers/app-guard'
import React, { useState } from 'react'

type Props = {
    children: React.ReactNode
}


const Layout = ({ children }: Props) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };

    return (
        <>
            {children}
        </>
    )
}


export default Layout