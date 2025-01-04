'use client'
import React, { useEffect, useState } from 'react'
import LogoWithBrand from '../common/LogoWithBrand'
import { useGetProfile } from '@/api/user/get-profile'
import { useLocalstorage } from '@/lib/helpers'
import { Skeleton } from '../ui/skeleton'
import ProfileDropdown from './ProfileDropdown'
import LoginLayout from './LoginLayout'

type Props = {}

const Header = (props: Props) => {
    const { getData } = useLocalstorage()
    const accessToken = getData('accessToken');

    return (
        <>
            <nav className=" h-[60px] sticky top-0 left-0 z-20 border-b bg-white flex justify-between items-center px-3 md:px-10 py-6">
                <LogoWithBrand />
                {
                    accessToken ? (
                        <ProfileDropdown />
                    ) : (
                        <LoginLayout />
                    )
                }
            </nav>
        </>
    )
}

export default Header