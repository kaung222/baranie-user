'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { ChevronDown, LocateIcon, LogOut, Mail, Settings, Star, User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Link from 'next/link'
import { useLocalstorage } from '@/lib/helpers'
import { useRouter } from 'next/navigation'
import ConfirmDialog from '../common/confirm-dialog'
import { User as UserType } from '@/types/user'
import { shortName } from '@/lib/utils'
import { googleLogout } from '@react-oauth/google'
import { useGetProfile } from '@/api/user/get-profile'
import { Skeleton } from '../ui/skeleton'
import { useLogout } from '@/api/auth/logout'

type Props = {

}

const ProfileDropdown = ({ }: Props) => {
    const { data: user, isLoading: loadingProfile } = useGetProfile()
    const { mutate: logout } = useLogout()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const router = useRouter();
    const { deleteData } = useLocalstorage();
    const logoutHandler = () => {
        localStorage.clear();
        logout()
        router.push('/login')
    }
    return (
        <>
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

                <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                    <DropdownMenuTrigger>
                        <div className=' h-12 p-1 flex rounded-[24px] items-center gap-2 border '>
                            <Avatar className=' w-10 h-10 '>
                                <AvatarImage src={user?.profilePicture || undefined} alt={shortName(user?.firstName || "un")} className=' object-cover ' />
                                <AvatarFallback className=" ">{shortName(user?.firstName || 'un')}</AvatarFallback>
                            </Avatar>
                            <h2 className=' font-medium text-sm '>{user?.firstName}</h2>
                            <ChevronDown className=' w-4 h-4 ' />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='bottom' align="end" className="w-56 relative z-[70]  ">
                        <div className=' w-[300px] flex flex-col gap-1 '>
                            <Link href={'/profile'} className=' w-full flex justify-start items-center gap-2 px-4 py-2 hover:bg-gray-100 h-10 rounded-lg '>
                                <User className=' h-5 w-5 ' />
                                <span className=' font-semibold text-sm '>Profile</span>
                            </Link>
                            <hr />
                            <ConfirmDialog title='Are you sure to logout?' description='You will need email and password to login again.' onConfirm={() => logoutHandler()} button='Log Out'>
                                <Button variant={'ghost'} className=' w-full flex justify-start gap-2 '>
                                    <LogOut className=' h-5 w-5 ' />
                                    <span className=' font-semibold text-sm text-delete '>LogOut</span>
                                </Button>
                            </ConfirmDialog>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )
}

export default ProfileDropdown