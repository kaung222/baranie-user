import { DateTimeSelector } from '@/components/pages/BookingProcess/select-date-time/data-time-select'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <>
            <h1 className="text-2xl font-semibold mb-6">Select Date & Time</h1>
            <DateTimeSelector />
        </>
    )
}

export default Page