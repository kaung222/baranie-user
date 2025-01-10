'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Calendar, Clock, MapPin, Info, ChevronRight, Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetMyAppointments } from '@/api/appointment/get-my-appointments'
import { secondToHour, shortName } from '@/lib/utils'
import { AppointmentForAll } from '@/types/appointment'
import CircleLoading from '@/components/layout/circle-loading'
import AppointmentCard from './appointment-card'

interface Appointment {
    id: string
    serviceName: string
    date: Date
    duration: number
    status: 'confirmed' | 'completed' | 'cancelled' | 'pending'
    price: number
    location: string
    serviceImage: string
    items: Array<{
        name: string
        duration: number
        price: number
    }>
    bookingRef: string
}

export function AppointmentsList() {
    const [selectedAppointment, setSelectedAppointment] = useState<AppointmentForAll | null>(null)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const { data: appointments, isLoading } = useGetMyAppointments()


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-100 text-green-800'
            case 'completed':
                return 'bg-blue-100 text-blue-800'
            case 'cancelled':
                return 'bg-red-100 text-red-800'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const upcomingAppointments = (appointments: AppointmentForAll[]) => {
        return appointments.filter((appointment) => {
            const scheduleTime = new Date(appointment.date).getTime() + (appointment.startTime * 1000)
            const currentTime = Date.now()
            return scheduleTime >= currentTime
        })
    }
    const pastAppointments = (appointments: AppointmentForAll[]) => {
        return appointments.filter((appointment) => {
            const scheduleTime = new Date(appointment.date).getTime() + (appointment.startTime * 1000)
            const currentTime = Date.now()
            return scheduleTime <= currentTime
        })
    }

    return (
        <div className="">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-[#FF66A1]">My Appointments</h1>
                <Button className="bg-[#FF66A1] hover:bg-[#FF66A1]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Book New
                </Button>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-12">
                    <Tabs defaultValue="upcoming" className="w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <TabsList>
                                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                                <TabsTrigger value="past">Past</TabsTrigger>
                            </TabsList>

                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search appointments..."
                                    className="pl-10 w-full sm:w-[300px]"
                                />
                            </div>
                        </div>

                        <TabsContent value="upcoming">
                            <div className="grid gap-4">
                                {isLoading ? (
                                    <CircleLoading />
                                ) : appointments?.records && appointments.records.length > 0 ? (
                                    upcomingAppointments(appointments.records).map((appointment) => (
                                        <AppointmentCard key={appointment.id} appointment={appointment} setIsDetailsOpen={setIsDetailsOpen} setSelectedAppointment={setSelectedAppointment} />
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">No upcoming appointments</h3>
                                        <p className="text-gray-500 mt-1">Your upcoming appointments will appear here when you book.</p>
                                        <Button className="mt-4 bg-[#FF66A1] hover:bg-[#FF66A1]/90">
                                            Book an Appointment
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="past">
                            {/* Similar structure as upcoming, but with past appointments */}
                            <div className="grid gap-4">
                                {isLoading ? (
                                    <CircleLoading />
                                ) : appointments?.records && appointments.records.length > 0 ? (
                                    pastAppointments(appointments.records).map((appointment) => (
                                        <AppointmentCard key={appointment.id} appointment={appointment} setIsDetailsOpen={setIsDetailsOpen} setSelectedAppointment={setSelectedAppointment} />
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Calendar className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium text-gray-900">No past appointments</h3>
                                        <p className="text-gray-500 mt-1">Your  appointments will appear here when you book.</p>
                                        <Button className="mt-4 bg-[#FF66A1] hover:bg-[#FF66A1]/90">
                                            Book an Appointment
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <Sheet open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
                <SheetContent className="sm:max-w-[540px]">
                    {selectedAppointment && (
                        <>
                            <SheetHeader>
                                <SheetTitle>Appointment Details</SheetTitle>
                                <SheetDescription>
                                    Booking Reference: {selectedAppointment.token}
                                </SheetDescription>
                            </SheetHeader>

                            <ScrollArea className="h-[calc(100vh-100px)] pr-4">
                                <div className="space-y-6 mt-6 pb-20 ">
                                    {/* Service Details */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">SERVICE DETAILS</h4>
                                        <div className="flex items-start gap-4">
                                            <Avatar className="h-16 w-16 rounded-lg">
                                                <AvatarImage src={selectedAppointment?.organization?.thumbnail} />
                                                <AvatarFallback>{shortName(selectedAppointment?.organization.name)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h3 className="font-medium">{selectedAppointment.organization.name}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {secondToHour(selectedAppointment.totalTime, 'duration')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Date & Time */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">DATE & TIME</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-[#FF66A1] mr-3" />
                                                <div>
                                                    <p className="font-medium">
                                                        {format(new Date(selectedAppointment.date), 'EEEE, MMMM d, yyyy')}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-5 w-5 text-[#FF66A1] mr-3" />
                                                <div>
                                                    <p className="font-medium">
                                                        {secondToHour(selectedAppointment.startTime)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">LOCATION</h4>
                                        <div className="flex items-start">
                                            <MapPin className="h-5 w-5 text-[#FF66A1] mr-3" />
                                            <p className="font-medium">{selectedAppointment.organization.address}</p>
                                        </div>
                                    </div>

                                    {/* Services Breakdown */}
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-500 mb-3">SERVICES</h4>
                                        <div className="space-y-4">
                                            {selectedAppointment.bookingItems.map((item, index) => (
                                                <div key={index} className="flex justify-between items-start pb-4 border-b last:border-0">
                                                    <div>
                                                        <p className="font-medium">{item.serviceName}</p>
                                                        <p className="text-sm text-gray-500">{secondToHour(item.duration, "duration")}</p>
                                                    </div>
                                                    <div>
                                                        {item.price != item.discountPrice && (
                                                            <p className="font-medium text-sm line-through text-gray-600 ">MMK {item.price.toLocaleString()}</p>
                                                        )}
                                                        <p className="font-medium">MMK {item.discountPrice.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="flex justify-between items-center pt-4">
                                                <p className="font-semibold">Total</p>
                                                <div>
                                                    {selectedAppointment.totalPrice != selectedAppointment.discountPrice && (
                                                        <p className="font-medium text-sm text-gray-600 line-through">MMK {selectedAppointment.totalPrice.toLocaleString()}</p>
                                                    )}
                                                    <p className="font-semibold">MMK {selectedAppointment.discountPrice.toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}

