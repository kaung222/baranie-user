'use client'
import ControllableDialog from '@/components/common/control-dialog'
import ImageDialog from '@/components/common/ImageDialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import { Organization } from '@/types/organization'
import Image from 'next/image'
import { useState } from 'react'
type Props = {
    organization: Organization
}

export function Gallery({ organization }: Props) {
    const [showImages, setShowImages] = useState(false);
    return (
        <>
            <ImageDialog open={showImages} setOpen={setShowImages} title='Gallery' trigger={(
                <div className=" flex w-full gap-2 h-[400px]">
                    <div className="col-span-5 relative w-[45%] h-full " >
                        <Avatar className=' rounded-sm w-full h-full '>
                            <AvatarImage src={organization.images ? organization.images[0] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                            <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                        </Avatar>


                    </div>
                    <div className=" w-[55%] flex flex-col gap-2 h-full">
                        <div className=" h-1/2 gap-2 w-full flex">
                            <div className="relative h-full w-1/2">
                                <Avatar className=' rounded-sm w-full h-full '>
                                    <AvatarImage src={organization.images ? organization.images[1] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                                    <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="relative h-full w-1/2">
                                <Avatar className=' rounded-sm w-full h-full '>
                                    <AvatarImage src={organization.images ? organization.images[2] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                                    <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>

                        <div className=" h-1/2 gap-2 w-full flex">
                            <div className="relative h-full w-1/2">
                                <Avatar className=' rounded-sm w-full h-full '>
                                    <AvatarImage src={organization.images ? organization.images[3] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                                    <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                                </Avatar>

                            </div>
                            <div className="relative h-full w-1/2">
                                <Avatar className=' rounded-sm w-full h-full '>
                                    <AvatarImage src={organization.images ? organization.images[4] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                                    <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </div>
            )} images={organization.images || []} />
        </>
    )
}

