import BookingPage from '@/components/pages/BookingProcess/BookingPage'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <>
            <BookingPage>
                {children}
            </BookingPage>
        </>
    )
}

export default Layout