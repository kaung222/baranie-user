import Image from 'next/image'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ShopCard from '@/components/common/ShopCard'
import { Organization } from '@/types/organization'


interface ServiceGridProps {
    organizations: Organization[]
}

export function ServiceGrid({ organizations }: ServiceGridProps) {
    return (
        <div className="flex overflow-x-auto gap-6">
            {organizations.map((organization, index) => (
                <ShopCard key={index} organization={organization} />
            ))}
        </div>
    )
}

