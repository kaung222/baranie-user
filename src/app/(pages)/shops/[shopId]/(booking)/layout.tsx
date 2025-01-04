import BookingPage from '@/components/pages/BookingProcess/BookingPage'
import AppGuard from '@/components/providers/app-guard'
import React from 'react'

type Props = {
    children: React.ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <AppGuard>
            <BookingPage>
                {children}
            </BookingPage>
        </AppGuard>
    )
}

export default Layout