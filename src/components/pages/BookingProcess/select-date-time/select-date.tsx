import { OrgSchedule } from '@/types/org-schedule'
import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { format, isSunday, subDays } from 'date-fns'

type Props = {
    orgSchedule: OrgSchedule[]
}

const SelectDate = ({ orgSchedule }: Props) => {
    const { setQuery, getQuery } = useSetUrlParams();
    const date: Date | undefined = getQuery('date') ? new Date(getQuery("date")) : undefined

    return (
        <>
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
                            disabled={(date) => date < subDays(new Date(), 1)}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </>
    )
}

export default SelectDate