'use client'
import { useGetDetailOrganizationBySlug } from '@/api/organization/get-detail-organization-bySlug'
import ProfessionalPerService from '@/components/pages/BookingProcess/professional-select/select-professional-per-service'
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const { shopId } = useParams();
    const { data: result } = useGetDetailOrganizationBySlug(String(shopId))
    return (
        <>
            <h1 className="text-2xl font-bold mb-6 mt-6">Select Professional Per Service</h1>
            {result && (
                <ProfessionalPerService services={result.services?.flatMap(c => c.services)} professionals={result.members} />
            )}
        </>
    )
}

export default Page