import Image from 'next/image'
import Link from 'next/link'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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

export function RelatedBusinesses() {
    return (
        <div className="mt-12">
            <h2 className="text-lg font-semibold mb-4">
                You might also be interested in
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {businesses.map((business) => (
                    <Link
                        key={business.id}
                        href={`/${business.id}`}
                        className="group block"
                    >
                        <div className="relative h-48 mb-3">
                            <Image
                                src={business.image}
                                alt={business.name}
                                fill
                                className="object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                            />
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="font-medium">{business.name}</h3>
                                <div className="flex items-center">
                                    <Star className="w-4 h-4 fill-primary text-primary" />
                                    <span className="ml-1 text-sm">{business.rating}</span>
                                </div>
                            </div>
                            <Badge variant="secondary" className="mb-1">
                                {business.category}
                            </Badge>
                            <p className="text-sm text-muted-foreground">{business.location}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

