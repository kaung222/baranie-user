'use client'

import { ChevronDown, ChevronUp, Loader2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { Service } from '@/types/service'
import { MemberForAll } from '@/types/member'
import MiniServiceCard from '@/components/common/MiniServiceCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import { useBookAppointment } from '@/api/appointment/book-appointment'
import { User } from '@/types/user'
import { toast } from '@/hooks/use-toast'
import { PhoneNumberDialog } from './phone-add-dialog'
import { useState } from 'react'
import { Organization } from '@/types/organization'
import Image from 'next/image'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"


type Props = {
    services: Service[];
    professionals: MemberForAll[];
    user: User;
    organization: Organization;
}

type BookItem = {
    sv: string;
    pf: string;
}

type ShowCageItem = {
    service: Service | undefined;
    professional: MemberForAll | undefined;
}


const steps = [
    { path: '/booking', label: 'Booking' },
    { path: '/professionals', label: 'Professionals' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/confirm', label: 'Confirm' }
];

export function CartSummary({ services, professionals, user, organization }: Props) {
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const searchParams = new URLSearchParams(window.location.search);
    const { mutate, isPending } = useBookAppointment();
    const { shopId } = useParams();
    const currentPath = usePathname();
    const staff = getQuery('staff');
    const items = getQuery('items');
    const date = getQuery('date')
    const time = getQuery('time');
    const note = getQuery('note');
    const preItems: BookItem[] = JSON.parse(items || '[]');
    const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);



    const showCageBookingItems: ShowCageItem[] = preItems.map((item) => ({ service: services.find(s => s.id == item.sv), professional: staff == 'per-service' ? professionals.find(p => p.id == item.pf) : professionals.find(p => p.id == staff) }))


    const handleContinueFromBooking = () => {
        console.log(items)
        if (!items || items == '[]') {
            return toast({ title: "At least, one selected service need to book appointment!", variant: "destructive" })
        }
        router.push(`/shops/${shopId}/professionals?items=${items}&staff=${staff}&date=${date}&time=${time}`);
    }

    const handleContinueFromProfessionals = () => {
        if (!staff) {
            return toast({ title: "Select one professional , any or per-service!", variant: "destructive" })
        }
        if (staff == 'per-service') {
            return router.push(`/shops/${shopId}/staff-per-service?items=${items}&staff=${staff}&date=${date}&time=${time}`);
        }
        router.push(`/shops/${shopId}/schedule?items=${items}&staff=${staff}&date=${date}&time=${time}`);
    }

    const handleContinueFromProfessionalPerService = () => {
        if (!staff) {
            return toast({ title: "Select one professional , any or per-service!", variant: "destructive" })
        }
        router.push(`/shops/${shopId}/schedule?items=${items}&staff=${staff}&date=${date}&time=${time}`);
    }
    const handleContinueFromSchedule = () => {
        if (!date || !time) {
            return toast({ title: "Select schedule date and time!", variant: "destructive" })
        }
        router.push(`/shops/${shopId}/confirm?items=${items}&staff=${staff}&date=${date}&time=${time}`);
    }

    const staffAnyToNull = (id: string) => {
        return id == 'any' ? undefined : id

    }

    const handleConfirm = () => {
        if (!user.phone) {
            return setIsPhoneDialogOpen(true)
        }
        const payload = {
            orgId: Number(organization.id),
            date: date,
            username: `${user.firstName} ${user.lastName}`,
            notes: note,
            status: 'pending',
            phone: user.phone,
            gender: user.gender,
            profilePicture: user.profilePicture,
            email: user.email,
            bookingItems: preItems.map((item) => ({ serviceId: item.sv, memberId: staff == 'per-service' ? staffAnyToNull(item.pf) : staffAnyToNull(staff) })),
            startTime: Number(time)
        }
        mutate(payload, {
            onSuccess() {
                router.push('/appointment')
            }
        })
        console.log(payload)
    }


    const totalOriginalPrice = showCageBookingItems.flatMap(item => item.service).reduce((pv, cv) => pv + Number(cv?.price), 0);
    const totalDiscountPrice = showCageBookingItems.flatMap(item => item.service).reduce((pv, cv) => pv + Number(cv?.discountPrice), 0);

    const SummaryContent = () => (
        <div className="bg-white rounded-lg border p-6 space-y-6 sticky top-[100px] ">
            <div className=' flex items-start gap-2 '>
                <Avatar className=' rounded-sm w-24 h-20 '>
                    <AvatarImage src={organization.thumbnail} alt={shortName(organization.name)} className=' object-cover ' />
                    <AvatarFallback className=" rounded-sm">{shortName(organization.name)}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="flex items-center justify-between">
                        <h2 className="font-medium">{organization.name}</h2>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-primary text-primary" />
                            <span className="text-sm font-medium">{organization.rating}</span>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {organization.address} {organization.country}
                    </p>
                </div>

            </div>

            <div className="border-t pt-6 max-h-[250px] overflow-y-auto space-y-1 ">
                {showCageBookingItems.map((item, index) => item.service && (
                    <MiniServiceCard key={index} service={item.service} memberComponent={item.professional ? (
                        <div className=" px-1 py-1 w-[180px] cursor-pointer flex-shrink-0 flex-nowrap border rounded-[18px] h-9 ">
                            <div className="w-full flex items-center gap-2 justify-start h-7">
                                <Avatar className="h-7 w-7 ">
                                    <AvatarImage src={item.professional.profilePictureUrl} alt={shortName(item.professional.firstName)} className=' object-cover ' />
                                    <AvatarFallback>{shortName(item.professional.firstName)}</AvatarFallback>
                                </Avatar>
                                <span className=' font-medium text-sm '>{item.professional.firstName}</span>
                            </div>
                        </div>
                    ) : (
                        <div>with any</div>
                    )} />
                ))}
            </div>

            <div className="border-t pt-6 space-y-2">
                <div className="flex justify-between font-medium pt-2">
                    <span>Total</span>
                    <div>
                        {totalOriginalPrice != totalDiscountPrice ? (
                            <>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-700 font-medium line-through">
                                        {totalOriginalPrice} MMK
                                    </span>
                                </div>
                                <span className="font-semibold  text-green-600">
                                    {totalDiscountPrice} MMK
                                </span>
                            </>
                        ) : (
                            <span className="font-semibold ">
                                {totalDiscountPrice} <span className="text-sm">MMK</span>
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {currentPath.endsWith('/booking') && (
                <Button disabled={isPending} onClick={() => handleContinueFromBooking()} variant="brandDefault" className="w-full ">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            submitting...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            )}
            {currentPath.endsWith('/professionals') && (
                <Button disabled={isPending} onClick={() => handleContinueFromProfessionals()} variant="brandDefault" className="w-full ">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            submitting...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            )}
            {currentPath.endsWith('/staff-per-service') && (
                <Button disabled={isPending} onClick={() => handleContinueFromProfessionalPerService()} variant="brandDefault" className="">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            submitting...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            )}
            {currentPath.endsWith('/schedule') && (
                <Button disabled={isPending} onClick={() => handleContinueFromSchedule()} variant="brandDefault" className="w-full ">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            submitting...
                        </>
                    ) : (
                        'Continue'
                    )}
                </Button>
            )}
            {currentPath.endsWith('/confirm') && (
                <Button disabled={isPending} onClick={() => handleConfirm()} variant='brandDefault' className="w-full ">
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            submitting...
                        </>
                    ) : (
                        'Confirm Booking'
                    )}
                </Button>
            )}

            <PhoneNumberDialog
                isOpen={isPhoneDialogOpen}
                onClose={() => setIsPhoneDialogOpen(false)}
            />
        </div>
    )

    return (
        <>
            {/* Desktop Summary */}
            <div className=" hidden lg:block lg:w-[40%] p-5 ">
                <SummaryContent />
            </div>

            {/* Mobile Bottom Bar */}
            <div className="fixed bottom-0 left-0 right-0 lg:hidden">
                <Sheet>
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-t">
                        <div>
                            <div className="text-sm text-gray-600">Total</div>
                            <div className="text-lg font-bold">{totalDiscountPrice} MMK</div>
                        </div>
                        <div className="flex gap-2">
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm">
                                    View Summary
                                    <ChevronUp className="w-4 h-4 ml-1" />
                                </Button>
                            </SheetTrigger>
                            {currentPath.endsWith('/booking') && (
                                <Button disabled={isPending} onClick={() => handleContinueFromBooking()} variant="brandDefault">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            processing...
                                        </>
                                    ) : (
                                        'Continue'
                                    )}
                                </Button>
                            )}
                            {currentPath.endsWith('/professionals') && (
                                <Button disabled={isPending} onClick={() => handleContinueFromProfessionals()} variant="brandDefault">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            processing...
                                        </>
                                    ) : (
                                        'Continue'
                                    )}
                                </Button>
                            )}
                            {currentPath.endsWith('/staff-per-service') && (
                                <Button disabled={isPending} onClick={() => handleContinueFromProfessionalPerService()} variant="brandDefault">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            processing...
                                        </>
                                    ) : (
                                        'Continue'
                                    )}
                                </Button>
                            )}
                            {currentPath.endsWith('/schedule') && (
                                <Button disabled={isPending} onClick={() => handleContinueFromSchedule()} variant="brandDefault">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            processing...
                                        </>
                                    ) : (
                                        'Continue'
                                    )}
                                </Button>
                            )}
                            {currentPath.endsWith('/confirm') && (
                                <Button disabled={isPending} onClick={() => handleConfirm()} variant="brandDefault">
                                    {isPending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            submitting...
                                        </>
                                    ) : (
                                        'Confirm'
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                    <SheetContent side="bottom" className="h-[90vh] overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle>Booking Summary</SheetTitle>
                        </SheetHeader>
                        <div className="mt-4">
                            <SummaryContent />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>

    )
}

