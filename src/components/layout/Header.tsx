'use client'
import React, { useEffect, useState } from 'react'
import LogoWithBrand from '../common/LogoWithBrand'
import { useGetProfile } from '@/api/user/get-profile'
import { useLocalstorage } from '@/lib/helpers'
import { Skeleton } from '../ui/skeleton'
import ProfileDropdown from './ProfileDropdown'
import LoginLayout from './LoginLayout'
import { Button } from '../ui/button'

type Props = {}

const Header = (props: Props) => {
    const { getData } = useLocalstorage();
    const accessToken = getData('accessToken');

    return (
        <>
            <nav className=" h-[60px] sticky top-0 left-0 z-20 border-b bg-white flex justify-between items-center px-3 md:px-10 py-6">
                <LogoWithBrand />
                <div className=' flex gap-2 items-center '>
                    <Button variant={'outline'} onClick={() => window.open('https://management.baranie.com/', "_blank")} className=' rounded-[20px] '>
                        For Partner
                    </Button>
                    {
                        accessToken ? (
                            <ProfileDropdown />
                        ) : (
                            <LoginLayout />
                        )
                    }
                </div>
            </nav>
        </>
    )
}

export default Header