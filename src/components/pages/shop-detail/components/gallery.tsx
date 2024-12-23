'use client'
import ControllableDialog from '@/components/common/control-dialog'
import ImageDialog from '@/components/common/ImageDialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { shortName } from '@/lib/utils'
import { Organization } from '@/types/organization'
import { Camera } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
type Props = {
    organization: Organization
}

export function Gallery({ organization }: Props) {
    const [showImages, setShowImages] = useState(false);
    return (
        <>
            <div className=" flex w-full gap-4 h-[400px] relative">
                <ImageDialog open={showImages} setOpen={setShowImages} title='Gallery' trigger={(
                    <Button className=' absolute right-2 bottom-2 bg-white text-black z-10 hover:bg-gray-100 '>
                        See all Images
                    </Button>
                )} images={organization.images || []} />
                <div className="col-span-5 relative w-full sm:w-[60%] lg:w-[40%] h-full " >
                    <Avatar className=' rounded-sm w-full h-full '>
                        <AvatarImage src={organization.images ? organization.images[0] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                        <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                    </Avatar>


                </div>
                <div className=" hidden sm:flex w-[40%] lg:w-[60%] flex-row gap-4 h-full">
                    <div className=" w-full lg:w-1/2 gap-2 h-full flex flex-col">
                        <div className="relative w-full h-1/2">
                            <Avatar className=' rounded-sm w-full h-full '>
                                <AvatarImage src={organization.images ? organization.images[1] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                                <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="relative w-full h-1/2">
                            <Avatar className=' rounded-sm w-full h-full '>
                                <AvatarImage src={organization.images ? organization.images[2] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                                <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>

                    <div className=" hidden lg:flex w-1/2 gap-2 h-full flex-col">
                        <div className="relative w-full h-1/2">
                            {organization.images && organization.images.length > 3 ? (
                                <Avatar className=' rounded-sm w-full h-full '>
                                    <AvatarImage src={organization.images ? organization.images[3] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                                    <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className=" w-full h-full bg-gray-100 flex justify-center items-center flex-col">
                                    <Camera className=' w-6 h-6 ' />
                                    <p>no more image!</p>
                                </div>
                            )}
                        </div>
                        <div className="relative w-full h-1/2">
                            {organization.images && organization?.images?.length > 4 ? (
                                <Avatar className=' rounded-sm w-full h-full '>
                                    <AvatarImage src={organization.images ? organization.images[4] : undefined} alt={shortName(organization.name)} className=' object-cover ' />
                                    <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                                </Avatar>
                            ) : (
                                <div className=" w-full h-full bg-gray-100 flex justify-center items-center flex-col">
                                    <Camera className=' w-6 h-6 ' />
                                    <p>no more image!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

