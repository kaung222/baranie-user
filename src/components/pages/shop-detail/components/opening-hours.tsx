import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { secondToHour } from "@/lib/utils"
import { OrgSchedule } from "@/types/org-schedule"

const hours = [
    { day: 'Monday', hours: '09:00-20:00' },
    { day: 'Tuesday', hours: '09:00-20:00' },
    { day: 'Wednesday', hours: '09:00-20:00' },
    { day: 'Thursday', hours: '09:00-20:00' },
    { day: 'Friday', hours: '09:00-20:00' },
    { day: 'Saturday', hours: '09:00-20:00' },
    { day: 'Sunday', hours: 'Closed' },
]

const dayArray = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

type Props = {
    schedules: OrgSchedule[]
}

export function OpeningHours({ schedules }: Props) {

    const hasSchedule = (schedules: OrgSchedule[], day: string) => {
        return schedules.find(sc => sc.dayOfWeek == day)
    }
    return (
        <>
            <Card className=" w-full p-3 sm:p-6  mb-20 mt-8 ">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className=" font-bold text-xl ">Opening hours</CardTitle>

                </CardHeader>
                <CardContent>
                    {schedules && (
                        <div className="space-y-5">
                            {dayArray.map((day, index) => (

                                <div
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${hasSchedule(schedules, day) ? 'bg-green-500' : 'bg-gray-300'
                                                }`}
                                        />
                                        <span className={true ? 'font-medium' : 'text-gray-500'}>
                                            {day}
                                        </span>
                                    </div>
                                    <span className={true ? 'font-medium' : 'text-gray-500'}>
                                        {hasSchedule(schedules, day) ? (
                                            <>
                                                {
                                                    secondToHour(Number(hasSchedule(schedules, day)?.startTime))
                                                } - {
                                                    secondToHour(Number(hasSchedule(schedules, day)?.endTime))
                                                }
                                            </>
                                        ) : (
                                            'closed'
                                        )}
                                    </span>
                                </div>

                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

        </>
    )
}

