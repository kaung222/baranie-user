'use client'
import { useGetOrganizationMembers } from '@/api/organization/get-org-members'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const team = [
    { name: 'Sara', role: 'Stylist', image: '/team-1.jpg' },
    { name: 'Sam', role: 'Colorist', image: '/team-2.jpg' },
    { name: 'Jean', role: 'Stylist', image: '/team-3.jpg' },
    { name: 'Kenneth', role: 'Manager', image: '/team-4.jpg' },
    { name: 'Chris', role: 'Stylist', image: '/team-5.jpg' },
]

export function TeamSection() {
    const { shopId } = useParams()
    const { data: members } = useGetOrganizationMembers(String(shopId))
    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Team</h2>
            <div className="flex gap-16 overflow-x-auto pb-4">
                {members?.map((member) => (
                    <div key={member.id} className="flex flex-col items-center">
                        <div className="w-[100px] h-[100px] relative mb-2">
                            <Avatar className=' w-full h-full '>
                                <AvatarImage src={member.profilePictureUrl} alt={shortName(member.firstName)} className=' object-cover ' />
                                <AvatarFallback className=" ">{shortName(member.firstName)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <span className="text-sm font-medium">{member.firstName}</span>
                        <span className="text-xs text-muted-foreground">{member.role}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

