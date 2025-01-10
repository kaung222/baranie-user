import { Dispatch, SetStateAction, useState } from 'react'
import { format } from 'date-fns'
import { Calendar, Clock, MapPin, Info, ChevronRight, Search, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { secondToHour, shortName } from '@/lib/utils'
import { AppointmentForAll } from '@/types/appointment'

type Props = {
    appointment: AppointmentForAll;
    setSelectedAppointment: Dispatch<SetStateAction<AppointmentForAll | null>>;
    setIsDetailsOpen: Dispatch<SetStateAction<boolean>>

}

const AppointmentCard = ({ appointment, setSelectedAppointment, setIsDetailsOpen }: Props) => {
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
    return (
        <>
            <div
                className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow"
            >
                <div className="flex items-start gap-4">
                    <Avatar className="h-20 w-20 rounded-lg">
                        <AvatarImage src={appointment.organization.thumbnail} />
                        <AvatarFallback>SP</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                        <div className="flex items-start justify-between">
                            <div>
                                <div className=" flex gap-2 ">
                                    <h3 className="font-semibold text-lg">{appointment.organization.name}</h3>
                                    <Badge variant="outline">#{appointment.token}</Badge>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                    <Calendar className="h-4 w-4" />
                                    {format(appointment.date, 'EEE, MMM d, yyyy')}
                                    <Clock className="h-4 w-4 ml-2" />
                                    {secondToHour(appointment.startTime)}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                                    <MapPin className="h-4 w-4" />
                                    {appointment.organization.address}
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <Badge className={getStatusColor(appointment.status)}>
                                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                </Badge>
                                <span className="font-semibold">
                                    MMK {appointment.discountPrice.toLocaleString()}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedAppointment(appointment)
                                        setIsDetailsOpen(true)
                                    }}
                                >
                                    <Info className="h-4 w-4 mr-2" />
                                    View Details
                                </Button>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AppointmentCard