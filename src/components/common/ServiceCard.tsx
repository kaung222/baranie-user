'use client'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { secondToHour, shortName } from '@/lib/utils'
import { AlertCircle, BookMarked, CameraIcon, Info, MoreVertical, Pencil, Percent, Plus, Trash, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React, { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Service } from '@/types/service'
import AppDialog from './dialog'
import { QuickLogin } from '../pages/shop-detail/quick-login'
import { useLocalstorage } from '@/lib/helpers'

type BookItem = {
    sv: string;
    pf: string;
}

type Props = {
    service: Service;
    editable?: boolean;
    color?: string;
    notProvided?: boolean;
    memberComponent?: React.ReactNode;
    currency?: string;
    orgId?: string;
    booking?: boolean;
    preItems: BookItem[]
}



const ServiceCard = ({ service, preItems, booking = false, orgId, editable = false, color, notProvided = false, memberComponent, currency = "MMK" }: Props) => {
    const { setQuery } = useSetUrlParams();
    const { getData } = useLocalstorage()
    const accessToken = getData('accessToken')
    const [open, setOpen] = useState(false);


    const openDetail = (id: string) => {
        setQuery({ key: "service-detail", value: id });
        setOpen(false)
    }

    const addItemsToBook = (serviceId: string) => {

        const item: BookItem = {
            sv: serviceId,
            pf: 'un'
        }
        const newItems = [...preItems, item];

        setQuery({ key: 'items', value: JSON.stringify(newItems) })
    }

    const removeItemsToBook = (serviceId: string) => {

        const newItems = preItems.filter(item => item.sv != serviceId);

        setQuery({ key: 'items', value: JSON.stringify(newItems) })
    }

    const isServiceSelected = (serviceId: string) => {
        return preItems.map(item => item.sv).includes(serviceId)
    }
    return (
        <>
            <div style={{ borderColor: `${color}`, background: `${color}08` }} className=" w-full flex flex-col  rounded-lg border transition-colors  ">
                <div className=' w-full flex items-center p-1 '>
                    <div className=' size-[96px] '>
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
                            <div className="">
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
                        <div className="flex items-center space-x-4">
                            {orgId && (
                                <>
                                    {accessToken ? (
                                        <Link href={`/shops/${orgId}/booking`} className=' px-4 py-2 rounded-lg bg-black text-white hover:bg-black/90 '>Book now</Link>

                                    ) : (
                                        <AppDialog title='Need to Login!' trigger={(
                                            <span className=' w-full px-4 py-2 rounded-lg bg-brandColor hover:bg-brandColor/90 text-white block '>Book now</span>
                                        )}>
                                            <div className="p-3 ">
                                                <QuickLogin />
                                            </div>
                                        </AppDialog>
                                    )}
                                </>
                            )}
                            {booking && (
                                isServiceSelected(service.id) ? (
                                    <Button variant={'outline'} onClick={() => removeItemsToBook(service.id)}>
                                        <BookMarked className=' text-green-500 ' />
                                    </Button>
                                ) : (
                                    <Button variant={'outline'} onClick={() => addItemsToBook(service.id)} >
                                        <Plus />
                                    </Button>
                                )
                            )}
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

export default ServiceCard