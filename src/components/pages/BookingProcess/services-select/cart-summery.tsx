'use client'

import { ChevronDown, Loader2, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useGetOrganizationServices } from '@/api/organization/get-organization-services'
import { useGetOrganizationMembers } from '@/api/organization/get-org-members'
import { Service } from '@/types/service'
import { MemberForAll } from '@/types/member'
import ServiceCard from '@/components/common/ServiceCard'
import MiniServiceCard from '@/components/common/MiniServiceCard'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import { useBookAppointment } from '@/api/appointment/book-appointment'
import { User } from '@/types/user'
import { toast } from '@/hooks/use-toast'

type Props = {
    services: Service[];
    professionals: MemberForAll[];
    user: User;
    orgId: number;
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

export function CartSummary({ services, professionals, user, orgId }: Props) {
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const searchParams = new URLSearchParams(window.location.search);
    const { mutate, isPending } = useBookAppointment()
    const { shopId } = useParams();
    const currentPath = usePathname();
    const staff = getQuery('staff');
    const items = getQuery('items');
    const date = getQuery('date')
    const time = getQuery('time');
    const preItems: BookItem[] = JSON.parse(items || '[]');

    const showCageBookingItems: ShowCageItem[] = preItems.map((item) => ({ service: services.find(s => s.id == item.sv), professional: professionals.find(p => p.id == staff) }))

    console.log(staff)

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
        router.push(`/shops/${shopId}/schedule?items=${items}&staff=${staff}&date=${date}&time=${time}`);
    }
    const handleContinueFromSchedule = () => {
        if (!date || !time) {
            return toast({ title: "Select schedule date and time!", variant: "destructive" })
        }
        router.push(`/shops/${shopId}/confirm?items=${items}&staff=${staff}&date=${date}&time=${time}`);
    }

    const handleConfirm = () => {
        const payload = {
            orgId: Number(orgId),
            date: date,
            username: `${user.firstName} ${user.lastName}`,
            notes: 'helo',
            status: 'pending',
            phone: user.phone || '+959425743536',
            gender: user.gender,
            profilePicture: user.profilePicture,
            email: user.email,
            bookingItems: preItems.map((item) => ({ serviceId: item.sv, memberId: staff })),
            startTime: Number(time)
        }
        mutate(payload)
        console.log(payload)
    }

    const handleContinue = () => {
        const currentIndex = steps.findIndex(step => currentPath.endsWith(step.path));
        if (currentIndex !== -1 && currentIndex < steps.length - 1) {
            router.push(`/shops/${shopId}${steps[currentIndex + 1].path}?items=${items}&staff=${staff}&date=${date}&time=${time}`);
        } else {
            console.log('You are at the final step.');
            const payload = {
                orgId: Number(shopId),
                date: date,
                username: `${user.firstName} ${user.lastName}`,
                notes: 'helo',
                status: 'pending',
                phone: user.phone || '+959425743536',
                gender: user.gender,
                profilePicture: user.profilePicture,
                email: user.email,
                bookingItems: preItems.map((item) => ({ serviceId: item.sv, memberId: staff })),
                startTime: Number(time)
            }
            // mutate(payload)
            console.log(payload)
        }
    };

    const totalOriginalPrice = showCageBookingItems.flatMap(item => item.service).reduce((pv, cv) => pv + Number(cv?.price), 0);
    const totalDiscountPrice = showCageBookingItems.flatMap(item => item.service).reduce((pv, cv) => pv + Number(cv?.discountPrice), 0);

    return (
        <div className="bg-white rounded-lg border p-6 space-y-6 sticky top-[100px] ">
            <div className="flex items-center justify-between">
                <h2 className="font-medium">The Style Studio</h2>
                <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-medium">5.0</span>
                </div>
            </div>
            <p className="text-sm text-muted-foreground">
                32 Paya Road, Bahan Township, Yangon
            </p>

            <div className="border-t pt-6 max-h-[250px] overflow-y-auto ">
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
                <Button disabled={isPending} onClick={() => handleContinueFromBooking()} className="w-full bg-black hover:bg-black/90">
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
                <Button disabled={isPending} onClick={() => handleContinueFromProfessionals()} className="w-full bg-black hover:bg-black/90">
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
                <Button disabled={isPending} onClick={() => handleContinueFromSchedule()} className="w-full bg-black hover:bg-black/90">
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
                <Button disabled={isPending} onClick={() => handleConfirm()} className="w-full bg-black hover:bg-black/90">
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
    )
}

