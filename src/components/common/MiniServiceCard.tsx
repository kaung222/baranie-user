'use client'
import ConfirmDialog from '@/components/common/confirm-dialog'
import ControllableDropdown from '@/components/common/control-dropdown'
import AppDropdown from '@/components/common/DropDown'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { secondToHour, shortName } from '@/lib/utils'
import { Service } from '@/types/service'
import { AlertCircle, CameraIcon, Info, MoreVertical, Pencil, Percent, Trash, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

type Props = {
    service: Service;
    color?: string;
    notProvided?: boolean;
    memberComponent?: React.ReactNode;
    currency?: string;
}

const MiniServiceCard = ({ service, color, notProvided = false, memberComponent, currency = "MMK" }: Props) => {
    const { getQuery, setQuery } = useSetUrlParams();
    const [open, setOpen] = useState(false);



    const openDetail = (id: string) => {
        setQuery({ key: "service-detail", value: id });
        setOpen(false)
    }
    return (
        <>
            <div style={{ borderColor: `${color}`, background: `${color}08` }} className=" w-full flex flex-col  rounded-lg border transition-colors  ">
                <div className=' w-full flex items-start p-1 '>
                    <div className=' size-[60px] flex-shrink-0 '>
                        {service.thumbnailUrl ? (
                            <Avatar className=' w-full h-full rounded-sm '>
                                <AvatarImage src={service.thumbnailUrl} alt={shortName(service.name)} className=' object-cover ' />
                                <AvatarFallback className=" rounded-sm">{shortName(service.name)}</AvatarFallback>
                            </Avatar>

                        ) : (
                            <div className=' w-full flex justify-center items-center rounded-lg h-full bg-brandColorLight/40'>
                                <div>
                                    <CameraIcon className=' w-6 h-6 ' />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className=" w-full flex-grow flex justify-between items-center py-4 px-6 ps-2 ">
                        <div className="flex-grow">
                            <h3 className="font-semibold text-lg tracking-tight ">{service.name} {service.type == "Package" && <Badge className=" bg-pink-200 text-pink-700 hover:bg-pink-100 ">package</Badge>}</h3>
                            <p className="text-sm text-gray-500">
                                {secondToHour(service.duration, 'duration')} {service.type == "Package" && <span className=' text-xs'>{`${service.serviceCount} services`}</span>}
                            </p>
                            {memberComponent}
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                {service.discount > 0 ? (
                                    <>
                                        <div className="flex items-center space-x-2">
                                            <span className="text-sm text-gray-700 font-medium line-through">
                                                {service.price} {currency}
                                            </span>
                                            <Badge variant="secondary" className="text-green-600 bg-green-100">
                                                {service.discountType === 'percent'
                                                    ? `${service.discount}% off`
                                                    : `${service.discount} ${currency} off`}
                                            </Badge>
                                        </div>
                                        <span className="font-semibold  text-green-600">
                                            {service.discountPrice.toFixed(0)} {currency}
                                        </span>
                                    </>
                                ) : (
                                    <span className="font-semibold ">
                                        {service.price} <span className="text-sm">{currency}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" w-full flex gap-2 px-4 ">
                    {notProvided && (
                        <div className="mt-2 flex items-center text-sm text-amber-600 bg-amber-50 p-2 rounded">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            Service is not served by this member!
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MiniServiceCard