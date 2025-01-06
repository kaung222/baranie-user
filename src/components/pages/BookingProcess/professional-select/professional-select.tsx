'use client'

import Image from 'next/image'
import { Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import { useGetProfessionalOfServices } from '@/api/professionals/get-professionals-of-services'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useState } from 'react'
import ProfessionalCard from './professional-card'

type BookItem = {
    sv: string;
    pf: string;
}


const preProfessionals = [
    {
        id: 'any',
        firstName: "Any",
        lastName: "professional",
        profilePicture: null,
    },
    {
        id: 'per-service',
        firstName: "Professional",
        lastName: "per service",
        profilePicture: null,
    },

]

export function ProfessionalSelect() {
    const { getQuery, setQuery } = useSetUrlParams()
    const preItems: BookItem[] = JSON.parse(getQuery('items') || '[]');
    const selectedProfessional = getQuery("staff");
    const { data: professionals } = useGetProfessionalOfServices(preItems.flatMap(i => i.sv));


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {preProfessionals?.map((professional) => (
                <Card
                    key={professional.id}
                    className={`cursor-pointer hover:border-primary transition-colors ${professional.id == selectedProfessional && "border-primary bg-brandColorLight/40"} `}
                    onClick={() => setQuery({ key: 'staff', value: professional.id })}
                >
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mb-4 flex items-center justify-center">
                            {professional.profilePicture ? (
                                <Avatar className=' w-full h-full '>
                                    <AvatarImage src={professional.profilePicture} alt={shortName(professional.firstName)} className=' object-cover ' />
                                    <AvatarFallback className=" ">{shortName(professional.firstName)}</AvatarFallback>
                                </Avatar>
                            ) : (
                                <Users className="w-8 h-8 text-muted-foreground" />
                            )}
                        </div>
                        <h3 className="font-medium mb-2">{professional.firstName} {professional.lastName}</h3>
                    </CardContent>
                </Card>
            ))}
            {professionals?.map((professional) => (
                <ProfessionalCard professional={professional} key={professional.id} onClick={() => setQuery({ key: 'staff', value: professional.id })} isSelected={professional.id == selectedProfessional} />
                // <Card
                //     key={professional.id}
                //     className={`cursor-pointer hover:border-primary transition-colors ${professional.id == selectedProfessional && "border-primary bg-brandColorLight/40"} `}
                //     onClick={() => setQuery({ key: 'staff', value: professional.id })}
                // >
                //     <CardContent className="p-6 flex flex-col items-center text-center">
                //         <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mb-4 flex items-center justify-center">
                //             {professional.profilePictureUrl ? (
                //                 <Avatar className=' w-full h-full '>
                //                     <AvatarImage src={professional.profilePictureUrl} alt={shortName(professional.firstName)} className=' object-cover ' />
                //                     <AvatarFallback className=" ">{shortName(professional.firstName)}</AvatarFallback>
                //                 </Avatar>
                //             ) : (
                //                 <Users className="w-8 h-8 text-muted-foreground" />
                //             )}
                //         </div>
                //         <h3 className="font-medium mb-2">{professional.firstName} {professional.lastName}</h3>
                //     </CardContent>
                // </Card>
            ))}
        </div>
    )
}

