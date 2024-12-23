import { ProfessionalSelect } from '@/components/pages/BookingProcess/professional-select/professional-select'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-6 mt-6">Select Professional</h1>
            <ProfessionalSelect />
        </>
    )
}

export default Page