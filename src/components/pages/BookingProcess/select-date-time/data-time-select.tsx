'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CalendarIcon, Clock } from 'lucide-react'
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
]

export function DateTimeSelector() {
    const [date, setDate] = useState<Date>()
    const [time, setTime] = useState<string>()

    return (
        <div className="space-y-6 w-full h-full flex flex-col p-10 ">
            <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <div className="relative">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? date.toLocaleDateString() : 'Select Date'}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="w-full"
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    {/* <div className="relative">
                        <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? date.toLocaleDateString() : 'Select Date'}
                        </Button>
                    </div>
                    <div className="rounded-lg border bg-card">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="w-full"
                            disabled={(date) => date < new Date()}
                        />
                    </div> */}
                </div>

                <div>
                    <Select value={time} onValueChange={setTime}>
                        <SelectTrigger className="w-full">
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Choose Time" />
                        </SelectTrigger>
                        <SelectContent>
                            {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                    {slot}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className=" flex-grow"></div>

            <div className="text-sm text-muted-foreground mt-auto">
                Can&apos;t find a suitable time?{' '}
                <Link
                    href="/waitlist"
                    className="text-primary hover:text-primary/90 font-medium"
                >
                    Join the waitlist
                </Link>
            </div>
        </div>
    )
}

