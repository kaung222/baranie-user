'use client'
import React from 'react'
import LogoWithBrand from '../common/LogoWithBrand'
import { useGetProfile } from '@/api/user/get-profile'
import { useLocalstorage } from '@/lib/helpers'
import { Skeleton } from '../ui/skeleton'
import ProfileDropdown from './ProfileDropdown'
import LoginLayout from './LoginLayout'

type Props = {}

const Header = (props: Props) => {
    const { data: profile, isLoading: loadingProfile } = useGetProfile()
    const { getData } = useLocalstorage()
    const accessToken = getData('accessToken');
    return (
        <>
            <nav className=" h-[60px] sticky top-0 left-0 z-20 border-b bg-white flex justify-between items-center px-3 md:px-10 py-6">
                <LogoWithBrand />
                {loadingProfile ? (
                    <div className="h-12 p-1 flex rounded-[24px] items-center gap-2 border">
                        {/* Avatar Skeleton */}
                        <Skeleton className="w-10 h-10 rounded-full" />

                        {/* User Name Skeleton */}
                        <Skeleton className="h-4 w-20 rounded-md" />

                        {/* Chevron Skeleton */}
                        <Skeleton className="w-4 h-4 rounded-md" />
                    </div>
                ) : (
                    profile && accessToken ? (
                        <ProfileDropdown user={profile} />
                    ) : (
                        <LoginLayout />
                    )
                )}
            </nav>
        </>
    )
}

export default Header