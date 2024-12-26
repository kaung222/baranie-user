'use client'
import React from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Organization } from '@/types/organization'
import { useRouter } from 'next/navigation'


type Props = {
    organization: Organization;
}

const ShopCard = ({ organization }: Props) => {
    const router = useRouter()
    return (
        <>
            <div key={organization.id} onClick={() => router.push(`/shops/${organization?.slug}`)} className="group cursor-pointer rounded-lg w-full max-w-[380px] overflow-hidden border border-gray-200">
                <div className="relative  h-[200px]">
                    <Image
                        src={organization.thumbnail || '/img/shop-empty.png'}
                        alt={organization.name}
                        fill
                        className="object-cover group-hover:scale-105 bg-gray-100 transition-transform duration-300"
                    />
                </div>
                <div className="px-4 py-6">
                    <div className="flex items-start justify-between ">
                        <h3 className="font-medium">{organization.name}</h3>
                        <Badge variant="secondary" className="mb-2 bg-brandColor text-white">
                            {organization?.types?.join(" & ")}
                        </Badge>
                    </div>
                    <div className="flex items-center mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{organization.rating}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{organization.country} {organization.city} </p>
                </div>
            </div>
        </>
    )
}

export default ShopCard