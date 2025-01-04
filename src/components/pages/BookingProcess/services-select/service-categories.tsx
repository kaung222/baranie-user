'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ServiceList } from './service-list'
import { useGetOrganizationServices } from '@/api/organization/get-organization-services'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useGetDetailOrganizationBySlug } from '@/api/organization/get-detail-organization-bySlug'

// const categories = [
//     { id: 'featured', name: 'Featured' },
//     { id: 'blow-dries', name: 'Blow dries & styling' },
//     { id: 'color', name: 'Color services' },
//     { id: 'fixing', name: 'Fixing appointment' },
//     { id: 'hair', name: 'Hair package' },
// ]

const services = {
    featured: [
        {
            id: 1,
            name: 'Wash, cut, blowdry & style',
            duration: '1hr',
            description: 'Wash, cut, blowdry and style on normal length and thickness of hair',
            price: 'MMK 50',
        },
        {
            id: 2,
            name: 'Full toner',
            duration: '30mins',
            description: 'Toning to be added to all foil services',
            price: 'MMK 20',
        },
        {
            id: 3,
            name: 'Redken Acidic bonding treatment',
            duration: '30mins',
            description: 'Acidic bonding treatment restoring the hair back to its normal PH to promote shiny, healthy and restructured hair.',
            price: 'MMK 20',
        },
        {
            id: 4,
            name: 'Wash, cut, blowdry & style Long',
            duration: '1hr 30mins',
            description: 'Wash, cut, blowdry and style for long or thick hair',
            price: 'From MMK 100',
        },
    ],
    // Additional category services would be defined similarly
}

export function ServiceCategories() {
    const { shopId } = useParams()
    const { data: result } = useGetDetailOrganizationBySlug(String(shopId))
    // const { data: categories } = useGetOrganizationServices(String(shopId));

    return (
        <div defaultValue="featured" className="w-full" >
            <div className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
                {result?.services?.map((category) => (
                    <Button
                        key={category.id}
                        value={category.id}
                        className="rounded-full px-4 py-2 m-1"
                    >
                        {category.name}
                    </Button>
                ))}
            </div>
            {result?.services && (
                <ServiceList allCategories={result.services} />
            )}
        </div>
    )
}

