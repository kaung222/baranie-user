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
import { generateTimeArray } from '@/lib/data'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { format } from 'date-fns'


export function DateTimeSelector() {
    // const [date, setDate] = useState<Date>();
    // const [time, setTime] = useState<string>();
    const { setQuery, getQuery } = useSetUrlParams();
    const date: Date = new Date(getQuery("date"));
    const time: string = getQuery('time');



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
                                    onSelect={(e) => {
                                        e && setQuery({ key: 'date', value: format(e, "yyyy-MM-dd") })
                                    }}
                                    className="w-full"
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div>
                    <Select disabled={!date} value={time} onValueChange={(e) => setQuery({ key: 'time', value: e })}>
                        <SelectTrigger className="w-full">
                            <Clock className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Choose Time" />
                        </SelectTrigger>
                        <SelectContent>
                            {generateTimeArray().map((slot, index) => (slot.value >= 28800 && slot.value <= 64800) && (
                                <SelectItem key={index} value={String(slot.value)}>
                                    {slot.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className=" h-[200px] "></div>

            <div className="text-sm text-muted-foreground ">
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

