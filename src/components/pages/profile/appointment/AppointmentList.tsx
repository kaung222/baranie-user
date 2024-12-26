'use client'

import { Star, Clock, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

// This would come from your API
const appointments = [
    {
        id: 1,
        salonName: "The Style Studio",
        rating: 5.0,
        address: "32 Inya Road, Bahan Township, Yangon",
        service: "Wash, cut, blowdry & style",
        price: "from MMK 50",
        duration: "1hr",
        professional: "Any professional",
        date: "Monday 18 November",
        time: "16:15-16:30",
        timeDetails: "15 mins duration"
    }
]

export function AppointmentList() {
    return (
        <div className="space-y-4">
            {appointments.map((appointment) => (
                <Card key={appointment.id} className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-lg font-semibold">{appointment.salonName}</h2>
                                        <div className="flex items-center text-yellow-500">
                                            <Star className="h-4 w-4 fill-current" />
                                            <span className="ml-1 text-sm font-medium">{appointment.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {appointment.address}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-medium">{appointment.service}</h3>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                            <Clock className="h-4 w-4" />
                                            <span>{appointment.duration} with {appointment.professional}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-medium">{appointment.price}</span>
                                    </div>
                                </div>

                                <div className="flex items-start gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-muted-foreground" />
                                        <span>{appointment.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p>{appointment.time}</p>
                                            <p className="text-muted-foreground">({appointment.timeDetails})</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

