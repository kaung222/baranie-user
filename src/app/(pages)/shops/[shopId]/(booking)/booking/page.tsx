import BookingPage from '@/components/pages/BookingProcess/BookingPage'
import { ServiceCategories } from '@/components/pages/BookingProcess/services-select/service-categories'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <>
            <div className=" text-2xl font-bold mt-6 ">Select Services</div>
            <ServiceCategories />
        </>
    )
}

export default Page