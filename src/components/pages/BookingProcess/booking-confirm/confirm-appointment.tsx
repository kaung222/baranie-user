'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Calendar, CheckCircle, Clock, DollarSign, Mail, MapPin, Phone, Store, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn, secondToHour, shortName } from '@/lib/utils'
import { useDebouncedCallback } from 'use-debounce'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User as UserType } from '@/types/user'
import { format } from 'date-fns'

type Props = {
    user: UserType
}

export function ConfirmAppointment({ user }: Props) {
    const [selectedMethod, setSelectedMethod] = useState<string>('cash');
    const { setQuery, getQuery } = useSetUrlParams();
    const preNote = getQuery('note')
    const [note, setNote] = useState<string>(preNote || '');
    const handleChangeNote = useDebouncedCallback((query: string) => {
        setQuery({ key: 'note', value: note })
    }, 500);
    const staff = getQuery('staff');
    const items = getQuery('items');
    const date = getQuery('date')
    const time = getQuery('time');


    return (
        <div className="space-y-6">
            <div className="">
                Appointment Data
            </div>

            <div className=" w-full mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-5">
                    {/* Main Content */}
                    <div className="md:col-span-3 space-y-6">
                        {/* Confirmation Message */}
                        <div className="bg-white rounded-lg p-6 border shadow-sm">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-[#FF66A1]/10 flex items-center justify-center">
                                    <CheckCircle className="w-6 h-6 text-[#FF66A1]" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">Almost there!</h2>
                                    <p className="text-gray-600">Please review your appointment details</p>
                                </div>
                            </div>
                        </div>

                        {/* Client Details */}
                        <div className="bg-white rounded-lg p-6 border shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-4">CLIENT INFORMATION</h3>
                            <div className="flex items-start gap-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={user.profilePicture} alt={shortName(user.firstName)} />
                                    <AvatarFallback>{shortName(user.firstName)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <p className="font-medium text-lg">{`${user.firstName} ${user.lastName}`}</p>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <User className="w-4 h-4 mr-2" />
                                        {user?.gender || 'none'}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Phone className="w-4 h-4 mr-2" />
                                        {user.phone || '--'}
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Mail className="w-4 h-4 mr-2" />
                                        {user.email}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="bg-white rounded-lg p-6 border shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500 mb-4">APPOINTMENT DETAILS</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <Calendar className="w-5 h-5 text-[#FF66A1] mr-3" />
                                    <div>
                                        <p className="font-medium">Date</p>
                                        <p className="text-gray-600">{format(new Date(date), 'EEEE, MMMM d, yyyy')}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <Clock className="w-5 h-5 text-[#FF66A1] mr-3" />
                                    <div>
                                        <p className="font-medium">Time</p>
                                        <p className="text-gray-600">{secondToHour(Number(time))}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="w-5 h-5 text-[#FF66A1] mr-3" />
                                    <div>
                                        <p className="font-medium">Location</p>
                                        <p className="text-gray-600">32 Paya Road, Bahan Township, Yangon</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            <div className="space-y-2">
                <Label htmlFor="booking-note">Booking note</Label>
                <Textarea
                    id="booking-note"
                    value={note}
                    onChange={(e) => {
                        setNote(e.target.value)
                        handleChangeNote(e.target.value)
                    }}
                    placeholder="Can't wait for the appointment"
                    className="min-h-[100px]"
                />
            </div>
        </div>
    )
}

