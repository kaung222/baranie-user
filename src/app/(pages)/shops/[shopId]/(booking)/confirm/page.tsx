import { PaymentSelect } from '@/components/pages/BookingProcess/payment-method/payment-select'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <>
            <h1 className="text-2xl font-semibold mb-6">Select payment and confirm</h1>
            <PaymentSelect />
        </>
    )
}

export default Page