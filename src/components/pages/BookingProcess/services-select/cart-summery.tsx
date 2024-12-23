'use client'

import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { useParams, usePathname, useRouter } from 'next/navigation'

type Props = {

}

const steps = [
    { path: '/booking', label: 'Booking' },
    { path: '/professionals', label: 'Professionals' },
    { path: '/schedule', label: 'Schedule' },
    { path: '/confirm', label: 'Confirm' }
];

export function CartSummary({ }: Props) {
    const router = useRouter();
    const { getQuery } = useSetUrlParams();
    const { shopId } = useParams();
    const currentPath = usePathname();

    const handleContinue = () => {
        const currentIndex = steps.findIndex(step => currentPath.endsWith(step.path));
        if (currentIndex !== -1 && currentIndex < steps.length - 1) {
            router.push(`/shops/${shopId}${steps[currentIndex + 1].path}`);
        } else {
            console.log('You are at the final step.');
        }
    };

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

            <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Wash, cut, blowdry & style</h3>
                    <span className="text-sm">1hr</span>
                </div>
                <p className="text-sm mb-2">From MMK 50</p>
            </div>

            <div className="border-t pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>MMK 50</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span>Discount</span>
                    <span>MMK 0</span>
                </div>
                <div className="flex justify-between font-medium pt-2">
                    <span>Total</span>
                    <span>MMK 50</span>
                </div>
            </div>

            <Button onClick={() => handleContinue()} className="w-full bg-black hover:bg-black/90">
                Continue
            </Button>
        </div>
    )
}

