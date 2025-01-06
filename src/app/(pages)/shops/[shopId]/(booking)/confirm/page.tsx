'use client'
import { useGetProfile } from '@/api/user/get-profile'
import { ConfirmAppointment } from '@/components/pages/BookingProcess/booking-confirm/confirm-appointment'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    const { data: profile } = useGetProfile()

    return (
        <>
            <h1 className="text-2xl font-semibold mb-6">Appointment Confirmation</h1>
            {profile && (
                <ConfirmAppointment user={profile} />
            )}
        </>
    )
}

export default Page