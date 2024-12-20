'use client'

import { useGetOrganizationServices } from '@/api/organization/get-organization-services'
import ServiceCard from '@/components/common/ServiceCard'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { useParams } from 'next/navigation'

const services = [
    {
        id: 1,
        name: 'Wash, cut, blowdry & style',
        duration: '1h',
        price: 'MMK 50',
    },
    {
        id: 2,
        name: 'Full color',
        duration: '2h',
        price: 'MMK 80',
    },
    {
        id: 3,
        name: 'Brazilian Acetic bonding treatment',
        duration: '3h',
        price: 'MMK 85',
    },
    {
        id: 4,
        name: 'Wash, cut, blowdry & style Long',
        duration: '1h 30m',
        price: 'MMK 120',
    },
]

export function
    ServicesList() {
    const { shopId } = useParams()
    const { data: categories, isLoading } = useGetOrganizationServices(String(shopId))
    return (
        <>
            {
                categories && (
                    <div className="space-y-6">
                        <div className="flex gap-2">
                            {categories.map((category) => (
                                <Button key={category.id} variant="secondary" className="rounded-full">
                                    {category.name}
                                </Button>
                            ))}
                        </div>

                        <div className=' w-full space-y-5'>
                            {categories.flatMap(category => category.services).map((service) => (
                                <ServiceCard key={service.id} service={service} />
                            ))}

                        </div>
                    </div>
                )
            }
        </>
    )
}

