import { AppointmentsList } from '@/components/pages/profile/appointment/Appointment-list'
import ProfileBreadcrumb from '@/components/pages/profile/bread-crumb'
import React from 'react'

type Props = {}

const Page = (props: Props) => {
    return (
        <>
            <div className=" px-3 md:px-10 space-y-5 ">
                <ProfileBreadcrumb section='Appointment' />
                {/* <div className="space-y-1 mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight">Appointment</h1>
                </div>
                <AppointmentList /> */}
                <AppointmentsList />
            </div>
        </>
    )
}

export default Page