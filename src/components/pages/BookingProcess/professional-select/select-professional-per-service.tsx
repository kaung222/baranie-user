'use client'
import MiniServiceCard from '@/components/common/MiniServiceCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useSetUrlParams from '@/lib/hooks/urlSearchParam';
import { shortName } from '@/lib/utils';
import { MemberForAll } from '@/types/member';
import { Service } from '@/types/service';
import { ChevronDown } from 'lucide-react';
import React from 'react'
import ProfessionalChooseDialog from './professional-choose-dialog';

type Props = {
    services: Service[]
    professionals: MemberForAll[]
}

type ShowCageItem = {
    service: Service | undefined;
    professional: MemberForAll | undefined;
}
type BookItem = {
    sv: string;
    pf: string;
}


const ProfessionalPerService = ({ services, professionals }: Props) => {
    const { getQuery } = useSetUrlParams()
    const staff = getQuery('staff');
    const items = getQuery('items');

    const preItems: BookItem[] = JSON.parse(items || '[]');

    const showCageBookingItems: ShowCageItem[] = preItems.map((item) => ({ service: services.find(s => s.id == item.sv), professional: professionals.find(p => p.id == item.pf) }))

    return (
        <div className=' flex flex-col gap-2 '>
            {showCageBookingItems.map((item, index) => item.service && (
                <MiniServiceCard key={index} service={item.service} memberComponent={(
                    <ProfessionalChooseDialog trackIndex={index} preProfessionalId={item.professional?.id || 'any'}>
                        <div>{item.professional ? (
                            <div className=" px-1 py-1 w-[180px] cursor-pointer flex-shrink-0 flex-nowrap border rounded-[18px] h-9 ">
                                <div className="w-full flex items-center gap-2 justify-start h-7">
                                    <Avatar className="h-7 w-7 ">
                                        <AvatarImage src={item.professional?.profilePictureUrl} alt={shortName(item.professional?.firstName)} className=' object-cover ' />
                                        <AvatarFallback>{shortName(item.professional?.firstName)}</AvatarFallback>
                                    </Avatar>
                                    <span className=' font-medium text-sm '>{item.professional?.firstName}</span>
                                    <ChevronDown className=' h-3 w-3 ' />
                                </div>
                            </div>
                        ) : (
                            <div className=' px-4 py-1 w-[180px] cursor-pointer border rounded-[18px] h-9 ' >with any</div>
                        )}</div>
                    </ProfessionalChooseDialog>
                )} />
            ))}
        </div>
    )
}

export default ProfessionalPerService