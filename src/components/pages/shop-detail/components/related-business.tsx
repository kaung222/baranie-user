import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Organization } from '@/types/organization'
import ShopCard from '@/components/common/ShopCard'

const businesses = [
    {
        id: 1,
        name: 'Polish & Shine',
        image: '/business-1.jpg',
        category: 'Nail Services',
        rating: 4.8,
        location: 'Aung Zaya Road, North Township, Yangon',
    },
    {
        id: 2,
        name: 'Lash & Brow Boutique',
        image: '/business-2.jpg',
        category: 'Cosmetics & Lashes',
        rating: 4.5,
        location: '77/1 Wisara Road, Dagon Township, Yangon',
    },
    {
        id: 3,
        name: 'Glamour Bar',
        image: '/business-3.jpg',
        category: 'Make Up',
        rating: 4.8,
        location: '91 Kan Road, Yankin Township, Yangon',
    },
]
type Props = {
    relatedOrgs: Organization[]
}
export function RelatedBusinesses({ relatedOrgs }: Props) {
    return (
        <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">
                Related
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedOrgs && relatedOrgs.length > 0 ? (
                    relatedOrgs.map((organization, index) => (
                        <ShopCard key={index} organization={organization} />
                    ))
                ) : (
                    <div>No Related!</div>
                )}

            </div>
        </div>
    )
}

